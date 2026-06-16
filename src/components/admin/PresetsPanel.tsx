import { useRouter } from "@tanstack/react-router";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deletePreset, renamePreset, type StoredPreset } from "@/server/rpc";

export function PresetsPanel({ presets }: { presets: StoredPreset[] }) {
	const router = useRouter();
	// Local copy so deletes can update the UI optimistically; re-synced whenever
	// the loader returns fresh data.
	const [items, setItems] = useState(presets);
	useEffect(() => setItems(presets), [presets]);

	const [editing, setEditing] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);

	const onRename = async (id: string) => {
		setError(null);
		try {
			await renamePreset({ data: { id, name } });
			setEditing(null);
			router.invalidate();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Hernoemen mislukt");
		}
	};

	const onDelete = async (id: string) => {
		setError(null);
		const previous = items;
		setItems((list) => list.filter((p) => p.id !== id)); // optimistic
		try {
			await deletePreset({ data: { id } });
			router.invalidate();
		} catch (e) {
			setItems(previous); // rollback
			setError(e instanceof Error ? e.message : "Verwijderen mislukt");
		}
	};

	if (items.length === 0) {
		return (
			<p className="text-sm text-muted-foreground">
				Nog geen presets. Publiceer een opstelling vanaf de kaart.
			</p>
		);
	}

	return (
		<div className="space-y-1.5">
			{error && <p className="text-xs text-destructive">{error}</p>}
			{items.map((preset) =>
				editing === preset.id ? (
					<div
						key={preset.id}
						className="flex items-center gap-2 rounded-lg border border-primary/40 bg-accent/30 p-2"
					>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="h-8"
							placeholder="Naam preset"
						/>
						<Button
							size="sm"
							className="size-8 shrink-0 p-0"
							onClick={() => onRename(preset.id)}
						>
							<Check className="size-4" />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							className="size-8 shrink-0 p-0"
							onClick={() => setEditing(null)}
						>
							<X className="size-4" />
						</Button>
					</div>
				) : (
					<div
						key={preset.id}
						className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5 text-sm"
					>
						<div className="min-w-0">
							<p className="truncate font-medium">{preset.name}</p>
							<p className="truncate text-xs text-muted-foreground">
								{preset.turbines.length} turbine
								{preset.turbines.length !== 1 ? "s" : ""}
								{preset.minimumDistance ? ` · ${preset.minimumDistance} m` : ""}
							</p>
						</div>
						<div className="flex shrink-0 gap-1">
							<Button
								size="sm"
								variant="ghost"
								className="size-8 p-0"
								onClick={() => {
									setEditing(preset.id);
									setName(preset.name);
									setError(null);
								}}
							>
								<Pencil className="size-3.5" />
							</Button>
							<Button
								size="sm"
								variant="ghost"
								className="size-8 p-0 text-muted-foreground hover:text-destructive"
								onClick={() => onDelete(preset.id)}
							>
								<Trash2 className="size-3.5" />
							</Button>
						</div>
					</div>
				),
			)}
		</div>
	);
}
