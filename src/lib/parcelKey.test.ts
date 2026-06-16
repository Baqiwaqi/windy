import { describe, expect, it } from "vitest";
import { matchParcel, parcelKey } from "@/lib/parcelKey";

describe("parcelKey", () => {
	it("normalizes case and surrounding whitespace into a canonical key", () => {
		expect(parcelKey(" loenen ", "f", 19)).toBe("LOENEN|F|19");
	});
});

describe("matchParcel", () => {
	const parcels = [
		{
			gemeente: "Loenen",
			gemeenteCode: "LNN00",
			sectie: "F",
			perceelnummer: 19,
		},
	];

	it("matches a clicked parcel when PDOK returns the gemeente name", () => {
		const click = {
			kadastraleGemeenteWaarde: "Loenen",
			sectie: "F",
			perceelnummer: 19,
		};
		expect(matchParcel(click, parcels)).toBe(parcels[0]);
	});

	it("matches the same parcel when PDOK returns the gemeente code instead", () => {
		const click = {
			kadastraleGemeenteWaarde: "LNN00",
			sectie: "F",
			perceelnummer: 19,
		};
		expect(matchParcel(click, parcels)).toBe(parcels[0]);
	});

	it("returns null when no stored parcel matches", () => {
		const click = {
			kadastraleGemeenteWaarde: "Loenen",
			sectie: "G",
			perceelnummer: 99,
		};
		expect(matchParcel(click, parcels)).toBeNull();
	});

	it("does not cross-match an identical sectie + perceelnummer in another gemeente", () => {
		const click = {
			kadastraleGemeenteWaarde: "Vreeland",
			sectie: "F",
			perceelnummer: 19,
		};
		expect(matchParcel(click, parcels)).toBeNull();
	});
});
