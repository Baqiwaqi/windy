import { CircleMarker, Popup } from "react-leaflet";
import { distanceZones } from "@/lib/distanceZones";
import { useAddressStore } from "@/stores/addressStore";

function getZoneColor(distance: number): string {
	for (const zone of distanceZones) {
		if (distance <= zone.distance) return zone.color;
	}
	return distanceZones[distanceZones.length - 1].color;
}

export function AffectedAddressMarkers() {
	const affectedAddresses = useAddressStore((s) => s.affectedAddresses);
	const selectedAddress = useAddressStore((s) => s.selectedAddress);
	const setSelectedAddress = useAddressStore((s) => s.setSelectedAddress);

	if (affectedAddresses.length === 0) return null;

	return (
		<>
			{affectedAddresses.map((addr) => {
				const isSelected =
					selectedAddress?.address === addr.address &&
					selectedAddress?.turbineIndex === addr.turbineIndex;
				const color = getZoneColor(addr.distance);

				return (
					<CircleMarker
						key={`${addr.address}-${addr.turbineIndex}`}
						center={[addr.lat, addr.lng]}
						radius={isSelected ? 8 : 5}
						pathOptions={{
							color: isSelected ? "#ffffff" : color,
							fillColor: color,
							fillOpacity: isSelected ? 1 : 0.7,
							weight: isSelected ? 3 : 1.5,
						}}
						eventHandlers={{
							click: () => setSelectedAddress(addr),
						}}
					>
						<Popup>
							<div className="text-xs space-y-1">
								<p className="font-semibold">{addr.address}</p>
								<p>{addr.postcode} {addr.woonplaats}</p>
								<p>
									<span
										className="inline-block w-2 h-2 rounded-full mr-1"
										style={{ backgroundColor: color }}
									/>
									{addr.distance}m — {addr.turbineName}
								</p>
							</div>
						</Popup>
					</CircleMarker>
				);
			})}
		</>
	);
}
