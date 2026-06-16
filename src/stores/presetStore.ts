import { create } from "zustand";
import {
	deletePreset,
	listPresets,
	publishPreset,
	type StoredPreset,
} from "@/server/rpc";

interface PresetState {
	presets: StoredPreset[];
	loading: boolean;
	load: () => Promise<void>;
	publish: (input: {
		name: string;
		turbines: StoredPreset["turbines"];
		minimumDistance: number;
	}) => Promise<void>;
	remove: (id: string) => Promise<void>;
}

/** Shared, admin-published turbine layouts. Read by everyone; written by admins. */
export const usePresetStore = create<PresetState>((set, get) => ({
	presets: [],
	loading: false,

	load: async () => {
		set({ loading: true });
		try {
			set({ presets: await listPresets() });
		} finally {
			set({ loading: false });
		}
	},

	publish: async (input) => {
		await publishPreset({ data: input });
		await get().load();
	},

	remove: async (id) => {
		await deletePreset({ data: { id } });
		await get().load();
	},
}));
