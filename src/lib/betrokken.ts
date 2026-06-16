import {
	booleanPointInPolygon,
	lineString,
	point,
	pointToLineDistance,
} from "@turf/turf";
import type { MultiPolygon, Polygon } from "geojson";

export interface ParcelGeometry {
	key: string;
	naamcode: string;
	geometry: Polygon | MultiPolygon;
}

export interface TurbinePoint {
	lat: number;
	lng: number;
}

/** The parcel whose polygon contains the turbine, or null if none does. */
export function turbineParcel<T extends ParcelGeometry>(
	turbine: TurbinePoint,
	parcels: T[],
): T | null {
	const pt = point([turbine.lng, turbine.lat]);
	return parcels.find((p) => booleanPointInPolygon(pt, p.geometry)) ?? null;
}

/** Every boundary ring of a polygon or multipolygon, as coordinate arrays. */
function rings(geom: Polygon | MultiPolygon): number[][][] {
	return geom.type === "Polygon" ? geom.coordinates : geom.coordinates.flat();
}

/** Distance in meters from a turbine to a parcel — 0 when inside it. */
export function parcelDistance(
	turbine: TurbinePoint,
	parcel: ParcelGeometry,
): number {
	const pt = point([turbine.lng, turbine.lat]);
	if (booleanPointInPolygon(pt, parcel.geometry)) return 0;
	return Math.min(
		...rings(parcel.geometry).map((ring) =>
			pointToLineDistance(pt, lineString(ring), { units: "meters" }),
		),
	);
}

/** Naamcodes of owners whose parcels lie within radiusM of any turbine. */
export function ownersWithinRadius(
	turbines: TurbinePoint[],
	radiusM: number,
	parcels: ParcelGeometry[],
): string[] {
	const naamcodes = new Set<string>();
	for (const parcel of parcels) {
		if (turbines.some((t) => parcelDistance(t, parcel) <= radiusM)) {
			naamcodes.add(parcel.naamcode);
		}
	}
	return [...naamcodes];
}
