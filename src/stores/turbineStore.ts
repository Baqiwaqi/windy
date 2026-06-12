import { create } from "zustand";
import type { LatLng, Turbine, TurbineType } from "@/types";

interface TurbineState {
	turbines: Turbine[];
	isAddMode: boolean;
	selectedTypeIndex: number;

	setAddMode: (on: boolean) => void;
	toggleAddMode: () => void;
	setSelectedTypeIndex: (idx: number) => void;
	addTurbine: (latlng: LatLng, type: TurbineType, typeIndex: number) => void;
	removeTurbine: (id: number) => void;
	moveTurbine: (id: number, latlng: LatLng) => void;
	clearTurbines: () => void;
	loadTurbines: (turbines: Omit<Turbine, "id">[]) => void;
}

// Date.now() collides when several turbines are created in the same
// millisecond (e.g. loading a saved configuration), which breaks React keys
// and makes moveTurbine match multiple turbines. A counter is always unique.
let idCounter = Date.now();
const nextId = () => ++idCounter;

export const useTurbineStore = create<TurbineState>((set) => ({
	turbines: [],
	isAddMode: false,
	selectedTypeIndex: 0,

	setAddMode: (on) => set({ isAddMode: on }),
	toggleAddMode: () => set((s) => ({ isAddMode: !s.isAddMode })),
	setSelectedTypeIndex: (idx) => set({ selectedTypeIndex: idx }),

	addTurbine: (latlng, type, typeIndex) =>
		set((s) => ({
			turbines: [...s.turbines, { id: nextId(), latlng, type, typeIndex }],
			isAddMode: false,
		})),

	removeTurbine: (id) =>
		set((s) => ({
			turbines: s.turbines.filter((t) => t.id !== id),
		})),

	moveTurbine: (id, latlng) =>
		set((s) => ({
			turbines: s.turbines.map((t) => (t.id === id ? { ...t, latlng } : t)),
		})),

	clearTurbines: () => set({ turbines: [] }),

	loadTurbines: (turbines) =>
		set({ turbines: turbines.map((t) => ({ ...t, id: nextId() })) }),
}));
