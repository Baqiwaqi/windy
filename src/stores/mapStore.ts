import { create } from "zustand";

interface ZoneVisibility {
	zone500: boolean;
	zone1000: boolean;
	zone1500: boolean;
	zone2000: boolean;
}

interface MapState {
	zoneVisibility: ZoneVisibility;
	showMinDistance: boolean;
	minimumTurbineDistance: number;
	hinderDistance: number;

	toggleZone: (zoneId: keyof ZoneVisibility) => void;
	setShowMinDistance: (show: boolean) => void;
	setMinimumTurbineDistance: (distance: number) => void;
	setHinderDistance: (distance: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
	zoneVisibility: {
		zone500: true,
		zone1000: true,
		zone1500: true,
		zone2000: false,
	},
	showMinDistance: true,
	minimumTurbineDistance: 800,
	hinderDistance: 1000,

	toggleZone: (zoneId) =>
		set((s) => ({
			zoneVisibility: {
				...s.zoneVisibility,
				[zoneId]: !s.zoneVisibility[zoneId],
			},
		})),

	setShowMinDistance: (show) => set({ showMinDistance: show }),
	setMinimumTurbineDistance: (distance) =>
		set({ minimumTurbineDistance: distance }),
	setHinderDistance: (distance) => set({ hinderDistance: distance }),
}));
