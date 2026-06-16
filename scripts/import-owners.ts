/**
 * One-time import of the landowner spreadsheet into Cosmos.
 *
 * Run with:  npm run import-owners -- "/path/to/overzicht landeigenaren NB.xlsx"
 * (or set OWNERS_XLSX in .env). Requires the Cosmos variables from .env.example.
 *
 * Reads the `Perc` (parcels) and `Eigen` (owners) sheets, normalizes them via
 * src/lib/ownerImport, fetches each parcel's polygon from the PDOK kadastrale
 * kaart WFS, and upserts everything into the `parcels` and `owners` containers.
 */
import "dotenv/config";
import process from "node:process";
import ExcelJS from "exceljs";
import type { MultiPolygon, Polygon } from "geojson";
import {
	type NormalizedParcel,
	normalizeOwners,
	normalizeParcels,
} from "@/lib/ownerImport";
import { container, ensureContainers } from "@/server/cosmos";

const WFS_URL = "https://service.pdok.nl/kadaster/kadastralekaart/wfs/v5_0";

function sheetRows(wb: ExcelJS.Workbook, name: string): unknown[][] {
	const ws = wb.getWorksheet(name);
	if (!ws) throw new Error(`Sheet "${name}" not found in workbook`);
	const rows: unknown[][] = [];
	// exceljs row.values is 1-based with [0] undefined; slice to 0-based while
	// preserving column positions so the ownerImport column layout lines up.
	ws.eachRow({ includeEmpty: true }, (row) => {
		rows.push((row.values as unknown[]).slice(1));
	});
	return rows;
}

/** Drop everything up to and including the header row (found by a marker cell). */
function rowsAfterHeader(rows: unknown[][], marker: string): unknown[][] {
	const idx = rows.findIndex((r) =>
		r.some((c) => String(c ?? "").trim().toLowerCase() === marker.toLowerCase()),
	);
	return idx === -1 ? rows : rows.slice(idx + 1);
}

/**
 * Fetch a parcel's polygon from the PDOK WFS as GeoJSON (lon/lat). Best-effort:
 * returns null on any miss so the import still records owners + attributes.
 *
 * NOTE: verify on first run — the gemeente attribute name and CRS axis order
 * may need adjustment against the live WFS schema.
 */
async function fetchParcelGeometry(
	p: NormalizedParcel,
): Promise<Polygon | MultiPolygon | null> {
	if (p.locationUnknown) return null;
	const cql = `sectie='${p.sectie}' AND perceelnummer=${p.perceelnummer} AND kadastraleGemeenteWaarde='${p.gemeente}'`;
	const params = new URLSearchParams({
		service: "WFS",
		version: "2.0.0",
		request: "GetFeature",
		typeNames: "kadastralekaart:Perceel",
		outputFormat: "application/json",
		srsName: "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
		count: "1",
		CQL_FILTER: cql,
	});
	try {
		const res = await fetch(`${WFS_URL}?${params}`);
		if (!res.ok) return null;
		const data = (await res.json()) as {
			features?: { geometry?: Polygon | MultiPolygon }[];
		};
		return data.features?.[0]?.geometry ?? null;
	} catch {
		return null;
	}
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
	const xlsxPath = process.argv[2] ?? process.env.OWNERS_XLSX;
	if (!xlsxPath) {
		throw new Error(
			'Provide the xlsx path: npm run import-owners -- "/path/to/file.xlsx" (or set OWNERS_XLSX).',
		);
	}

	console.log(`Reading ${xlsxPath}...`);
	const wb = new ExcelJS.Workbook();
	await wb.xlsx.readFile(xlsxPath);

	const owners = normalizeOwners(rowsAfterHeader(sheetRows(wb, "Eigen"), "Volgnr"));
	const parcels = normalizeParcels(
		rowsAfterHeader(sheetRows(wb, "Perc"), "gemeente"),
	);
	console.log(`Parsed ${owners.length} owners and ${parcels.length} parcels.`);

	console.log("Ensuring Cosmos database + containers...");
	await ensureContainers();

	console.log("Upserting owners...");
	for (const owner of owners) {
		await container("owners").items.upsert({ id: owner.naamcode, ...owner });
	}

	console.log("Fetching parcel geometry + upserting parcels...");
	let withGeometry = 0;
	for (const parcel of parcels) {
		const geometry = await fetchParcelGeometry(parcel);
		if (geometry) withGeometry++;
		await container("parcels").items.upsert({
			id: `${parcel.key}#${parcel.naamcode}`,
			...parcel,
			geometry,
		});
		await sleep(150); // be gentle with the PDOK WFS
	}

	console.log(
		`Done. ${owners.length} owners, ${parcels.length} parcels (${withGeometry} with geometry, ${parcels.length - withGeometry} without).`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
