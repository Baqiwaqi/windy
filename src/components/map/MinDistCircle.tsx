import { useMemo } from "react";
import { Circle } from "react-leaflet";
import { findConflicts } from "@/lib/geo";
import { useMapStore } from "@/stores/mapStore";
import { useTurbineStore } from "@/stores/turbineStore";
import type { Turbine } from "@/types";

interface MinDistCircleProps {
	turbine: Turbine;
}

export function MinDistCircle({ turbine }: MinDistCircleProps) {
	const showMinDistance = useMapStore((s) => s.showMinDistance);
	const minimumTurbineDistance = useMapStore((s) => s.minimumTurbineDistance);
	const turbines = useTurbineStore((s) => s.turbines);

	const conflicting = useMemo(
		() => findConflicts(turbines, minimumTurbineDistance),
		[turbines, minimumTurbineDistance],
	);

	if (!showMinDistance) return null;

	const hasConflict = conflicting.has(turbine.id);

	return (
		<Circle
			center={[turbine.latlng.lat, turbine.latlng.lng]}
			radius={minimumTurbineDistance}
			pathOptions={{
				color: hasConflict ? "#dc2626" : "#8b5cf6",
				fillColor: hasConflict ? "#dc2626" : "#8b5cf6",
				fillOpacity: hasConflict ? 0.25 : 0.15,
				weight: 2,
				dashArray: "5, 5",
			}}
		/>
	);
}
