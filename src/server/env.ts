import process from "node:process";
import { z } from "zod";

/**
 * Server-only environment configuration. Never import this from client code —
 * it reads secrets (Cosmos key, Google client secret, session secret) that must
 * never reach the browser. See `.env.example` for the variables themselves.
 */
const schema = z.object({
	// Azure Cosmos DB (NoSQL). One connection string from the Azure portal.
	COSMOS_CONNECTION_STRING: z.string().min(1),
	COSMOS_DATABASE: z.string().min(1).default("windy"),

	// Google OAuth (Admin sign-in).
	GOOGLE_CLIENT_ID: z.string().min(1),
	GOOGLE_CLIENT_SECRET: z.string().min(1),
	GOOGLE_REDIRECT_URI: z.string().min(1),

	// Secret used to sign the session cookie (random, >= 32 chars).
	SESSION_SECRET: z.string().min(32),

	// Comma-separated bootstrap admin emails (always admin on first sign-in).
	ADMIN_EMAILS: z.string().default(""),
});

export type ServerEnv = z.infer<typeof schema> & { adminEmails: string[] };

let cached: ServerEnv | null = null;

/** Parse and validate the environment once, throwing a clear error if invalid. */
export function getEnv(): ServerEnv {
	if (cached) return cached;
	const parsed = schema.safeParse(process.env);
	if (!parsed.success) {
		const fields = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
		throw new Error(
			`Invalid or missing environment variables: ${fields}. See .env.example.`,
		);
	}
	cached = {
		...parsed.data,
		adminEmails: parsed.data.ADMIN_EMAILS.split(",")
			.map((e) => e.trim())
			.filter(Boolean),
	};
	return cached;
}
