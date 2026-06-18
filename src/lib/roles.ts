export type Role = "admin" | "user";
export type RequestStatus = "pending" | "approved" | "denied";

export interface AdminRequest {
	status: RequestStatus;
	requestedAt: string;
	decidedAt?: string;
	decidedBy?: string;
}

export interface UserRecord {
	email: string;
	role: Role;
	request?: AdminRequest;
}

const eq = (a: string, b: string) =>
	a.trim().toLowerCase() === b.trim().toLowerCase();

/** Whether an email is a bootstrap admin (always admin, cannot be revoked). */
export const isAllowlisted = (email: string, adminEmails: string[]) =>
	adminEmails.some((a) => eq(a, email));

/**
 * The effective role for a signed-in email. A bootstrap-allowlisted email is
 * always admin, regardless of (or absence of) a stored record.
 */
export function resolveRole(
	email: string,
	stored: UserRecord | null,
	adminEmails: string[],
): Role {
	if (isAllowlisted(email, adminEmails)) return "admin";
	return stored?.role ?? "user";
}

/** Submit an admin request — moves the user to a pending request. */
export function requestAdmin(user: UserRecord, at: string): UserRecord {
	return { ...user, request: { status: "pending", requestedAt: at } };
}

/** Approve a pending request — grants admin and records who decided, when. */
export function approveRequest(
	user: UserRecord,
	by: string,
	at: string,
): UserRecord {
	if (user.request?.status !== "pending") {
		throw new Error("No pending admin request to approve");
	}
	return {
		...user,
		role: "admin",
		request: {
			...user.request,
			status: "approved",
			decidedBy: by,
			decidedAt: at,
		},
	};
}

/** Deny a pending request — records the decision; role stays user. */
export function denyRequest(
	user: UserRecord,
	by: string,
	at: string,
): UserRecord {
	if (user.request?.status !== "pending") {
		throw new Error("No pending admin request to deny");
	}
	return {
		...user,
		request: {
			...user.request,
			status: "denied",
			decidedBy: by,
			decidedAt: at,
		},
	};
}

/**
 * Revoke a granted admin, returning them to a regular user. Bootstrap
 * (allowlisted) admins cannot be revoked — the allowlist always wins.
 */
export function revokeAdmin(
	user: UserRecord,
	adminEmails: string[],
): UserRecord {
	if (isAllowlisted(user.email, adminEmails)) return user;
	return { ...user, role: "user" };
}
