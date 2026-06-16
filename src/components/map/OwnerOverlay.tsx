import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Layer } from "leaflet";
import { GeoJSON } from "react-leaflet";
import { ownerColor } from "@/lib/ownerColors";
import { useOwnerStore } from "@/stores/ownerStore";

interface ParcelProps {
	naamcode: string;
	aanduiding: string;
	label: string;
	eigenaar: string;
}

/** Admin-only vector overlay: parcels drawn as polygons colored per owner, each
 *  carrying a permanent owner-name label and a detail popup. */
export function OwnerOverlay() {
	const enabled = useOwnerStore((s) => s.enabled);
	const parcels = useOwnerStore((s) => s.parcels);
	const owners = useOwnerStore((s) => s.owners);

	if (!enabled) return null;

	const ownerByCode = new Map(owners.map((o) => [o.naamcode, o]));
	const fullName = (code: string) => {
		const o = ownerByCode.get(code);
		if (!o) return code;
		return `${o.voornaam} ${o.achternaam}`.trim() || o.achternaam || code;
	};
	const shortName = (code: string) => ownerByCode.get(code)?.achternaam || code;

	const features: Feature<Geometry, ParcelProps>[] = parcels
		.filter((p) => p.geometry)
		.map((p) => ({
			type: "Feature",
			geometry: p.geometry as Geometry,
			properties: {
				naamcode: p.naamcode,
				aanduiding: `${p.gemeente} ${p.sectie} ${p.perceelnummer}`,
				label: shortName(p.naamcode),
				eigenaar: fullName(p.naamcode),
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
				layer.bindTooltip(feature.properties.label, {
					permanent: true,
					direction: "center",
					className: "owner-label",
				});
				layer.bindPopup(
					`<strong>${feature.properties.eigenaar}</strong><br/>${feature.properties.aanduiding}`,
				);
			}}
		/>
	);
}
