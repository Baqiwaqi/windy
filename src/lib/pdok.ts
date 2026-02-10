interface PdokResult {
	weergavenaam: string;
	centroide_ll: string;
	postcode?: string;
}

interface PdokSearchResponse {
	response: {
		docs: PdokResult[];
	};
}

export interface SearchedAddress {
	latlng: { lat: number; lng: number };
	address: string;
	postcode: string;
	huisnummer: string;
}

/**
 * Search for a Dutch address using the PDOK Locatieserver API.
 */
export async function searchAddress(
	postcode: string,
	huisnummer: string,
): Promise<SearchedAddress> {
	const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();

	const response = await fetch(
		`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${cleanPostcode}+${huisnummer}&fq=type:adres`,
	);
	const data: PdokSearchResponse = await response.json();

	if (data.response.docs.length === 0) {
		throw new Error("Adres niet gevonden");
	}

	const result = data.response.docs[0];

	const match = result.centroide_ll.match(/POINT\(([^ ]+) ([^ ]+)\)/);
	if (!match) {
		throw new Error("Ongeldige co\u00f6rdinaten ontvangen van PDOK API");
	}

	const lng = parseFloat(match[1]);
	const lat = parseFloat(match[2]);

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error("Ongeldige co\u00f6rdinaten ontvangen van PDOK API");
	}

	if (lat < 50 || lat > 54 || lng < 3 || lng > 8) {
		throw new Error("Co\u00f6rdinaten lijken niet in Nederland te liggen");
	}

	return {
		latlng: { lat, lng },
		address: result.weergavenaam,
		postcode: cleanPostcode,
		huisnummer,
	};
}
