import { useId, useRef, useState } from "react";
import { AddressDetailSheet } from "@/components/panels/AddressDetailSheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { parseAddressCsv } from "@/lib/csv";
import { calculateDistance } from "@/lib/geo";
import { turbineEmojis } from "@/lib/turbineTypes";
import { enrichAddressesWithWoz } from "@/lib/woz";
import { useAddressStore } from "@/stores/addressStore";
import { useMapStore } from "@/stores/mapStore";
import { useTurbineStore } from "@/stores/turbineStore";
import type { AffectedAddress, WozValue } from "@/types";

export function CsvAnalysis() {
	const fileRef = useRef<HTMLInputElement>(null);
	const includeWozId = useId();
	const [analyzing, setAnalyzing] = useState(false);
	const [exporting, setExporting] = useState(false);
	const [includeWoz, setIncludeWoz] = useState(false);
	const [exportProgress, setExportProgress] = useState<{
		done: number;
		total: number;
	} | null>(null);

	const {
		uploadedAddresses,
		affectedAddresses,
		isLoading,
		setUploadedAddresses,
		setAffectedAddresses,
		setAddressSheetOpen,
	} = useAddressStore();
	const turbines = useTurbineStore((s) => s.turbines);
	const { hinderDistance, setHinderDistance } = useMapStore();

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const addresses = parseAddressCsv(event.target?.result as string);
				setUploadedAddresses(addresses);
				const ligplaatsen = addresses.filter(
					(a) => a.objecttype === "ligplaats",
				).length;
				const standplaatsen = addresses.filter(
					(a) => a.objecttype === "standplaats",
				).length;
				let summary = `${addresses.length} adressen succesvol geladen!`;
				if (ligplaatsen > 0 || standplaatsen > 0) {
					const parts = [];
					if (ligplaatsen > 0)
						parts.push(`${ligplaatsen} ligplaatsen (woonboten)`);
					if (standplaatsen > 0) parts.push(`${standplaatsen} standplaatsen`);
					summary += `\nWaarvan ${parts.join(", ")}.`;
				}
				alert(summary);
			} catch (err) {
				alert(err instanceof Error ? err.message : "Fout bij CSV parsing");
			}
		};
		reader.readAsText(file);
	};

	const handleAnalyze = () => {
		if (turbines.length === 0) {
			alert("Plaats eerst turbines voordat je een analyse uitvoert");
			return;
		}
		if (uploadedAddresses.length === 0) {
			alert(
				"Upload eerst een CSV bestand met adressen.\n\nGebruik het bestand gegenereerd door adressen_ophalen.py\nof een CSV met kolommen: adres,postcode,...,lat,lng",
			);
			return;
		}

		setAnalyzing(true);

		try {
			const allAffected: AffectedAddress[] = [];
			const seen = new Set<string>();

			for (let i = 0; i < turbines.length; i++) {
				const turbine = turbines[i];

				for (const addr of uploadedAddresses) {
					const distance = calculateDistance(turbine.latlng, {
						lat: addr.lat,
						lng: addr.lng,
					});

					if (distance <= hinderDistance && !seen.has(addr.address)) {
						seen.add(addr.address);
						allAffected.push({
							...addr,
							distance: Math.round(distance),
							turbineIndex: i,
							turbineName: `Turbine ${i + 1}`,
						});
					}
				}
			}

			setAffectedAddresses(allAffected);
		} finally {
			setAnalyzing(false);
		}
	};

	const handleExport = async () => {
		if (affectedAddresses.length === 0) {
			alert("Geen adressen om te exporteren. Voer eerst een analyse uit.");
			return;
		}

		const sorted = [...affectedAddresses].sort(
			(a, b) => a.distance - b.distance,
		);

		let wozValues = new Map<string, WozValue | null>();
		if (includeWoz) {
			setExporting(true);
			setExportProgress({ done: 0, total: sorted.length });

			try {
				wozValues = await enrichAddressesWithWoz(sorted, {
					onProgress: (done, total) => setExportProgress({ done, total }),
				});
			} catch {
				if (
					!confirm(
						"WOZ-waarden konden niet worden opgehaald. Exporteren zonder WOZ-kolom?",
					)
				) {
					setExporting(false);
					setExportProgress(null);
					return;
				}
			} finally {
				setExporting(false);
				setExportProgress(null);
			}
		}

		const wozColumns = includeWoz ? ",WOZ-waarde (EUR),WOZ-peildatum" : "";
		let csv = `Adres,Postcode,Huisnummer,Woonplaats,Afstand (m),Dichtstbijzijnde Turbine,Latitude,Longitude${wozColumns}\n`;

		for (const addr of sorted) {
			csv += `"${addr.address}","${addr.postcode}","${addr.huisnummer}","${addr.woonplaats}",${addr.distance},"${addr.turbineName}",${addr.lat},${addr.lng}`;
			if (includeWoz) {
				const woz = wozValues.get(addr.address);
				csv += `,${woz?.waarde ?? ""},"${woz?.peildatum ?? ""}"`;
			}
			csv += "\n";
		}

		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `windturbine-adressen-binnen-${hinderDistance}m.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const turbineStats = turbines.map((t, i) => ({
		index: i,
		typeIndex: t.typeIndex,
		count: affectedAddresses.filter((a) => a.turbineIndex === i).length,
	}));

	return (
		<div className="space-y-3">
			<div className="pb-3 border-b border-border space-y-1.5">
				<Label className="text-xs font-semibold block">Adressenbestand</Label>
				<input
					ref={fileRef}
					type="file"
					accept=".csv"
					onChange={handleFileUpload}
					className="sr-only"
				/>
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="h-7 w-full text-xs"
					onClick={() => fileRef.current?.click()}
				>
					{uploadedAddresses.length > 0 ? "CSV vervangen" : "CSV uploaden"}
				</Button>
				{isLoading && <p className="text-xs text-primary">Adressen laden...</p>}
				{!isLoading && uploadedAddresses.length > 0 && (
					<p className="text-xs text-primary">
						{uploadedAddresses.length} adressen geladen
					</p>
				)}
				{!isLoading && uploadedAddresses.length === 0 && (
					<p className="text-xs text-muted-foreground break-words">
						CSV van adressen_ophalen.py of met kolommen adres, postcode, lat,
						lng
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label className="text-xs text-muted-foreground">
					Afstand voor analyse:
				</Label>
				<Slider
					min={250}
					max={2000}
					step={50}
					value={[hinderDistance]}
					onValueChange={([v]) => setHinderDistance(v)}
				/>
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>250m</span>
					<span className="font-semibold text-foreground">
						{hinderDistance}m
					</span>
					<span>2000m</span>
				</div>
			</div>

			<Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
				{analyzing ? "Bezig met analyseren..." : "Analyseer woningen"}
			</Button>

			{affectedAddresses.length > 0 && (
				<div className="text-sm border-t border-border pt-2 space-y-2">
					<p className="font-semibold">Resultaten:</p>
					<p>
						<strong>Totaal: {affectedAddresses.length} woningen</strong> binnen{" "}
						{hinderDistance}m
					</p>

					{turbineStats.length > 0 && (
						<div className="text-xs space-y-1">
							{turbineStats.map((stat) => (
								<p key={stat.index}>
									{turbineEmojis[stat.typeIndex]} Turbine {stat.index + 1}:{" "}
									{stat.count} woningen
								</p>
							))}
						</div>
					)}

					<Button
						onClick={() => setAddressSheetOpen(true)}
						variant="outline"
						size="sm"
						className="w-full"
					>
						Bekijk alle adressen
					</Button>

					<div className="flex items-center gap-2">
						<Checkbox
							id={includeWozId}
							checked={includeWoz}
							disabled={exporting}
							onCheckedChange={(v) => setIncludeWoz(v === true)}
						/>
						<Label htmlFor={includeWozId} className="cursor-pointer text-xs">
							Inclusief WOZ-waarden (langzamer)
						</Label>
					</div>

					<Button
						onClick={handleExport}
						disabled={exporting}
						variant="secondary"
						size="sm"
						className="w-full"
					>
						{exporting && exportProgress
							? `WOZ-waarden ophalen... ${exportProgress.done}/${exportProgress.total}`
							: "Export adressenlijst"}
					</Button>
					{exporting && (
						<p className="text-xs text-muted-foreground">
							Dit kan enkele minuten duren bij veel adressen.
						</p>
					)}
				</div>
			)}
			<AddressDetailSheet />
		</div>
	);
}
