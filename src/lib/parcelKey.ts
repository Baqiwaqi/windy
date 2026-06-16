/** A cadastral Parcel reference carrying both the gemeente name and its code. */
export interface ParcelRef {
	gemeente?: string;
	gemeenteCode?: string;
	sectie: string;
	perceelnummer: number;
}

/** A clicked parcel as returned by the PDOK WMS GetFeatureInfo response. */
export interface ParcelClick {
	kadastraleGemeenteWaarde?: string;
	sectie?: string;
	perceelnummer?: number;
}

/**
 * Canonical join key for a cadastral Parcel: gemeente + sectie + perceelnummer,
 * normalized so casing and surrounding whitespace never affect matching.
 */
export function parcelKey(
	gemeenteToken: string,
	sectie: string,
	perceelnummer: number | string,
): string {
	const norm = (s: string) => s.trim().toUpperCase();
	return `${norm(gemeenteToken)}|${norm(sectie)}|${perceelnummer}`;
}

/**
 * The keys a stored parcel will accept — one built from its gemeente name and
 * one from its gemeente code — so a PDOK click matches whichever PDOK returns.
 */
export function acceptedKeys(parcel: ParcelRef): string[] {
	const keys: string[] = [];
	if (parcel.gemeente != null) {
		keys.push(parcelKey(parcel.gemeente, parcel.sectie, parcel.perceelnummer));
	}
	if (parcel.gemeenteCode != null) {
		keys.push(
			parcelKey(parcel.gemeenteCode, parcel.sectie, parcel.perceelnummer),
		);
	}
	return keys;
}

/**
 * Match a clicked parcel (from PDOK) to one of the stored parcels by
 * gemeente + sectie + perceelnummer. Works whether PDOK returned the gemeente
 * name or its code. Returns null when nothing matches.
 */
export function matchParcel<T extends ParcelRef>(
	click: ParcelClick,
	parcels: T[],
): T | null {
	if (
		click.kadastraleGemeenteWaarde == null ||
		click.sectie == null ||
		click.perceelnummer == null
	) {
		return null;
	}
	const target = parcelKey(
		click.kadastraleGemeenteWaarde,
		click.sectie,
		click.perceelnummer,
	);
	return parcels.find((p) => acceptedKeys(p).includes(target)) ?? null;
}
