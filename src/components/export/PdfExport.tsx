import { FileDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ownersWithinRadius, turbineParcel } from "@/lib/betrokken";
import { listOwnerParcels } from "@/server/rpc";
import { useAddressStore } from "@/stores/addressStore";
import { useMapStore } from "@/stores/mapStore";
import type { OwnerDoc, OwnerParcel } from "@/stores/ownerStore";
import { useOwnerStore } from "@/stores/ownerStore";
import { useTurbineStore } from "@/stores/turbineStore";

export function PdfExport() {
	const [exporting, setExporting] = useState(false);
	const turbines = useTurbineStore((s) => s.turbines);
	const affectedAddresses = useAddressStore((s) => s.affectedAddresses);
	const hinderDistance = useMapStore((s) => s.hinderDistance);
	const isAdmin = useOwnerStore((s) => s.isAdmin);

	const handleExport = async () => {
		setExporting(true);

		try {
			const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
				import("html2canvas-pro"),
				import("jspdf"),
			]);

			const mapElement = document.querySelector(
				".leaflet-container",
			) as HTMLElement;
			if (!mapElement) {
				alert("Kaart niet gevonden");
				return;
			}

			const canvas = await html2canvas(mapElement, {
				useCORS: true,
				allowTaint: true,
				logging: false,
				scale: 2,
			});

			const imgData = canvas.toDataURL("image/jpeg", 0.95);

			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "mm",
				format: "a4",
			});

			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = pdfWidth - 20;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			let position = 10;

			pdf.setFontSize(16);
			pdf.text(
				"Windturbine Visualisatie - Hoeker en GarstenPolder",
				pdfWidth / 2,
				position,
				{ align: "center" },
			);
			position += 10;

			pdf.setFontSize(10);
			const dateStr = new Date().toLocaleDateString("nl-NL", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
			pdf.text(`Datum: ${dateStr}`, pdfWidth / 2, position, {
				align: "center",
			});
			position += 10;

			if (imgHeight > pdfHeight - position - 10) {
				const scale = (pdfHeight - position - 10) / imgHeight;
				pdf.addImage(
					imgData,
					"JPEG",
					10,
					position,
					imgWidth * scale,
					imgHeight * scale,
				);
			} else {
				pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
			}

			position += Math.min(imgHeight, pdfHeight - position - 10) + 10;

			if (turbines.length > 0) {
				pdf.addPage();
				position = 20;

				pdf.setFontSize(14);
				pdf.text("Turbine Details", 10, position);
				position += 10;

				pdf.setFontSize(10);
				const colorNames = ["Klein", "Middelgroot", "Groot"];
				for (let idx = 0; idx < turbines.length; idx++) {
					const turbine = turbines[idx];
					pdf.text(
						`Turbine ${idx + 1}: ${colorNames[turbine.typeIndex]} (${turbine.type.name})`,
						10,
						position,
					);
					position += 5;
					pdf.text(
						`  Locatie: ${turbine.latlng.lat.toFixed(6)}, ${turbine.latlng.lng.toFixed(6)}`,
						10,
						position,
					);
					position += 5;
					pdf.text(
						`  Ashoogte: ${turbine.type.hubHeight}m, Tiphoogte: ${turbine.type.hubHeight + turbine.type.rotorDiameter / 2}m`,
						10,
						position,
					);
					position += 8;

					if (position > pdfHeight - 20) {
						pdf.addPage();
						position = 20;
					}
				}

				if (affectedAddresses.length > 0) {
					position += 5;
					pdf.setFontSize(14);
					pdf.text(`Woningen binnen ${hinderDistance}m`, 10, position);
					position += 10;
					pdf.setFontSize(10);
					pdf.text(
						`Totaal aantal woningen: ${affectedAddresses.length}`,
						10,
						position,
					);
				}
			}

			// Owner sections (admin only). Owner data is fetched on demand and
			// never reaches non-admins.
			if (isAdmin && turbines.length > 0) {
				let ownerData: { parcels: OwnerParcel[]; owners: OwnerDoc[] } | null =
					null;
				try {
					const res = await listOwnerParcels();
					ownerData = {
						parcels: res.parcels as OwnerParcel[],
						owners: res.owners as OwnerDoc[],
					};
				} catch {
					ownerData = null;
				}

				const geoParcels = (ownerData?.parcels ?? []).filter(
					(
						p,
					): p is OwnerParcel & {
						geometry: NonNullable<OwnerParcel["geometry"]>;
					} => p.geometry != null,
				);

				if (ownerData && geoParcels.length > 0) {
					const owners = ownerData.owners;
					const ownerName = (code: string) => {
						const o = owners.find((x) => x.naamcode === code);
						return o
							? `${o.voornaam} ${o.achternaam}`.trim() || o.achternaam
							: code;
					};

					pdf.addPage();
					position = 20;
					pdf.setFontSize(14);
					pdf.text("Eigenaren per turbine", 10, position);
					position += 8;
					pdf.setFontSize(10);
					for (let idx = 0; idx < turbines.length; idx++) {
						const parcel = turbineParcel(turbines[idx].latlng, geoParcels);
						const label = parcel
							? `${parcel.gemeente} ${parcel.sectie} ${parcel.perceelnummer} — ${ownerName(parcel.naamcode)}`
							: "geen perceel onder turbine";
						pdf.text(`Turbine ${idx + 1}: ${label}`, 10, position);
						position += 6;
						if (position > pdfHeight - 20) {
							pdf.addPage();
							position = 20;
						}
					}

					// Betrokken grondeigenaren: owners within each turbine's rotor radius.
					const betrokken = new Set<string>();
					for (const t of turbines) {
						const radius = t.type.rotorDiameter / 2;
						for (const code of ownersWithinRadius(
							[t.latlng],
							radius,
							geoParcels,
						)) {
							betrokken.add(code);
						}
					}
					const sorted = [...betrokken].sort((a, b) =>
						ownerName(a).localeCompare(ownerName(b)),
					);

					position += 6;
					pdf.setFontSize(14);
					pdf.text("Betrokken grondeigenaren", 10, position);
					position += 8;
					pdf.setFontSize(10);
					if (sorted.length === 0) {
						pdf.text("Geen percelen binnen de overdraaistraal.", 10, position);
					}
					for (const code of sorted) {
						const count = geoParcels.filter((p) => p.naamcode === code).length;
						pdf.text(
							`- ${ownerName(code)} (${count} perceel${count !== 1 ? "en" : ""})`,
							10,
							position,
						);
						position += 6;
						if (position > pdfHeight - 20) {
							pdf.addPage();
							position = 20;
						}
					}
				}
			}

			const filename = `windturbine-visualisatie-${new Date().toISOString().split("T")[0]}.pdf`;
			pdf.save(filename);
		} catch (err) {
			console.error("PDF export fout:", err);
			alert(
				`Fout bij PDF export: ${err instanceof Error ? err.message : String(err)}`,
			);
		} finally {
			setExporting(false);
		}
	};

	return (
		<Button
			onClick={handleExport}
			disabled={exporting}
			variant="outline"
			className="w-full"
		>
			<FileDown className="size-4 mr-2" />
			{exporting ? "PDF maken..." : "Export PDF"}
		</Button>
	);
}
