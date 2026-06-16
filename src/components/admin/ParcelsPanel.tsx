import { useRouter } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { filterParcels } from "@/lib/ownerAdmin";
import { deleteParcel, updateParcel } from "@/server/rpc";
import type { OwnerRow } from "./OwnersPanel";

export interface ParcelRow {
	id: string;
	naamcode: string;
	gemeente: string;
	sectie: string;
	perceelnummer: number;
	oppervlakte: number;
}

export function ParcelsPanel({
	parcels,
	owners,
}: {
	parcels: ParcelRow[];
	owners: OwnerRow[];
}) {
	const router = useRouter();
	const [q, setQ] = useState("");
	const [error, setError] = useState<string | null>(null);

	const filtered = filterParcels(parcels, q);
	const sortedOwners = [...owners].sort((a, b) =>
		a.achternaam.localeCompare(b.achternaam),
	);
	const run = async (fn: () => Promise<unknown>) => {
		setError(null);
		try {
			await fn();
			router.invalidate();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Er ging iets mis");
		}
	};

	return (
		<div className="space-y-3">
			<Input
				placeholder="Zoek op gemeente, sectie, perceelnr of eigenaar…"
				value={q}
				onChange={(e) => setQ(e.target.value)}
				className="h-9"
			/>

			{error && <p className="text-xs text-destructive">{error}</p>}

			<div className="space-y-1.5">
				{filtered.map((p) => (
					<div
						key={p.id}
						className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5"
					>
						<div className="min-w-0">
							<p className="truncate text-sm font-medium">
								{p.gemeente} {p.sectie} {p.perceelnummer}
							</p>
							<p className="truncate text-xs text-muted-foreground">
								{p.oppervlakte.toLocaleString("nl-NL")} m²
							</p>
						</div>
						<div className="flex shrink-0 items-center gap-1">
							<Select
								value={p.naamcode}
								onValueChange={(naamcode) =>
									run(() => updateParcel({ data: { id: p.id, naamcode } }))
								}
							>
								<SelectTrigger className="h-8 w-44 text-xs">
									<SelectValue placeholder="Eigenaar…" />
								</SelectTrigger>
								<SelectContent>
									{sortedOwners.map((o) => (
										<SelectItem key={o.naamcode} value={o.naamcode}>
											{o.achternaam}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button
								size="sm"
								variant="ghost"
								className="size-8 p-0 text-muted-foreground hover:text-destructive"
								onClick={() => run(() => deleteParcel({ data: { id: p.id } }))}
							>
								<Trash2 className="size-3.5" />
							</Button>
						</div>
					</div>
				))}
				{filtered.length === 0 && (
					<p className="py-4 text-center text-xs text-muted-foreground">
						Geen percelen gevonden.
					</p>
				)}
			</div>
		</div>
	);
}
