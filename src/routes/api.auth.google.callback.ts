import { createFileRoute } from "@tanstack/react-router";
import { exchangeCode, loadUser } from "@/server/auth";
import { container } from "@/server/cosmos";
import {
	createSessionToken,
	readCookie,
	sessionCookie,
} from "@/server/session";

function clearedHandshakeCookie(name: string): string {
	return `${name}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export const Route = createFileRoute("/api/auth/google/callback")({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => {
				const url = new URL(request.url);
				const code = url.searchParams.get("code");
				const state = url.searchParams.get("state");
				const cookie = request.headers.get("cookie");
				const storedState = readCookie(cookie, "g_oauth_state");
				const verifier = readCookie(cookie, "g_oauth_verifier");

				if (
					!code ||
					!state ||
					!storedState ||
					!verifier ||
					state !== storedState
				) {
					return new Response("Invalid OAuth state", { status: 400 });
				}

				let claims: Awaited<ReturnType<typeof exchangeCode>>;
				try {
					claims = await exchangeCode(code, verifier);
				} catch {
					return new Response("OAuth exchange failed", { status: 400 });
				}

				// Upsert the user record, preserving any existing role / admin request.
				const existing = await loadUser(claims.sub);
				await container("users").items.upsert({
					id: claims.sub,
					email: claims.email,
					name: claims.name,
					role: existing?.role ?? "user",
					...(existing?.request ? { request: existing.request } : {}),
				});

				const token = createSessionToken({
					sub: claims.sub,
					email: claims.email,
					name: claims.name,
				});
				const headers = new Headers({ Location: "/admin" });
				headers.append("Set-Cookie", sessionCookie(token));
				headers.append("Set-Cookie", clearedHandshakeCookie("g_oauth_state"));
				headers.append(
					"Set-Cookie",
					clearedHandshakeCookie("g_oauth_verifier"),
				);
				return new Response(null, { status: 302, headers });
			},
		},
	},
});
