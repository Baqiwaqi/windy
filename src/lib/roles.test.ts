import { describe, expect, it } from "vitest";
import {
	approveRequest,
	denyRequest,
	requestAdmin,
	resolveRole,
	revokeAdmin,
} from "@/lib/roles";

describe("resolveRole", () => {
	it("treats an allowlisted email as admin even with no stored record", () => {
		expect(resolveRole("Tim@Example.com", null, ["tim@example.com"])).toBe(
			"admin",
		);
	});

	it("defaults to user with no record, and honors a stored granted admin", () => {
		const allow = ["tim@example.com"];
		expect(resolveRole("a@b.com", null, allow)).toBe("user");
		expect(
			resolveRole("a@b.com", { email: "a@b.com", role: "admin" }, allow),
		).toBe("admin");
	});
});

describe("requestAdmin", () => {
	it("turns a user into a pending admin request", () => {
		const next = requestAdmin(
			{ email: "a@b.com", role: "user" },
			"2026-06-15T10:00:00.000Z",
		);
		expect(next.role).toBe("user");
		expect(next.request).toEqual({
			status: "pending",
			requestedAt: "2026-06-15T10:00:00.000Z",
		});
	});
});

describe("approveRequest", () => {
	const pending = {
		email: "a@b.com",
		role: "user" as const,
		request: {
			status: "pending" as const,
			requestedAt: "2026-06-15T10:00:00.000Z",
		},
	};

	it("promotes a pending user to admin and records the decision", () => {
		const next = approveRequest(
			pending,
			"tim@example.com",
			"2026-06-16T09:00:00.000Z",
		);
		expect(next.role).toBe("admin");
		expect(next.request).toEqual({
			status: "approved",
			requestedAt: "2026-06-15T10:00:00.000Z",
			decidedBy: "tim@example.com",
			decidedAt: "2026-06-16T09:00:00.000Z",
		});
	});

	it("throws when there is no pending request to approve", () => {
		expect(() =>
			approveRequest(
				{ email: "a@b.com", role: "user" },
				"tim@example.com",
				"x",
			),
		).toThrow();
	});
});

describe("denyRequest", () => {
	it("marks a pending request denied and keeps the user a user", () => {
		const pending = {
			email: "a@b.com",
			role: "user" as const,
			request: {
				status: "pending" as const,
				requestedAt: "2026-06-15T10:00:00.000Z",
			},
		};
		const next = denyRequest(
			pending,
			"tim@example.com",
			"2026-06-16T09:00:00.000Z",
		);
		expect(next.role).toBe("user");
		expect(next.request).toEqual({
			status: "denied",
			requestedAt: "2026-06-15T10:00:00.000Z",
			decidedBy: "tim@example.com",
			decidedAt: "2026-06-16T09:00:00.000Z",
		});
	});
});

describe("revokeAdmin", () => {
	it("demotes a granted admin back to user", () => {
		const next = revokeAdmin({ email: "a@b.com", role: "admin" }, [
			"tim@example.com",
		]);
		expect(next.role).toBe("user");
	});

	it("cannot revoke a bootstrap (allowlisted) admin", () => {
		const next = revokeAdmin({ email: "Tim@example.com", role: "admin" }, [
			"tim@example.com",
		]);
		expect(next.role).toBe("admin");
	});
});
