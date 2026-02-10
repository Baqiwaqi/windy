import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: "dark",
			toggleTheme: () =>
				set((s) => {
					const next = s.theme === "dark" ? "light" : "dark";
					document.documentElement.classList.toggle("dark", next === "dark");
					return { theme: next };
				}),
			setTheme: (theme) =>
				set(() => {
					document.documentElement.classList.toggle("dark", theme === "dark");
					return { theme };
				}),
		}),
		{
			name: "windy-theme",
			onRehydrateStorage: () => (state) => {
				if (state) {
					document.documentElement.classList.toggle(
						"dark",
						state.theme === "dark",
					);
				}
			},
		},
	),
);
