import {
	decodeIdToken,
	Google,
	generateCodeVerifier,
	generateState,
} from "arctic";
import { type Role, resolveRole, type UserRecord } from "@/lib/roles";
import { container } from "@/server/cosmos";
import { getEnv } from "@/server/env";
import {
	readSessionCookie,
	type SessionUser,
	verifySessionToken,
} from "@/server/session";

export { generateCodeVerifier, generateState };
export const GOOGLE_SCOPES = ["openid", "profile", "email"];

export interface GoogleClaims {
	sub: string;
	email: string;
	name?: string;
	email_verified?: boolean;
}

/** A stored user document: the UserRecord plus its Cosmos id (the Google sub). */
export type StoredUser = UserRecord & { id: string; name?: string };

function googleClient(): Google {
	const env = getEnv();
	return new Google(
		env.GOOGLE_CLIENT_ID,
		env.GOOGLE_CLIENT_SECRET,
		env.GOOGLE_REDIRECT_URI,
	);
}

/** Authorization URL to redirect the user to Google's consent screen. */
export function googleAuthUrl(state: string, codeVerifier: string): URL {
	return googleClient().createAuthorizationURL(
		state,
		codeVerifier,
		GOOGLE_SCOPES,
	);
}

/** Exchange an authorization code for the verified Google identity claims. */
export async function exchangeCode(
	code: string,
	codeVerifier: string,
): Promise<GoogleClaims> {
	const tokens = await googleClient().validateAuthorizationCode(
		code,
		codeVerifier,
	);
	return decodeIdToken(tokens.idToken()) as GoogleClaims;
}

/** The signed-in user from the request's session cookie, or null. */
export function getSessionUser(request: Request): SessionUser | null {
	return verifySessionToken(readSessionCookie(request.headers.get("cookie")));
}

/** Load the stored user document by Google sub. */
export async function loadUser(sub: string): Promise<StoredUser | null> {
	try {
		const { resource } = await container("users")
			.item(sub, sub)
			.read<StoredUser>();
		return resource ?? null;
	} catch {
		return null;
	}
}

/** The effective role for a signed-in user (allowlist + stored grant). */
export async function getRole(user: SessionUser | null): Promise<Role> {
	if (!user) return "user";
	const stored = await loadUser(user.sub);
	return resolveRole(user.email, stored, getEnv().adminEmails);
}

/** Throw a 403 Response unless the request belongs to an admin. */
export async function requireAdmin(request: Request): Promise<SessionUser> {
	const user = getSessionUser(request);
	if (!user || (await getRole(user)) !== "admin") {
		throw new Response("Forbidden", { status: 403 });
	}
	return user;
}
