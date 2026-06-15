import { describe, expect, it } from "vitest";
import { normalizeOwners, normalizeParcels } from "@/lib/ownerImport";

describe("normalizeParcels", () => {
	it("maps a parcel row to a normalized parcel with a canonical key", () => {
		const rows = [["Loenen", "LNN00", "F", 22, 7840, "Bijl"]];
		const [parcel] = normalizeParcels(rows);
		expect(parcel).toMatchObject({
			key: "LOENEN|F|22",
			gemeente: "Loenen",
			gemeenteCode: "LNN00",
			sectie: "F",
			perceelnummer: 22,
			oppervlakte: 7840,
			naamcode: "Bijl",
		});
	});

	it("trims trailing whitespace from the naamcode", () => {
		const rows = [["vreeland", "VLD02", "B", 76, 9060, "Willig "]];
		const [parcel] = normalizeParcels(rows);
		expect(parcel.naamcode).toBe("Willig");
	});

	it("backfills a missing gemeenteCode from another row of the same gemeente", () => {
		const rows = [
			["Loenen", null, "F", 19, 9320, "Griffioen"],
			["Loenen", "LNN00", "F", 22, 7840, "Bijl"],
		];
		const parcels = normalizeParcels(rows);
		expect(parcels[0].gemeenteCode).toBe("LNN00");
		expect(parcels[1].gemeenteCode).toBe("LNN00");
	});

	it("skips total/blank rows that carry no parcel", () => {
		const rows = [
			["Loenen", null, "F", 19, 9320, "Griffioen"],
			[null, null, null, null, 3569560],
		];
		expect(normalizeParcels(rows)).toHaveLength(1);
	});

	it("flags ? placeholder rows as locationUnknown without crashing", () => {
		const rows = [["?", "?", "?", "?", 193340, "KarensJac"]];
		const [parcel] = normalizeParcels(rows);
		expect(parcel.locationUnknown).toBe(true);
		expect(parcel.naamcode).toBe("KarensJac");
		expect(parcel.oppervlakte).toBe(193340);
	});

	it("keeps a parcel listed under two owners as two co-ownership records", () => {
		const rows = [
			["vreeland", "VLD02", "B", 1816, 185900, "Bijl"],
			["Vreeland", null, "B", 1816, 185900, "GraafV"],
		];
		const parcels = normalizeParcels(rows);
		expect(parcels).toHaveLength(2);
		expect(parcels.map((p) => p.naamcode).sort()).toEqual(["Bijl", "GraafV"]);
		expect(parcels[0].key).toBe(parcels[1].key);
	});
});

describe("normalizeOwners", () => {
	it("maps a simple owner row to a normalized owner", () => {
		const rows = [
			[
				null,
				"Coers",
				"Pieter Coers",
				289514,
				"Coers",
				"Oostkanaaldijk",
				"10a",
				"3632GA",
				"Loenen aan de vecht",
				new Date("1967-12-09"),
			],
		];
		const [owner] = normalizeOwners(rows);
		expect(owner).toMatchObject({
			naamcode: "Coers",
			achternaam: "Coers",
			voornaam: "Pieter Coers",
			totaleOppervlakte: 289514,
			adres: {
				straat: "Oostkanaaldijk",
				huisnr: "10a",
				plaats: "Loenen aan de vecht",
			},
			gebDatum: "1967-12-09",
		});
	});

	it("normalizes postcodes to '1234 AB' form", () => {
		const rows = [
			[
				null,
				"Coers",
				"Pieter",
				1,
				"Coers",
				"Straat",
				"1",
				"3632GA",
				"Plaats",
				null,
			],
		];
		const [owner] = normalizeOwners(rows);
		expect(owner.adres?.postcode).toBe("3632 GA");
	});

	it("allows owners with no address (public bodies)", () => {
		const rows = [
			[
				null,
				"Waterschap Amstel, Gooi en Vecht",
				"Waterschap Amstel, Gooi en Vecht",
				22591,
				"Waterschap",
			],
		];
		const [owner] = normalizeOwners(rows);
		expect(owner.naamcode).toBe("Waterschap");
		expect(owner.adres).toBeUndefined();
	});

	it("parses a partner (Met) into the partner field", () => {
		const rows = [
			[
				null,
				"Bijl",
				"Simone Gabrielle Christine",
				372958,
				"Bijl",
				"Nigtevechtseweg",
				33,
				"3633XR",
				"Vreeland",
				new Date("1974-04-06"),
				"man",
				"Vincent Jozef de Graaf",
				"Nigtevechtseweg 33",
				"3633 XR",
				"Vreeland",
				new Date("1979-02-07"),
			],
		];
		const [owner] = normalizeOwners(rows);
		expect(owner.partner).toMatchObject({
			rol: "man",
			naam: "Vincent Jozef de Graaf",
			gebDatum: "1979-02-07",
			adres: {
				straat: "Nigtevechtseweg 33",
				postcode: "3633 XR",
				plaats: "Vreeland",
			},
		});
	});

	it("parses the column-shifted erfpacht row into the erfpacht field", () => {
		const rows = [
			[
				null,
				"ASR Dutch Farmland Custodian BV",
				"ASR Dutch Farmland Custodian BV",
				14000,
				"ASR",
				"Archimedeslaan",
				10,
				"3584BA",
				"Utrecht",
				null,
				null,
				"Erfpacht",
				"Cornelis Willem Veldhuisen",
				"Vreelandseweg 44",
				"1393PG",
				"Nigtevecht",
				new Date("1957-04-20"),
			],
		];
		const [owner] = normalizeOwners(rows);
		expect(owner.partner).toBeUndefined();
		expect(owner.erfpacht).toMatchObject({
			rol: "Erfpacht",
			naam: "Cornelis Willem Veldhuisen",
			gebDatum: "1957-04-20",
			adres: {
				straat: "Vreelandseweg 44",
				postcode: "1393 PG",
				plaats: "Nigtevecht",
			},
		});
		// The owner's own address must not be disturbed by the shifted block.
		expect(owner.adres).toMatchObject({
			straat: "Archimedeslaan",
			postcode: "3584 BA",
			plaats: "Utrecht",
		});
	});
});
