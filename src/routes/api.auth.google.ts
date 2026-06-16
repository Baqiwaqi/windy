import { createFileRoute } from "@tanstack/react-router";
import {
	generateCodeVerifier,
	generateState,
	googleAuthUrl,
} from "@/server/auth";

/** Short-lived httpOnly cookie holding an OAuth handshake value. */
function handshakeCookie(name: string, value: string): string {
	return `${name}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`;
}

export const Route = createFileRoute("/api/auth/google")({
	server: {
		handlers: {
			GET: () => {
				const state = generateState();
				const codeVerifier = generateCodeVerifier();
				const url = googleAuthUrl(state, codeVerifier);

				const headers = new Headers({ Location: url.toString() });
				headers.append("Set-Cookie", handshakeCookie("g_oauth_state", state));
				headers.append(
					"Set-Cookie",
					handshakeCookie("g_oauth_verifier", codeVerifier),
				);
				return new Response(null, { status: 302, headers });
			},
		},
	},
});
