// Distinct, readable palette for coloring parcels per owner.
const PALETTE = [
	"#e11d48",
	"#ea580c",
	"#ca8a04",
	"#16a34a",
	"#0891b2",
	"#2563eb",
	"#7c3aed",
	"#db2777",
	"#65a30d",
	"#0d9488",
	"#9333ea",
	"#dc2626",
	"#d97706",
	"#059669",
	"#4f46e5",
];

/** Deterministic color for an owner, derived from the naamcode. */
export function ownerColor(naamcode: string): string {
	let hash = 0;
	for (let i = 0; i < naamcode.length; i++) {
		hash = (hash * 31 + naamcode.charCodeAt(i)) >>> 0;
	}
	return PALETTE[hash % PALETTE.length];
}
