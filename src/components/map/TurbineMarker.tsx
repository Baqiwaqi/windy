import L from "leaflet";
import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { turbineColors } from "@/lib/turbineTypes";
import { useTurbineStore } from "@/stores/turbineStore";
import type { Turbine } from "@/types";

function createTurbineIcon(typeIndex: number) {
	const color = turbineColors[typeIndex];

	return L.divIcon({
		html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <circle cx="12" cy="12" r="11" fill="${color.fill}" opacity="0.9"/>
      <path d="M12 2 L12 22 M12 12 L2 7 M12 12 L22 7 M12 12 L17 22"
            stroke="white" stroke-width="1.5" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>`,
		className: "",
		iconSize: [36, 36],
		iconAnchor: [18, 18],
		popupAnchor: [0, -18],
	});
}

interface TurbineMarkerProps {
	turbine: Turbine;
}

export function TurbineMarker({ turbine }: TurbineMarkerProps) {
	const moveTurbine = useTurbineStore((s) => s.moveTurbine);

	const icon = useMemo(
		() => createTurbineIcon(turbine.typeIndex),
		[turbine.typeIndex],
	);

	const tipHeight = turbine.type.hubHeight + turbine.type.rotorDiameter / 2;

	return (
		<Marker
			position={[turbine.latlng.lat, turbine.latlng.lng]}
			icon={icon}
			draggable
			eventHandlers={{
				drag(e) {
					const pos = e.target.getLatLng();
					moveTurbine(turbine.id, { lat: pos.lat, lng: pos.lng });
				},
				dragend(e) {
					const pos = e.target.getLatLng();
					moveTurbine(turbine.id, { lat: pos.lat, lng: pos.lng });
				},
			}}
		>
			<Popup>
				<div className="text-sm">
					<p className="font-semibold">{turbine.type.name}</p>
					<p>Ashoogte: {turbine.type.hubHeight}m</p>
					<p>Rotordiameter: {turbine.type.rotorDiameter}m</p>
					<p>Vermogen: {turbine.type.power} MW</p>
					<p className="text-xs text-gray-600 mt-1">Tiphoogte: {tipHeight}m</p>
					<p className="text-xs text-blue-600 mt-2">
						Sleep de turbine om te verplaatsen
					</p>
				</div>
			</Popup>
		</Marker>
	);
}
