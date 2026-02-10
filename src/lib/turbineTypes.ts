import type { TurbineType } from "@/types";

export const turbineTypes: TurbineType[] = [
	{
		name: "Klein (3 MW, 150m tip)",
		hubHeight: 100,
		rotorDiameter: 100,
		power: 3,
	},
	{
		name: "Middelgroot (4.5 MW, 200m tip)",
		hubHeight: 120,
		rotorDiameter: 160,
		power: 4.5,
	},
	{
		name: "Groot (6 MW, 250m tip)",
		hubHeight: 150,
		rotorDiameter: 200,
		power: 6,
	},
];

export const turbineColors = [
	{ fill: "#10b981", name: "Groen" },
	{ fill: "#f59e0b", name: "Oranje" },
	{ fill: "#ef4444", name: "Rood" },
];

export const turbineEmojis = ["\u{1F7E2}", "\u{1F7E0}", "\u{1F534}"];
