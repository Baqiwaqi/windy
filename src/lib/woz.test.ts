import { afterEach, describe, expect, it, vi } from "vitest";
import {
	enrichAddressesWithWoz,
	fetchWozValue,
	latestWozValue,
} from "@/lib/woz";
import type { AffectedAddress } from "@/types";

function makeAddress(
	overrides: Partial<AffectedAddress> = {},
): AffectedAddress {
	return {
		address: "Teststraat 1, 1234AB Teststad",
		postcode: "1234AB",
		huisnummer: "1",
		woonplaats: "Teststad",
		objecttype: "verblijfsobject",
		lat: 52.0,
		lng: 5.0,
		distance: 500,
		turbineIndex: 0,
		turbineName: "Turbine 1",
		...overrides,
	};
}

function jsonResponse(
	body: unknown,
	status = 200,
	headers: Record<string, string> = {},
) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json", ...headers },
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("latestWozValue", () => {
	it("picks the value with the most recent peildatum regardless of order", () => {
		const result = latestWozValue([
			{ peildatum: "2023-01-01", vastgesteldeWaarde: 400000 },
			{ peildatum: "2025-01-01", vastgesteldeWaarde: 525000 },
			{ peildatum: "2024-01-01", vastgesteldeWaarde: 480000 },
		]);
		expect(result).toEqual({ waarde: 525000, peildatum: "2025-01-01" });
	});

	it("returns null for an empty array", () => {
		expect(latestWozValue([])).toBeNull();
	});
});

describe("fetchWozValue", () => {
	it("pads the nummeraanduiding id to 16 characters and returns the latest value", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse({
				wozWaarden: [
					{ peildatum: "2024-01-01", vastgesteldeWaarde: 480000 },
					{ peildatum: "2025-01-01", vastgesteldeWaarde: 525000 },
				],
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const result = await fetchWozValue("123456789012");

		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.kadaster.nl/lvwoz/wozwaardeloket-api/v1/wozwaarde/nummeraanduiding/0000123456789012",
		);
		expect(result).toEqual({ waarde: 525000, peildatum: "2025-01-01" });
	});

	it("returns null on 404 (no WOZ value exists)", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(jsonResponse({ message: "not found" }, 404)),
		);
		expect(await fetchWozValue("1234567890123456")).toBeNull();
	});

	it("retries after 429 and then succeeds", async () => {
		vi.useFakeTimers();
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				jsonResponse({}, 429, { "X-Rate-Limit-Reset": "1" }),
			)
			.mockResolvedValueOnce(
				jsonResponse({
					wozWaarden: [{ peildatum: "2025-01-01", vastgesteldeWaarde: 300000 }],
				}),
			);
		vi.stubGlobal("fetch", fetchMock);

		const promise = fetchWozValue("1234567890123456");
		await vi.advanceTimersByTimeAsync(1000);
		const result = await promise;

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(result).toEqual({ waarde: 300000, peildatum: "2025-01-01" });
		vi.useRealTimers();
	});

	it("returns null when fetch throws", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
		expect(await fetchWozValue("1234567890123456")).toBeNull();
	});
});

describe("enrichAddressesWithWoz", () => {
	it("skips the PDOK lookup when nummeraanduidingId is present", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse({
				wozWaarden: [{ peildatum: "2025-01-01", vastgesteldeWaarde: 525000 }],
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const addr = makeAddress({ nummeraanduidingId: "1234567890123456" });
		const results = await enrichAddressesWithWoz([addr]);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(String(fetchMock.mock.calls[0][0])).toContain("api.kadaster.nl");
		expect(results.get(addr.address)).toEqual({
			waarde: 525000,
			peildatum: "2025-01-01",
		});
	});

	it("falls back to PDOK lookup when nummeraanduidingId is missing", async () => {
		const fetchMock = vi.fn().mockImplementation((url: string) => {
			if (String(url).includes("api.pdok.nl")) {
				return Promise.resolve(
					jsonResponse({
						response: {
							docs: [
								{
									postcode: "1234AB",
									huis_nlt: "1",
									nummeraanduiding_id: "1234567890123456",
								},
							],
						},
					}),
				);
			}
			return Promise.resolve(
				jsonResponse({
					wozWaarden: [{ peildatum: "2025-01-01", vastgesteldeWaarde: 410000 }],
				}),
			);
		});
		vi.stubGlobal("fetch", fetchMock);

		const addr = makeAddress();
		const results = await enrichAddressesWithWoz([addr]);

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(results.get(addr.address)).toEqual({
			waarde: 410000,
			peildatum: "2025-01-01",
		});
	});

	it("maps failures to null without rejecting and reports progress", async () => {
		const fetchMock = vi.fn().mockImplementation((url: string) => {
			if (String(url).includes("0000000000000001")) {
				return Promise.reject(new Error("network"));
			}
			return Promise.resolve(
				jsonResponse({
					wozWaarden: [{ peildatum: "2025-01-01", vastgesteldeWaarde: 200000 }],
				}),
			);
		});
		vi.stubGlobal("fetch", fetchMock);

		const failing = makeAddress({
			address: "Faalstraat 1",
			nummeraanduidingId: "1",
		});
		const ok = makeAddress({
			address: "Goedstraat 2",
			nummeraanduidingId: "2",
		});
		const progress: [number, number][] = [];

		const results = await enrichAddressesWithWoz([failing, ok], {
			onProgress: (done, total) => progress.push([done, total]),
		});

		expect(results.get("Faalstraat 1")).toBeNull();
		expect(results.get("Goedstraat 2")).toEqual({
			waarde: 200000,
			peildatum: "2025-01-01",
		});
		expect(progress).toEqual([
			[1, 2],
			[2, 2],
		]);
	});

	it("respects the concurrency bound", async () => {
		let inFlight = 0;
		let maxInFlight = 0;
		const fetchMock = vi.fn().mockImplementation(async () => {
			inFlight++;
			maxInFlight = Math.max(maxInFlight, inFlight);
			await new Promise((r) => setTimeout(r, 5));
			inFlight--;
			return jsonResponse({
				wozWaarden: [{ peildatum: "2025-01-01", vastgesteldeWaarde: 100000 }],
			});
		});
		vi.stubGlobal("fetch", fetchMock);

		const addresses = Array.from({ length: 10 }, (_, i) =>
			makeAddress({
				address: `Straat ${i}`,
				nummeraanduidingId: String(i + 1),
			}),
		);

		await enrichAddressesWithWoz(addresses, { concurrency: 3 });

		expect(fetchMock).toHaveBeenCalledTimes(10);
		expect(maxInFlight).toBeLessThanOrEqual(3);
	});
});
