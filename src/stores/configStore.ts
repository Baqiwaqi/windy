import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Configuration } from "@/types";

interface ConfigState {
	configurations: Configuration[];
	activeConfigId: number | null;

	saveConfiguration: (config: Configuration) => void;
	deleteConfiguration: (id: number) => void;
	setActiveConfig: (id: number | null) => void;
	loadConfigurations: () => Configuration[];
}

export const useConfigStore = create<ConfigState>()(
	persist(
		(set, get) => ({
			configurations: [],
			activeConfigId: null,

			saveConfiguration: (config) =>
				set((s) => {
					const idx = s.configurations.findIndex((c) => c.id === config.id);
					if (idx === -1) {
						return { configurations: [...s.configurations, config] };
					}
					const next = [...s.configurations];
					next[idx] = config;
					return { configurations: next };
				}),

			deleteConfiguration: (id) =>
				set((s) => ({
					configurations: s.configurations.filter((c) => c.id !== id),
					activeConfigId: s.activeConfigId === id ? null : s.activeConfigId,
				})),

			setActiveConfig: (id) => set({ activeConfigId: id }),

			loadConfigurations: () => get().configurations,
		}),
		{
			name: "windturbineConfigs",
			partialize: (s) => ({ configurations: s.configurations }),
		},
	),
);
