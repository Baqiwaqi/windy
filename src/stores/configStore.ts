import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Configuration } from "@/types";

interface ConfigState {
	configurations: Configuration[];

	saveConfiguration: (config: Configuration) => void;
	deleteConfiguration: (id: number) => void;
	loadConfigurations: () => Configuration[];
}

export const useConfigStore = create<ConfigState>()(
	persist(
		(set, get) => ({
			configurations: [],

			saveConfiguration: (config) =>
				set((s) => ({
					configurations: [...s.configurations, config],
				})),

			deleteConfiguration: (id) =>
				set((s) => ({
					configurations: s.configurations.filter((c) => c.id !== id),
				})),

			loadConfigurations: () => get().configurations,
		}),
		{
			name: "windturbineConfigs",
		},
	),
);
