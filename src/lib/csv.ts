import Papa from "papaparse";
import type { Address } from "@/types";

const BAG_OBJECTTYPE_CODES: Record<string, string> = {
	"01": "verblijfsobject",
	"02": "ligplaats",
	"03": "standplaats",
};

/**
 * Parse a CSV file into Address[].
 * Auto-detects columns from header row.
 */
export function parseAddressCsv(csvText: string): Address[] {
	const result = Papa.parse<Record<string, string>>(csvText, {
		header: true,
		skipEmptyLines: true,
	});

	if (result.errors.length > 0 && result.data.length === 0) {
		throw new Error(`CSV parse fout: ${result.errors[0].message}`);
	}

	const fields = result.meta.fields ?? [];
	const lower = fields.map((f) => f.toLowerCase());

	const find = (...names: string[]) => {
		for (const n of names) {
			const idx = lower.indexOf(n);
			if (idx >= 0) return fields[idx];
		}
		return null;
	};

	const adresCol = find("adres", "address", "weergavenaam") ?? fields[0];
	const postcodeCol = find("postcode") ?? fields[1];
	const latCol = find("lat", "latitude");
	const lngCol = find("lng", "lon", "longitude");
	const huisnummerCol = find("huisnummer", "huis_nlt");
	const woonplaatsCol = find("woonplaats", "woonplaatsnaam");
	const objecttypeCol = find("objecttype");

	if (!latCol || !lngCol) {
		throw new Error(
			'CSV bestand mist lat/lng kolommen.\nZorg dat de header "lat" en "lng" kolommen bevat.',
		);
	}

	const addresses: Address[] = [];

	for (const row of result.data) {
		const lat = parseFloat(row[latCol]);
		const lng = parseFloat(row[lngCol]);

		if (isNaN(lat) || isNaN(lng)) continue;

		addresses.push({
			address: row[adresCol] ?? "",
			postcode: row[postcodeCol] ?? "",
			huisnummer: huisnummerCol ? (row[huisnummerCol] ?? "") : "",
			woonplaats: woonplaatsCol ? (row[woonplaatsCol] ?? "") : "",
			objecttype: objecttypeCol
				? (row[objecttypeCol] ?? "verblijfsobject")
				: "verblijfsobject",
			lat,
			lng,
		});
	}

	return addresses;
}

// re-export for use in fetch script
export { BAG_OBJECTTYPE_CODES };
