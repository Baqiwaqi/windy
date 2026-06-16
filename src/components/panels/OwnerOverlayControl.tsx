import { Layers, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ownerColor } from "@/lib/ownerColors";
import { useOwnerStore } from "@/stores/ownerStore";

/** Admin-only toggle + legend for the parcel-owner overlay, floated over the map. */
export function OwnerOverlayControl() {
	const { isAdmin, enabled, loading, parcels, owners, toggle } =
		useOwnerStore();

	if (!isAdmin) return null;

	const nameByCode = new Map(owners.map((o) => [o.naamcode, o.achternaam]));
	const codes = Array.from(
		new Set(parcels.filter((p) => p.geometry).map((p) => p.naamcode)),
	).sort((a, b) =>
		(nameByCode.get(a) ?? a).localeCompare(nameByCode.get(b) ?? b),
	);

	return (
		<div className="absolute right-3 top-3 z-[1000] w-56 rounded-lg border border-border bg-background/95 p-3 shadow-lg backdrop-blur">
			<Button
				onClick={toggle}
				size="sm"
				variant={enabled ? "secondary" : "default"}
				className="w-full gap-1.5"
				disabled={loading}
			>
				{loading ? (
					<Loader2 className="size-3.5 animate-spin" />
				) : (
					<Layers className="size-3.5" />
				)}
				{enabled ? "Eigenaren verbergen" : "Eigenaren tonen"}
			</Button>

			{enabled && codes.length > 0 && (
				<div className="mt-3 max-h-64 space-y-1 overflow-auto">
					{codes.map((code) => (
						<div key={code} className="flex items-center gap-2 text-xs">
							<span
								className="size-3 shrink-0 rounded-sm"
								style={{ backgroundColor: ownerColor(code) }}
							/>
							<span className="truncate">{nameByCode.get(code) ?? code}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
