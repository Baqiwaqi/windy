import type { Polygon } from "geojson";
import { describe, expect, it } from "vitest";
import {
	ownersWithinRadius,
	parcelDistance,
	turbineParcel,
} from "@/lib/betrokken";

// A small square parcel near the polder, in GeoJSON [lng, lat] order.
const square = (
	lng0: number,
	lat0: number,
	lng1: number,
	lat1: number,
): Polygon => ({
	type: "Polygon",
	coordinates: [
		[
			[lng0, lat0],
			[lng1, lat0],
			[lng1, lat1],
			[lng0, lat1],
			[lng0, lat0],
		],
	],
});

describe("turbineParcel", () => {
	it("returns the parcel whose polygon contains the turbine", () => {
		const parcels = [
			{ key: "A", naamcode: "Bijl", geometry: square(5.0, 52.16, 5.01, 52.17) },
		];
		const hit = turbineParcel({ lat: 52.165, lng: 5.005 }, parcels);
		expect(hit?.naamcode).toBe("Bijl");
	});

	it("returns null when the turbine is outside every parcel", () => {
		const parcels = [
			{ key: "A", naamcode: "Bijl", geometry: square(5.0, 52.16, 5.01, 52.17) },
		];
		expect(turbineParcel({ lat: 52.2, lng: 5.05 }, parcels)).toBeNull();
	});
});

describe("parcelDistance", () => {
	it("is 0 when the turbine is inside the parcel", () => {
		const parcel = {
			key: "A",
			naamcode: "Bijl",
			geometry: square(5.0, 52.16, 5.01, 52.17),
		};
		expect(parcelDistance({ lat: 52.165, lng: 5.005 }, parcel)).toBe(0);
	});

	it("returns the boundary distance in meters when the turbine is outside", () => {
		const parcel = {
			key: "A",
			naamcode: "Bijl",
			geometry: square(5.0, 52.16, 5.01, 52.17),
		};
		// ~0.01° lng east of the parcel's east edge at this latitude ≈ 680 m.
		const d = parcelDistance({ lat: 52.165, lng: 5.02 }, parcel);
		expect(d).toBeGreaterThan(600);
		expect(d).toBeLessThan(760);
	});
});

describe("ownersWithinRadius", () => {
	it("includes owners within R and excludes those beyond", () => {
		const near = {
			key: "A",
			naamcode: "Bijl",
			geometry: square(5.0, 52.16, 5.01, 52.17),
		};
		const far = {
			key: "B",
			naamcode: "Soede",
			geometry: square(5.2, 52.16, 5.21, 52.17),
		};
		const owners = ownersWithinRadius([{ lat: 52.165, lng: 5.005 }], 1000, [
			near,
			far,
		]);
		expect(owners).toContain("Bijl");
		expect(owners).not.toContain("Soede");
	});

	it("returns each owner once, unioned across all turbines", () => {
		const p1 = {
			key: "A",
			naamcode: "Bijl",
			geometry: square(5.0, 52.16, 5.01, 52.17),
		};
		const p2 = {
			key: "B",
			naamcode: "Bijl",
			geometry: square(5.02, 52.16, 5.03, 52.17),
		};
		const owners = ownersWithinRadius(
			[
				{ lat: 52.165, lng: 5.005 },
				{ lat: 52.165, lng: 5.025 },
			],
			100,
			[p1, p2],
		);
		expect(owners).toEqual(["Bijl"]);
	});
});
