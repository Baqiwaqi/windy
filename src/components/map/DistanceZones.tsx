import { Circle } from "react-leaflet";
import { distanceZones } from "@/lib/distanceZones";
import { useMapStore } from "@/stores/mapStore";
import type { Turbine } from "@/types";

interface DistanceZonesProps {
	turbine: Turbine;
}

export function DistanceZones({ turbine }: DistanceZonesProps) {
	const zoneVisibility = useMapStore((s) => s.zoneVisibility);

	return (
		<>
			{distanceZones.map((zone) => {
				const visible = zoneVisibility[zone.id as keyof typeof zoneVisibility];
				if (!visible) return null;

				return (
					<Circle
						key={`${turbine.id}-${zone.id}`}
						center={[turbine.latlng.lat, turbine.latlng.lng]}
						radius={zone.distance}
						pathOptions={{
							color: zone.color,
							fillColor: zone.color,
							fillOpacity: 0.1,
							weight: 2,
						}}
					/>
				);
			})}
		</>
	);
}
