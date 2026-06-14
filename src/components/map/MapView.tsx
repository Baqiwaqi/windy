import L from "leaflet";
import { useEffect, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	useMap,
	useMapEvents,
	WMSTileLayer,
} from "react-leaflet";
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

// Parcels are only rendered/queryable by PDOK below ~1:6000; ignore clicks
// when zoomed out further than this so we don't show empty popups.
const PARCEL_MIN_ZOOM = 16;

type ParcelProps = {
	perceelnummer?: number;
	sectie?: string;
	kadastraleGemeenteWaarde?: string;
	kadastraleGrootteWaarde?: number;
};

const esc = (v: unknown) =>
	String(v ?? "").replace(
		/[&<>"]/g,
		(c) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
	);

// Ask the PDOK WMS which parcel sits under the clicked pixel (GetFeatureInfo).
async function fetchParcelInfo(
	map: L.Map,
	latlng: L.LatLng,
): Promise<ParcelProps | null> {
	const size = map.getSize();
	const point = map.latLngToContainerPoint(latlng);
	const bounds = map.getBounds();
	const crs = map.options.crs ?? L.CRS.EPSG3857;
	const sw = crs.project(bounds.getSouthWest());
	const ne = crs.project(bounds.getNorthEast());

	const params = new URLSearchParams({
		service: "WMS",
		version: "1.3.0",
		request: "GetFeatureInfo",
		layers: "Perceel",
		query_layers: "Perceel",
		crs: "EPSG:3857",
		// WMS 1.3.0 EPSG:3857 axis order is (east, north) -> minx,miny,maxx,maxy.
		bbox: `${sw.x},${sw.y},${ne.x},${ne.y}`,
		width: String(size.x),
		height: String(size.y),
		i: String(Math.round(point.x)),
		j: String(Math.round(point.y)),
		info_format: "application/json",
		feature_count: "1",
	});

	const res = await fetch(
		`https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?${params}`,
	);
	if (!res.ok) throw new Error(`WMS ${res.status}`);
	const json = (await res.json()) as {
		features?: { properties: ParcelProps }[];
	};
	return json.features?.[0]?.properties ?? null;
}

function renderParcelHtml(p: ParcelProps): string {
	const aanduiding =
		[p.kadastraleGemeenteWaarde, p.sectie, p.perceelnummer]
			.filter((v) => v != null && v !== "")
			.join(" ") || "Onbekend perceel";
	const area =
		p.kadastraleGrootteWaarde != null
			? `${Number(p.kadastraleGrootteWaarde).toLocaleString("nl-NL")} m²`
			: "–";

	return `<div style="font:13px/1.5 system-ui,sans-serif">
	<strong>${esc(aanduiding)}</strong>
	<table style="margin-top:4px;border-collapse:collapse">
		<tr><td style="padding-right:8px;opacity:.7">Perceelnummer</td><td>${esc(p.perceelnummer)}</td></tr>
		<tr><td style="padding-right:8px;opacity:.7">Sectie</td><td>${esc(p.sectie)}</td></tr>
		<tr><td style="padding-right:8px;opacity:.7">Gemeente</td><td>${esc(p.kadastraleGemeenteWaarde)}</td></tr>
		<tr><td style="padding-right:8px;opacity:.7">Oppervlakte</td><td>${esc(area)}</td></tr>
	</table>
</div>`;
}

// Click a parcel to fetch and show its cadastral details in a popup.
function ParcelInfo() {
	const map = useMap();

	useMapEvents({
		async click(e) {
			// Add-turbine clicks are owned by MapClickHandler; don't also pop a parcel.
			if (useTurbineStore.getState().isAddMode) return;

			if (map.getZoom() < PARCEL_MIN_ZOOM) {
				L.popup({ maxWidth: 260 })
					.setLatLng(e.latlng)
					.setContent("Zoom in further to inspect a parcel.")
					.openOn(map);
				return;
			}

			const popup = L.popup({ maxWidth: 260 })
				.setLatLng(e.latlng)
				.setContent("Loading parcel…")
				.openOn(map);

			try {
				const props = await fetchParcelInfo(map, e.latlng);
				popup.setContent(
					props ? renderParcelHtml(props) : "No parcel found here.",
				);
			} catch {
				popup.setContent("Could not load parcel info.");
			}
		},
	});

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
		<MapContainer
			center={[52.235, 5.05]}
			zoom={12}
			className="h-full w-full"
			// Render circles to canvas instead of SVG: html2canvas misplaces
			// Leaflet's transformed SVG overlay pane during PDF export.
			preferCanvas
		>
			<TileLayer
				key={theme}
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
				url={TILE_URLS[theme]}
			/>
			{/* Dutch cadastral parcels + parcel numbers (PDOK / Kadaster BRK).
			    Server only renders these below scale ~1:6000, so they appear on
			    zoom-in (~zoom 16+). crossOrigin keeps PDF export canvas untainted.
			    zIndex keeps it above the basemap: the base TileLayer remounts on
			    theme change (key={theme}) and would otherwise repaint on top. */}
			<WMSTileLayer
				url="https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0"
				layers="Kadastralekaart"
				format="image/png"
				transparent
				version="1.3.0"
				crossOrigin
				zIndex={10}
				attribution='Kadaster / <a href="https://www.pdok.nl">PDOK</a>'
			/>
			<MapClickHandler />
			<ParcelInfo />
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
