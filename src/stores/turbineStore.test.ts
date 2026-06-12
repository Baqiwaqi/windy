import { beforeEach, describe, expect, it } from "vitest";
import type { TurbineType } from "@/types";
import { useTurbineStore } from "./turbineStore";

const type: TurbineType = {
	name: "Test",
	hubHeight: 100,
	rotorDiameter: 120,
	power: 4,
};

const point = (lat: number, lng: number) => ({ lat, lng });

describe("turbineStore", () => {
	beforeEach(() => {
		useTurbineStore.getState().clearTurbines();
	});

	it("assigns unique ids when loading turbines in one batch", () => {
		useTurbineStore.getState().loadTurbines([
			{ latlng: point(52.1, 5.1), typeIndex: 0, type },
			{ latlng: point(52.2, 5.2), typeIndex: 0, type },
			{ latlng: point(52.3, 5.3), typeIndex: 1, type },
		]);

		const ids = useTurbineStore.getState().turbines.map((t) => t.id);
		expect(new Set(ids).size).toBe(3);
	});

	it("moves only the targeted turbine after a batch load", () => {
		const store = useTurbineStore.getState();
		store.loadTurbines([
			{ latlng: point(52.1, 5.1), typeIndex: 0, type },
			{ latlng: point(52.2, 5.2), typeIndex: 0, type },
		]);

		const [first, second] = useTurbineStore.getState().turbines;
		store.moveTurbine(first.id, point(53.0, 6.0));

		const after = useTurbineStore.getState().turbines;
		expect(after[0].latlng).toEqual(point(53.0, 6.0));
		expect(after[1].latlng).toEqual(second.latlng);
	});

	it("assigns unique ids to turbines added in the same millisecond", () => {
		const store = useTurbineStore.getState();
		store.addTurbine(point(52.1, 5.1), type, 0);
		store.addTurbine(point(52.2, 5.2), type, 0);

		const ids = useTurbineStore.getState().turbines.map((t) => t.id);
		expect(new Set(ids).size).toBe(2);
	});
});
