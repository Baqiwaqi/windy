import { useRouter } from "@tanstack/react-router";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filterOwners } from "@/lib/ownerAdmin";
import { createOwner, deleteOwner, updateOwner } from "@/server/rpc";

export interface OwnerRow {
	id: string;
	naamcode: string;
	achternaam: string;
	voornaam: string;
}

export function OwnersPanel({ owners }: { owners: OwnerRow[] }) {
	const router = useRouter();
	const [q, setQ] = useState("");
	const [editing, setEditing] = useState<string | null>(null);
	const [draft, setDraft] = useState({ achternaam: "", voornaam: "" });
	const [adding, setAdding] = useState(false);
	const [next, setNext] = useState({
		naamcode: "",
		achternaam: "",
		voornaam: "",
	});
	const [error, setError] = useState<string | null>(null);

	const filtered = filterOwners(owners, q);
	const run = async (fn: () => Promise<unknown>, after: () => void) => {
		setError(null);
		try {
			await fn();
			after();
			router.invalidate();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Er ging iets mis");
		}
	};

	return (
		<div className="space-y-3">
			<div className="flex gap-2">
				<Input
					placeholder="Zoek op naam of naamcode…"
					value={q}
					onChange={(e) => setQ(e.target.value)}
					className="h-9"
				/>
				<Button
					variant="outline"
					className="h-9 shrink-0 gap-1.5"
					onClick={() => setAdding((a) => !a)}
				>
					<Plus className="size-4" />
					Nieuw
				</Button>
			</div>

			{error && <p className="text-xs text-destructive">{error}</p>}

			{adding && (
				<div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/30 p-3">
					<Input
						placeholder="Naamcode"
						value={next.naamcode}
						onChange={(e) =>
							setNext((n) => ({ ...n, naamcode: e.target.value }))
						}
						className="h-8 w-32"
					/>
					<Input
						placeholder="Achternaam"
						value={next.achternaam}
						onChange={(e) =>
							setNext((n) => ({ ...n, achternaam: e.target.value }))
						}
						className="h-8 flex-1"
					/>
					<Input
						placeholder="Voornaam"
						value={next.voornaam}
						onChange={(e) =>
							setNext((n) => ({ ...n, voornaam: e.target.value }))
						}
						className="h-8 flex-1"
					/>
					<Button
						className="h-8"
						onClick={() =>
							run(
								() => createOwner({ data: next }),
								() => {
									setAdding(false);
									setNext({ naamcode: "", achternaam: "", voornaam: "" });
								},
							)
						}
					>
						Toevoegen
					</Button>
				</div>
			)}

			<div className="space-y-1.5">
				{filtered.map((o) =>
					editing === o.naamcode ? (
						<div
							key={o.id}
							className="flex items-center gap-2 rounded-lg border border-primary/40 bg-accent/30 p-2"
						>
							<Input
								value={draft.achternaam}
								onChange={(e) =>
									setDraft((d) => ({ ...d, achternaam: e.target.value }))
								}
								className="h-8"
								placeholder="Achternaam"
							/>
							<Input
								value={draft.voornaam}
								onChange={(e) =>
									setDraft((d) => ({ ...d, voornaam: e.target.value }))
								}
								className="h-8"
								placeholder="Voornaam"
							/>
							<Button
								size="sm"
								className="size-8 shrink-0 p-0"
								onClick={() =>
									run(
										() =>
											updateOwner({ data: { naamcode: o.naamcode, ...draft } }),
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
							key={o.id}
							className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5"
						>
							<div className="min-w-0">
								<p className="truncate text-sm font-medium">
									{o.achternaam}
									{o.voornaam ? `, ${o.voornaam}` : ""}
								</p>
								<p className="truncate text-xs text-muted-foreground">
									{o.naamcode}
								</p>
							</div>
							<div className="flex shrink-0 gap-1">
								<Button
									size="sm"
									variant="ghost"
									className="size-8 p-0"
									onClick={() => {
										setEditing(o.naamcode);
										setDraft({
											achternaam: o.achternaam,
											voornaam: o.voornaam,
										});
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
										run(
											() => deleteOwner({ data: { naamcode: o.naamcode } }),
											() => {},
										)
									}
								>
									<Trash2 className="size-3.5" />
								</Button>
							</div>
						</div>
					),
				)}
				{filtered.length === 0 && (
					<p className="py-4 text-center text-xs text-muted-foreground">
						Geen eigenaren gevonden.
					</p>
				)}
			</div>
		</div>
	);
}
