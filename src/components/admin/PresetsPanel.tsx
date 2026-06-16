import { useRouter } from "@tanstack/react-router";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deletePreset, renamePreset, type StoredPreset } from "@/server/rpc";

export function PresetsPanel({ presets }: { presets: StoredPreset[] }) {
	const router = useRouter();
	const [editing, setEditing] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);

	const run = async (
		fn: () => Promise<unknown>,
		after: () => void = () => {},
	) => {
		setError(null);
		try {
			await fn();
			after();
			router.invalidate();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Er ging iets mis");
		}
	};

	if (presets.length === 0) {
		return (
			<p className="text-sm text-muted-foreground">
				Nog geen presets. Publiceer een opstelling vanaf de kaart.
			</p>
		);
	}

	return (
		<div className="space-y-1.5">
			{error && <p className="text-xs text-destructive">{error}</p>}
			{presets.map((preset) =>
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
							onClick={() =>
								run(
									() => renamePreset({ data: { id: preset.id, name } }),
									() => setEditing(null),
								)
							}
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
								onClick={() =>
									run(() => deletePreset({ data: { id: preset.id } }))
								}
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
