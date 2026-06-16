import type { MultiPolygon, Polygon } from "geojson";
import { create } from "zustand";
import { listOwnerParcels } from "@/server/rpc";

export interface OwnerParcel {
	id: string;
	key: string;
	gemeente: string;
	sectie: string;
	perceelnummer: number;
	oppervlakte: number;
	naamcode: string;
	locationUnknown?: boolean;
	geometry: Polygon | MultiPolygon | null;
}

export interface OwnerDoc {
	id: string;
	naamcode: string;
	achternaam: string;
	voornaam: string;
}

interface OwnerState {
	isAdmin: boolean;
	enabled: boolean;
	loading: boolean;
	loaded: boolean;
	parcels: OwnerParcel[];
	owners: OwnerDoc[];
	setAdmin: (value: boolean) => void;
	toggle: () => Promise<void>;
}

/**
 * Admin-only owner overlay state. Owner data is fetched lazily (only when the
 * admin first enables the overlay) from the admin-gated `listOwnerParcels`.
 */
export const useOwnerStore = create<OwnerState>((set, get) => ({
	isAdmin: false,
	enabled: false,
	loading: false,
	loaded: false,
	parcels: [],
	owners: [],

	setAdmin: (value) => set({ isAdmin: value }),

	toggle: async () => {
		const next = !get().enabled;
		set({ enabled: next });
		if (!next || get().loaded || get().loading) return;

		set({ loading: true });
		try {
			const { parcels, owners } = await listOwnerParcels();
			set({
				parcels: parcels as OwnerParcel[],
				owners: owners as OwnerDoc[],
				loaded: true,
			});
		} catch (err) {
			console.error("Kon eigenaren-data niet laden", err);
			set({ enabled: false });
		} finally {
			set({ loading: false });
		}
	},
}));
