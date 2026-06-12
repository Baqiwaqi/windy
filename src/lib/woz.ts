import { lookupNummeraanduidingId } from "@/lib/pdok";
import type { AffectedAddress, WozValue } from "@/types";

const WOZ_API_BASE = "https://api.kadaster.nl/lvwoz/wozwaardeloket-api/v1";
const MAX_RETRIES = 2;
const DEFAULT_RETRY_SECONDS = 5;

interface WozWaarde {
	peildatum: string;
	vastgesteldeWaarde: number;
}

interface WozResponse {
	wozWaarden?: WozWaarde[];
}

/**
 * Pick the WOZ value with the most recent peildatum.
 */
export function latestWozValue(wozWaarden: WozWaarde[]): WozValue | null {
	let latest: WozWaarde | null = null;
	for (const w of wozWaarden) {
		if (!latest || w.peildatum > latest.peildatum) {
			latest = w;
		}
	}
	if (!latest) return null;
	return { waarde: latest.vastgesteldeWaarde, peildatum: latest.peildatum };
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch the most recent WOZ value for a BAG nummeraanduiding.
 * Returns null when no WOZ value exists (404, e.g. ligplaatsen) or
 * on any other failure - the export must never abort on one address.
 */
export async function fetchWozValue(
	nummeraanduidingId: string,
): Promise<WozValue | null> {
	const paddedId = nummeraanduidingId.padStart(16, "0");
	const url = `${WOZ_API_BASE}/wozwaarde/nummeraanduiding/${paddedId}`;

	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		try {
			const response = await fetch(url);

			if (response.status === 429) {
				const reset = parseFloat(
					response.headers.get("X-Rate-Limit-Reset") ?? "",
				);
				const waitSeconds =
					Number.isNaN(reset) || reset <= 0 ? DEFAULT_RETRY_SECONDS : reset;
				await sleep(waitSeconds * 1000);
				continue;
			}

			if (!response.ok) return null;

			const data: WozResponse = await response.json();
			return latestWozValue(data.wozWaarden ?? []);
		} catch {
			return null;
		}
	}

	return null;
}

export interface EnrichOptions {
	concurrency?: number;
	onProgress?: (done: number, total: number) => void;
}

/**
 * Look up WOZ values for affected addresses with bounded concurrency.
 * Result is keyed by the address string (the same key used to dedupe
 * affected addresses). Addresses that cannot be resolved map to null.
 */
export async function enrichAddressesWithWoz(
	addresses: AffectedAddress[],
	options: EnrichOptions = {},
): Promise<Map<string, WozValue | null>> {
	const { concurrency = 4, onProgress } = options;
	const results = new Map<string, WozValue | null>();
	const total = addresses.length;
	let next = 0;
	let done = 0;

	const worker = async () => {
		while (next < total) {
			const addr = addresses[next++];

			const nummeraanduidingId =
				addr.nummeraanduidingId ??
				(await lookupNummeraanduidingId(addr.postcode, addr.huisnummer));

			const value = nummeraanduidingId
				? await fetchWozValue(nummeraanduidingId)
				: null;

			results.set(addr.address, value);
			done++;
			onProgress?.(done, total);
		}
	};

	await Promise.all(
		Array.from({ length: Math.min(concurrency, total) }, worker),
	);

	return results;
}
