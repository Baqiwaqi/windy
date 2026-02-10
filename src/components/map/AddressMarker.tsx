import { Marker, Popup } from "react-leaflet";
import { useAddressStore } from "@/stores/addressStore";

export function AddressMarker() {
	const searchedAddress = useAddressStore((s) => s.searchedAddress);

	if (!searchedAddress) return null;

	return (
		<Marker position={[searchedAddress.latlng.lat, searchedAddress.latlng.lng]}>
			<Popup>
				<div className="text-sm">
					<p className="font-semibold">{searchedAddress.address}</p>
				</div>
			</Popup>
		</Marker>
	);
}
