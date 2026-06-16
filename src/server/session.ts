import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/server/env";

export interface SessionUser {
	sub: string;
	email: string;
	name?: string;
}

export const SESSION_COOKIE = "windy_session";
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sign(payload: string, secret: string): string {
	return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Build a signed session token: base64url(payload).hmac, with an expiry. */
export function createSessionToken(
	user: SessionUser,
	maxAgeSec = DEFAULT_MAX_AGE,
): string {
	const body = { ...user, exp: Date.now() + maxAgeSec * 1000 };
	const payload = Buffer.from(JSON.stringify(body)).toString("base64url");
	return `${payload}.${sign(payload, getEnv().SESSION_SECRET)}`;
}

/** Verify a session token's signature + expiry and decode it, or null. */
export function verifySessionToken(
	token: string | null | undefined,
): SessionUser | null {
	if (!token) return null;
	const [payload, sig] = token.split(".");
	if (!payload || !sig) return null;

	const expected = Buffer.from(sign(payload, getEnv().SESSION_SECRET));
	const actual = Buffer.from(sig);
	if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
		return null;
	}
	try {
		const body = JSON.parse(
			Buffer.from(payload, "base64url").toString(),
		) as SessionUser & { exp?: number };
		if (typeof body.exp === "number" && body.exp < Date.now()) return null;
		return { sub: body.sub, email: body.email, name: body.name };
	} catch {
		return null;
	}
}

/** Set-Cookie value for an authenticated session. */
export function sessionCookie(
	token: string,
	maxAgeSec = DEFAULT_MAX_AGE,
): string {
	return `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAgeSec}`;
}

/** Set-Cookie value that clears the session (sign-out). */
export function clearedSessionCookie(): string {
	return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

/** Read a named cookie value out of a Cookie header. */
export function readCookie(
	cookieHeader: string | null | undefined,
	name: string,
): string | null {
	if (!cookieHeader) return null;
	const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
	return match ? match[1] : null;
}

/** Read the raw session token out of a Cookie header. */
export function readSessionCookie(
	cookieHeader: string | null | undefined,
): string | null {
	return readCookie(cookieHeader, SESSION_COOKIE);
}
