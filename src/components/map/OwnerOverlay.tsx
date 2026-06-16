import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Layer } from "leaflet";
import { GeoJSON } from "react-leaflet";
import { ownerColor } from "@/lib/ownerColors";
import { useOwnerStore } from "@/stores/ownerStore";

interface ParcelProps {
	naamcode: string;
	aanduiding: string;
}

/** Admin-only vector overlay: parcels drawn as polygons colored per owner. */
export function OwnerOverlay() {
	const enabled = useOwnerStore((s) => s.enabled);
	const parcels = useOwnerStore((s) => s.parcels);

	if (!enabled) return null;

	const features: Feature<Geometry, ParcelProps>[] = parcels
		.filter((p) => p.geometry)
		.map((p) => ({
			type: "Feature",
			geometry: p.geometry as Geometry,
			properties: {
				naamcode: p.naamcode,
				aanduiding: `${p.gemeente} ${p.sectie} ${p.perceelnummer}`,
			},
		}));

	const data: FeatureCollection<Geometry, ParcelProps> = {
		type: "FeatureCollection",
		features,
	};

	return (
		<GeoJSON
			// Remount when the loaded parcel set changes (react-leaflet GeoJSON is
			// otherwise set once and never updates its data).
			key={`owners-${features.length}`}
			data={data}
			style={(feature) => {
				const color = ownerColor(feature?.properties?.naamcode ?? "");
				return { color, weight: 1, fillColor: color, fillOpacity: 0.35 };
			}}
			onEachFeature={(
				feature: Feature<Geometry, ParcelProps>,
				layer: Layer,
			) => {
				layer.bindPopup(
					`<strong>${feature.properties.naamcode}</strong><br/>${feature.properties.aanduiding}`,
				);
			}}
		/>
	);
}
