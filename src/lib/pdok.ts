interface PdokResult {
	weergavenaam: string;
	centroide_ll: string;
	postcode?: string;
	huis_nlt?: string;
	nummeraanduiding_id?: string;
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

/**
 * Resolve the BAG nummeraanduiding_id for an address via the PDOK
 * Locatieserver. Returns null when the address cannot be resolved,
 * so callers can continue without a WOZ value.
 */
export async function lookupNummeraanduidingId(
	postcode: string,
	huisnummer: string,
): Promise<string | null> {
	const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
	const cleanHuisnummer = huisnummer.trim().toUpperCase();

	try {
		const response = await fetch(
			`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${cleanPostcode}+${encodeURIComponent(cleanHuisnummer)}&fq=type:adres&fl=nummeraanduiding_id,postcode,huis_nlt&rows=5`,
		);
		if (!response.ok) return null;

		const data: PdokSearchResponse = await response.json();
		const docs = data.response.docs;
		if (docs.length === 0) return null;

		const exact = docs.find(
			(doc) =>
				doc.postcode === cleanPostcode &&
				doc.huis_nlt?.toUpperCase() === cleanHuisnummer,
		);

		return (exact ?? docs[0]).nummeraanduiding_id ?? null;
	} catch {
		return null;
	}
}
