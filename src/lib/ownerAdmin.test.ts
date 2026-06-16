import { describe, expect, it } from "vitest";
import {
	filterOwners,
	filterParcels,
	validateOwnerPatch,
	validateReassign,
} from "@/lib/ownerAdmin";

const owners = [
	{ naamcode: "Bijl", achternaam: "Bijl", voornaam: "Simone" },
	{ naamcode: "Coers", achternaam: "Coers", voornaam: "Pieter" },
];

describe("filterOwners", () => {
	it("matches surname case-insensitively", () => {
		expect(filterOwners(owners, "bij").map((o) => o.naamcode)).toEqual([
			"Bijl",
		]);
	});

	it("also matches first name and naamcode; empty returns all; miss returns none", () => {
		expect(filterOwners(owners, "pieter").map((o) => o.naamcode)).toEqual([
			"Coers",
		]);
		expect(filterOwners(owners, "")).toHaveLength(2);
		expect(filterOwners(owners, "zzz")).toEqual([]);
	});
});

const parcels = [
	{ naamcode: "Bijl", gemeente: "Loenen", sectie: "F", perceelnummer: 19 },
	{ naamcode: "Coers", gemeente: "Loenen", sectie: "F", perceelnummer: 34 },
];

describe("filterParcels", () => {
	it("matches perceelnummer, sectie/gemeente, and naamcode", () => {
		expect(filterParcels(parcels, "19").map((p) => p.perceelnummer)).toEqual([
			19,
		]);
		expect(filterParcels(parcels, "coers").map((p) => p.naamcode)).toEqual([
			"Coers",
		]);
		expect(filterParcels(parcels, "loenen")).toHaveLength(2);
		expect(filterParcels(parcels, "")).toHaveLength(2);
	});
});

describe("validateOwnerPatch", () => {
	it("rejects an empty surname and trims a valid patch", () => {
		expect(validateOwnerPatch({ achternaam: "   " }).ok).toBe(false);
		const r = validateOwnerPatch({
			achternaam: "  Bijl ",
			voornaam: " Simone ",
		});
		expect(r.ok).toBe(true);
		if (r.ok) {
			expect(r.value.achternaam).toBe("Bijl");
			expect(r.value.voornaam).toBe("Simone");
		}
	});
});

describe("validateReassign", () => {
	it("allows reassigning only to an existing owner", () => {
		expect(validateReassign("Coers", ["Bijl", "Coers"])).toBe(true);
		expect(validateReassign("Ghost", ["Bijl", "Coers"])).toBe(false);
	});
});
