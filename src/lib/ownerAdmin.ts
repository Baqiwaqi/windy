export interface OwnerLike {
	naamcode: string;
	achternaam: string;
	voornaam: string;
}

/** Owners whose surname, first name, or naamcode matches the query (case-insensitive). */
export function filterOwners<T extends OwnerLike>(
	owners: T[],
	query: string,
): T[] {
	const q = query.trim().toLowerCase();
	if (!q) return owners;
	return owners.filter((o) =>
		`${o.achternaam} ${o.voornaam} ${o.naamcode}`.toLowerCase().includes(q),
	);
}

export type ValidationResult<T> =
	| { ok: true; value: T }
	| { ok: false; error: string };

/** Validate + trim an Owner edit. Surname is required. */
export function validateOwnerPatch(patch: {
	achternaam?: string;
	voornaam?: string;
}): ValidationResult<{ achternaam: string; voornaam: string }> {
	const achternaam = (patch.achternaam ?? "").trim();
	if (!achternaam) return { ok: false, error: "Achternaam is verplicht" };
	return {
		ok: true,
		value: { achternaam, voornaam: (patch.voornaam ?? "").trim() },
	};
}

export interface ParcelLike {
	naamcode: string;
	gemeente: string;
	sectie: string;
	perceelnummer: number;
}

/** A parcel may only be reassigned to a naamcode that exists in the owner set. */
export function validateReassign(
	naamcode: string,
	knownNaamcodes: string[],
): boolean {
	return knownNaamcodes.includes(naamcode);
}

/** Parcels whose aanduiding (gemeente/sectie/perceelnummer) or naamcode matches. */
export function filterParcels<T extends ParcelLike>(
	parcels: T[],
	query: string,
): T[] {
	const q = query.trim().toLowerCase();
	if (!q) return parcels;
	return parcels.filter((p) =>
		`${p.gemeente} ${p.sectie} ${p.perceelnummer} ${p.naamcode}`
			.toLowerCase()
			.includes(q),
	);
}
