import { parcelKey } from "@/lib/parcelKey";

export interface NormalizedParcel {
	key: string;
	gemeente: string;
	gemeenteCode?: string;
	sectie: string;
	perceelnummer: number;
	oppervlakte: number;
	naamcode: string;
	locationUnknown?: boolean;
}

export interface OwnerAddress {
	straat?: string;
	huisnr?: string;
	postcode?: string;
	plaats?: string;
}

export interface RelatedParty {
	rol?: string;
	naam: string;
	adres?: OwnerAddress;
	gebDatum?: string;
}

export interface NormalizedOwner {
	naamcode: string;
	achternaam: string;
	voornaam: string;
	adres?: OwnerAddress;
	gebDatum?: string;
	partner?: RelatedParty;
	erfpacht?: RelatedParty;
	totaleOppervlakte: number;
}

const str = (v: unknown): string => (v == null ? "" : String(v).trim());

const toIsoDate = (v: unknown): string | undefined => {
	if (v instanceof Date) return v.toISOString().slice(0, 10);
	return str(v) || undefined;
};

/** Canonicalize a Dutch postcode to "1234 AB"; pass other values through. */
const normalizePostcode = (v: unknown): string => {
	const compact = str(v).toUpperCase().replace(/\s+/g, "");
	const m = compact.match(/^(\d{4})([A-Z]{2})$/);
	return m ? `${m[1]} ${m[2]}` : str(v).toUpperCase();
};

/** Build an address, or undefined when every field is empty. */
const buildAddress = (
	straat: unknown,
	huisnr: unknown,
	postcode: unknown,
	plaats: unknown,
): OwnerAddress | undefined => {
	const adres: OwnerAddress = {
		straat: str(straat),
		huisnr: str(huisnr),
		postcode: normalizePostcode(postcode),
		plaats: str(plaats),
	};
	return adres.straat || adres.huisnr || adres.postcode || adres.plaats
		? adres
		: undefined;
};

/**
 * Normalize raw `Perc`-sheet data rows (title + header already sliced off) into
 * clean Parcel records. Each row is [gemeente, gemeenteCode, sectie,
 * perceelnummer, oppervlakte, naamcode].
 */
export function normalizeParcels(rows: unknown[][]): NormalizedParcel[] {
	// First pass: learn each gemeente's code from the rows that carry one, so
	// rows that left it blank can be backfilled. Gemeente is matched case-
	// insensitively ("vreeland" / "Vreeland").
	const codeByGemeente = new Map<string, string>();
	for (const r of rows) {
		const gemeente = str(r[0]).toUpperCase();
		const code = str(r[1]);
		if (gemeente && code && !codeByGemeente.has(gemeente)) {
			codeByGemeente.set(gemeente, code);
		}
	}

	return rows
		.filter((r) => str(r[5]) !== "")
		.map((r) => {
			const gemeente = str(r[0]);
			const sectie = str(r[2]);
			const perceelnummer = Number(r[3]);
			const code = str(r[1]) || codeByGemeente.get(gemeente.toUpperCase());
			// A `?` row has no real cadastral location (only owner + area).
			const locationUnknown = !Number.isFinite(perceelnummer);
			return {
				key: parcelKey(gemeente, sectie, perceelnummer),
				gemeente,
				gemeenteCode: code || undefined,
				sectie,
				perceelnummer,
				oppervlakte: Number(r[4]),
				naamcode: str(r[5]),
				...(locationUnknown ? { locationUnknown: true } : {}),
			};
		});
}

/**
 * Normalize raw `Eigen`-sheet data rows (title + header already sliced off)
 * into clean Owner records. Column layout: [volgnr, achternaam, voornaam,
 * totaleOpp, naamcode, straat, huisnr, postcode, plaats, gebDatum, met,
 * partnerNaam, partnerAdres, partnerPostcode, partnerPlaats, partnerGebDatum].
 */
export function normalizeOwners(rows: unknown[][]): NormalizedOwner[] {
	return rows
		.filter((r) => str(r[4]) !== "")
		.map((r) => {
			// The erfpacht block is misaligned: the keyword "Erfpacht" sits in
			// the partner-Naam slot, shifting the erfpachter's name, address and
			// birthdate one column to the right.
			const isErfpacht = str(r[11]).toLowerCase() === "erfpacht";
			const erfpacht: RelatedParty | undefined = isErfpacht
				? {
						rol: "Erfpacht",
						naam: str(r[12]),
						adres: buildAddress(r[13], "", r[14], r[15]),
						gebDatum: toIsoDate(r[16]),
					}
				: undefined;

			// A partner block is keyed on the "Met" column (man/Vrouw); its
			// address is one combined street line + postcode + plaats.
			const met = str(r[10]);
			const partner: RelatedParty | undefined =
				met && !isErfpacht
					? {
							rol: met,
							naam: str(r[11]),
							adres: buildAddress(r[12], "", r[13], r[14]),
							gebDatum: toIsoDate(r[15]),
						}
					: undefined;

			return {
				naamcode: str(r[4]),
				achternaam: str(r[1]),
				voornaam: str(r[2]),
				totaleOppervlakte: Number(r[3]),
				adres: buildAddress(r[5], r[6], r[7], r[8]),
				gebDatum: toIsoDate(r[9]),
				...(partner ? { partner } : {}),
				...(erfpacht ? { erfpacht } : {}),
			};
		});
}
