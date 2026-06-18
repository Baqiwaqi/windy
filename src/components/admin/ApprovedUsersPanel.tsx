import { useRouter } from "@tanstack/react-router";
import { ShieldOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { type ApprovedUser, removeUserFn, revokeAdminFn } from "@/server/rpc";

export function ApprovedUsersPanel({ users }: { users: ApprovedUser[] }) {
	const router = useRouter();
	// Local copy so actions update the UI optimistically; re-synced whenever the
	// loader returns fresh data.
	const [items, setItems] = useState(users);
	useEffect(() => setItems(users), [users]);
	const [error, setError] = useState<string | null>(null);

	const run = async (sub: string, fn: () => Promise<unknown>) => {
		setError(null);
		const previous = items;
		setItems((list) => list.filter((u) => u.sub !== sub)); // optimistic
		try {
			await fn();
			router.invalidate();
		} catch (e) {
			setItems(previous); // rollback
			setError(e instanceof Error ? e.message : "Er ging iets mis");
		}
	};

	if (items.length === 0) {
		return (
			<p className="text-sm text-muted-foreground">
				Nog geen goedgekeurde gebruikers.
			</p>
		);
	}

	return (
		<div className="space-y-1.5">
			{error && <p className="text-xs text-destructive">{error}</p>}
			{items.map((u) => (
				<div
					key={u.sub}
					className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5 text-sm"
				>
					<div className="min-w-0">
						<p className="flex items-center gap-1.5 truncate font-medium">
							{u.name ?? u.email}
							{u.allowlisted && (
								<span className="rounded-full bg-muted px-1.5 text-[10px] font-semibold text-muted-foreground">
									bootstrap
								</span>
							)}
							{u.isSelf && (
								<span className="rounded-full bg-muted px-1.5 text-[10px] font-semibold text-muted-foreground">
									jij
								</span>
							)}
						</p>
						<p className="truncate text-xs text-muted-foreground">
							{u.email}
							{u.decidedAt
								? ` · goedgekeurd op ${new Date(u.decidedAt).toLocaleDateString("nl-NL")}`
								: ""}
						</p>
					</div>
					{!u.allowlisted && !u.isSelf && (
						<div className="flex shrink-0 gap-1">
							<Button
								size="sm"
								variant="ghost"
								className="h-7 gap-1.5"
								onClick={() =>
									run(u.sub, () => revokeAdminFn({ data: { sub: u.sub } }))
								}
							>
								<ShieldOff className="size-3.5" />
								Intrekken
							</Button>
							<Button
								size="sm"
								variant="ghost"
								className="size-8 p-0 text-muted-foreground hover:text-destructive"
								onClick={() =>
									run(u.sub, () => removeUserFn({ data: { sub: u.sub } }))
								}
							>
								<Trash2 className="size-3.5" />
							</Button>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
