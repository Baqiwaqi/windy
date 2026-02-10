import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { turbineTypes } from "@/lib/turbineTypes";
import { useAddressStore } from "@/stores/addressStore";
import { useThemeStore } from "@/stores/themeStore";
import { useTurbineStore } from "@/stores/turbineStore";
import { AddressMarker } from "./AddressMarker";
import { AffectedAddressMarkers } from "./AffectedAddressMarkers";
import { DistanceZones } from "./DistanceZones";
import { MinDistCircle } from "./MinDistCircle";
import { TurbineMarker } from "./TurbineMarker";

const TILE_URLS = {
	light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
	dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
} as const;

function MapClickHandler() {
	const { isAddMode, selectedTypeIndex, addTurbine } = useTurbineStore();

	useMapEvents({
		click(e) {
			if (isAddMode) {
				const type = turbineTypes[selectedTypeIndex];
				addTurbine(
					{ lat: e.latlng.lat, lng: e.latlng.lng },
					type,
					selectedTypeIndex,
				);
			}
		},
	});

	return null;
}

function CursorManager() {
	const isAddMode = useTurbineStore((s) => s.isAddMode);
	const map = useMapEvents({});

	if (map) {
		map.getContainer().style.cursor = isAddMode ? "crosshair" : "";
	}

	return null;
}

function MapFlyTo() {
	const map = useMap();
	const selectedAddress = useAddressStore((s) => s.selectedAddress);
	const prevRef = useRef(selectedAddress);

	useEffect(() => {
		if (selectedAddress && selectedAddress !== prevRef.current) {
			map.flyTo([selectedAddress.lat, selectedAddress.lng], 16, {
				duration: 1,
			});
		}
		prevRef.current = selectedAddress;
	}, [selectedAddress, map]);

	return null;
}

export function MapView() {
	const turbines = useTurbineStore((s) => s.turbines);
	const theme = useThemeStore((s) => s.theme);

	return (
		<MapContainer center={[52.235, 5.05]} zoom={12} className="h-full w-full">
			<TileLayer
				key={theme}
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
				url={TILE_URLS[theme]}
			/>
			<MapClickHandler />
			<CursorManager />

			{turbines.map((turbine) => (
				<TurbineMarker key={turbine.id} turbine={turbine} />
			))}

			{turbines.map((turbine) => (
				<DistanceZones key={`zones-${turbine.id}`} turbine={turbine} />
			))}

			{turbines.map((turbine) => (
				<MinDistCircle key={`min-${turbine.id}`} turbine={turbine} />
			))}

			<AffectedAddressMarkers />
			<AddressMarker />
			<MapFlyTo />
		</MapContainer>
	);
}
