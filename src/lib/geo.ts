import type { LatLng } from "@/types";

/**
 * Haversine distance between two lat/lng points, in meters.
 */
export function calculateDistance(a: LatLng, b: LatLng): number {
	const R = 6371e3;

	const phi1 = (a.lat * Math.PI) / 180;
	const phi2 = (b.lat * Math.PI) / 180;
	const dPhi = ((b.lat - a.lat) * Math.PI) / 180;
	const dLambda = ((b.lng - a.lng) * Math.PI) / 180;

	const x =
		Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
		Math.cos(phi1) *
			Math.cos(phi2) *
			Math.sin(dLambda / 2) *
			Math.sin(dLambda / 2);
	const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

	return R * c;
}

/**
 * Check if any pair of turbines is closer than minDistance (meters).
 * Returns pairs of conflicting turbine IDs.
 */
export function findConflicts(
	turbines: { id: number; latlng: LatLng }[],
	minDistance: number,
): Set<number> {
	const conflicting = new Set<number>();

	for (let i = 0; i < turbines.length; i++) {
		for (let j = i + 1; j < turbines.length; j++) {
			const dist = calculateDistance(turbines[i].latlng, turbines[j].latlng);
			if (dist < minDistance) {
				conflicting.add(turbines[i].id);
				conflicting.add(turbines[j].id);
			}
		}
	}

	return conflicting;
}
