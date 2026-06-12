import { describe, expect, it } from "vitest";
import { parseAddressCsv } from "@/lib/csv";

describe("parseAddressCsv", () => {
	it("parses a CSV without nummeraanduiding_id column", () => {
		const csv = [
			"adres,postcode,huisnummer,woonplaats,objecttype,lat,lng",
			'"Teststraat 1, Teststad","1234AB","1","Teststad","verblijfsobject",52.1,5.1',
		].join("\n");

		const addresses = parseAddressCsv(csv);

		expect(addresses).toHaveLength(1);
		expect(addresses[0].address).toBe("Teststraat 1, Teststad");
		expect(addresses[0].nummeraanduidingId).toBeUndefined();
	});

	it("parses a CSV with nummeraanduiding_id column", () => {
		const csv = [
			"adres,postcode,huisnummer,woonplaats,objecttype,lat,lng,nummeraanduiding_id",
			'"Teststraat 1, Teststad","1234AB","1","Teststad","verblijfsobject",52.1,5.1,"1234567890123456"',
		].join("\n");

		const addresses = parseAddressCsv(csv);

		expect(addresses).toHaveLength(1);
		expect(addresses[0].nummeraanduidingId).toBe("1234567890123456");
	});

	it("leaves nummeraanduidingId undefined for rows with an empty value", () => {
		const csv = [
			"adres,postcode,huisnummer,woonplaats,objecttype,lat,lng,nummeraanduiding_id",
			'"Teststraat 1, Teststad","1234AB","1","Teststad","verblijfsobject",52.1,5.1,""',
		].join("\n");

		const addresses = parseAddressCsv(csv);

		expect(addresses).toHaveLength(1);
		expect(addresses[0].nummeraanduidingId).toBeUndefined();
	});
});
