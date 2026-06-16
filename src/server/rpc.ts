import { randomUUID } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getRequest } from "@tanstack/react-start/server";
import { safeId } from "@/lib/cosmosId";
import { validateOwnerPatch } from "@/lib/ownerAdmin";
import {
	requestAdmin as applyRequestAdmin,
	approveRequest,
	denyRequest,
} from "@/lib/roles";
import { getRole, getSessionUser, loadUser } from "@/server/auth";
import { container } from "@/server/cosmos";
import { SESSION_COOKIE } from "@/server/session";
import type { Configuration } from "@/types";

/** Throw unless the caller is an authenticated admin; returns the admin user. */
async function requireAdminUser() {
	const user = getSessionUser(getRequest());
	if (!user || (await getRole(user)) !== "admin") {
		throw new Error("Forbidden");
	}
	return user;
}

// ── Session ──────────────────────────────────────────────────────────────────

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = getSessionUser(getRequest());
		const role = await getRole(user);
		const stored = user ? await loadUser(user.sub) : null;
		return { user, role, request: stored?.request ?? null };
	},
);

export const requestAdminFn = createServerFn({ method: "POST" }).handler(
	async () => {
		const user = getSessionUser(getRequest());
		if (!user) throw new Error("Unauthorized");
		const stored = await loadUser(user.sub);
		const base =
			stored ?? ({ id: user.sub, email: user.email, role: "user" } as const);
		const updated = applyRequestAdmin(base, new Date().toISOString());
		await container("users").items.upsert({ ...updated, id: user.sub });
		return { request: updated.request };
	},
);

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	deleteCookie(SESSION_COOKIE, { path: "/" });
	return { ok: true };
});

// ── Admin: request approval ──────────────────────────────────────────────────

export const listPendingRequests = createServerFn({ method: "GET" }).handler(
	async () => {
		await requireAdminUser();
		const { resources } = await container("users")
			.items.query<{
				id: string;
				email: string;
				name?: string;
				request?: { requestedAt: string };
			}>({
				query: "SELECT * FROM c WHERE c.request.status = @s",
				parameters: [{ name: "@s", value: "pending" }],
			})
			.fetchAll();
		return resources.map((u) => ({
			sub: u.id,
			email: u.email,
			name: u.name ?? null,
			requestedAt: u.request?.requestedAt ?? null,
		}));
	},
);

export const approveRequestFn = createServerFn({ method: "POST" })
	.inputValidator((d: { sub: string }) => d)
	.handler(async ({ data }) => {
		const admin = await requireAdminUser();
		const stored = await loadUser(data.sub);
		if (!stored) throw new Error("User not found");
		const updated = approveRequest(
			stored,
			admin.email,
			new Date().toISOString(),
		);
		await container("users").items.upsert({ ...updated, id: data.sub });
		return { ok: true };
	});

export const denyRequestFn = createServerFn({ method: "POST" })
	.inputValidator((d: { sub: string }) => d)
	.handler(async ({ data }) => {
		const admin = await requireAdminUser();
		const stored = await loadUser(data.sub);
		if (!stored) throw new Error("User not found");
		const updated = denyRequest(stored, admin.email, new Date().toISOString());
		await container("users").items.upsert({ ...updated, id: data.sub });
		return { ok: true };
	});

// ── Presets (public read, admin write) ───────────────────────────────────────

export interface StoredPreset {
	id: string;
	name: string;
	turbines: Configuration["turbines"];
	minimumDistance: number;
	publishedBy?: string;
	publishedAt?: string;
}

export const listPresets = createServerFn({ method: "GET" }).handler(
	async () => {
		const { resources } = await container("presets")
			.items.readAll<StoredPreset>()
			.fetchAll();
		return resources;
	},
);

export const publishPreset = createServerFn({ method: "POST" })
	.inputValidator(
		(d: {
			id?: string;
			name: string;
			turbines: Configuration["turbines"];
			minimumDistance: number;
		}) => d,
	)
	.handler(async ({ data }) => {
		const admin = await requireAdminUser();
		const id = data.id ?? randomUUID();
		const preset: StoredPreset = {
			id,
			name: data.name,
			turbines: data.turbines,
			minimumDistance: data.minimumDistance,
			publishedBy: admin.email,
			publishedAt: new Date().toISOString(),
		};
		await container("presets").items.upsert(preset);
		return preset;
	});

export const deletePreset = createServerFn({ method: "POST" })
	.inputValidator((d: { id: string }) => d)
	.handler(async ({ data }) => {
		await requireAdminUser();
		await container("presets").item(data.id, data.id).delete();
		return { ok: true };
	});

// ── Owner data (admin only) — for the map overlay and the PDF export ─────────

export const listOwnerParcels = createServerFn({ method: "GET" }).handler(
	async () => {
		await requireAdminUser();
		const [parcels, owners] = await Promise.all([
			container("parcels").items.readAll().fetchAll(),
			container("owners").items.readAll().fetchAll(),
		]);
		return { parcels: parcels.resources, owners: owners.resources };
	},
);

async function countDocs(name: "parcels" | "owners", filter = "") {
	const { resources } = await container(name)
		.items.query<number>(
			`SELECT VALUE COUNT(1) FROM c${filter ? ` WHERE ${filter}` : ""}`,
		)
		.fetchAll();
	return resources[0] ?? 0;
}

/** Overview counts for the owner/parcel dataset (admin dashboard). */
export const getOwnerDataStats = createServerFn({ method: "GET" }).handler(
	async () => {
		await requireAdminUser();
		const [parcels, parcelsWithGeometry, owners] = await Promise.all([
			countDocs("parcels"),
			countDocs("parcels", "c.geometry != null"),
			countDocs("owners"),
		]);
		return { parcels, parcelsWithGeometry, owners };
	},
);

// ── Owner / parcel management (admin only) ───────────────────────────────────

export const listOwners = createServerFn({ method: "GET" }).handler(
	async () => {
		await requireAdminUser();
		const { resources } = await container("owners")
			.items.readAll<{
				id: string;
				naamcode: string;
				achternaam: string;
				voornaam: string;
			}>()
			.fetchAll();
		return resources;
	},
);

export const createOwner = createServerFn({ method: "POST" })
	.inputValidator(
		(d: { naamcode: string; achternaam: string; voornaam?: string }) => d,
	)
	.handler(async ({ data }) => {
		await requireAdminUser();
		const naamcode = data.naamcode.trim();
		if (!naamcode) throw new Error("Naamcode is verplicht");
		const v = validateOwnerPatch(data);
		if (!v.ok) throw new Error(v.error);
		const id = safeId(naamcode);
		const existing = await container("owners").item(id, id).read();
		if (existing.resource) throw new Error("Naamcode bestaat al");
		await container("owners").items.upsert({
			id,
			naamcode,
			...v.value,
			totaleOppervlakte: 0,
		});
		return { ok: true };
	});

export const updateOwner = createServerFn({ method: "POST" })
	.inputValidator(
		(d: { naamcode: string; achternaam: string; voornaam?: string }) => d,
	)
	.handler(async ({ data }) => {
		await requireAdminUser();
		const v = validateOwnerPatch(data);
		if (!v.ok) throw new Error(v.error);
		const id = safeId(data.naamcode);
		const { resource } = await container("owners")
			.item(id, id)
			.read<Record<string, unknown>>();
		if (!resource) throw new Error("Eigenaar niet gevonden");
		await container("owners").items.upsert({
			...resource,
			achternaam: v.value.achternaam,
			voornaam: v.value.voornaam,
		});
		return { ok: true };
	});

export const deleteOwner = createServerFn({ method: "POST" })
	.inputValidator((d: { naamcode: string }) => d)
	.handler(async ({ data }) => {
		await requireAdminUser();
		const { resources } = await container("parcels")
			.items.query<number>({
				query: "SELECT VALUE COUNT(1) FROM c WHERE c.naamcode = @c",
				parameters: [{ name: "@c", value: data.naamcode }],
			})
			.fetchAll();
		if ((resources[0] ?? 0) > 0) {
			throw new Error(
				"Eigenaar heeft nog percelen — wijs die eerst toe aan een andere eigenaar.",
			);
		}
		const id = safeId(data.naamcode);
		await container("owners").item(id, id).delete();
		return { ok: true };
	});

export const updateParcel = createServerFn({ method: "POST" })
	.inputValidator(
		(d: { id: string; naamcode?: string; oppervlakte?: number }) => d,
	)
	.handler(async ({ data }) => {
		await requireAdminUser();
		const { resource } = await container("parcels")
			.item(data.id, data.id)
			.read<Record<string, unknown>>();
		if (!resource) throw new Error("Perceel niet gevonden");
		const patch: Record<string, unknown> = { ...resource };
		if (data.naamcode !== undefined) {
			const ownerId = safeId(data.naamcode);
			const owner = await container("owners").item(ownerId, ownerId).read();
			if (!owner.resource) throw new Error("Eigenaar bestaat niet");
			patch.naamcode = data.naamcode;
		}
		if (data.oppervlakte !== undefined) patch.oppervlakte = data.oppervlakte;
		await container("parcels").items.upsert(patch);
		return { ok: true };
	});

export const deleteParcel = createServerFn({ method: "POST" })
	.inputValidator((d: { id: string }) => d)
	.handler(async ({ data }) => {
		await requireAdminUser();
		await container("parcels").item(data.id, data.id).delete();
		return { ok: true };
	});
