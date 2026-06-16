import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { type OwnerRow, OwnersPanel } from "@/components/admin/OwnersPanel";
import { type ParcelRow, ParcelsPanel } from "@/components/admin/ParcelsPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	approveRequestFn,
	deletePreset,
	denyRequestFn,
	getOwnerDataStats,
	getSession,
	listOwnerParcels,
	listPendingRequests,
	listPresets,
	logoutFn,
	requestAdminFn,
} from "@/server/rpc";

export const Route = createFileRoute("/admin")({
	component: Admin,
	loader: async () => {
		const session = await getSession();
		if (session.role !== "admin") {
			return {
				session,
				pending: [],
				presets: [],
				stats: null,
				ownerData: { parcels: [], owners: [] },
			};
		}
		const [pending, presets, stats, ownerData] = await Promise.all([
			listPendingRequests(),
			listPresets(),
			getOwnerDataStats(),
			listOwnerParcels(),
		]);
		return { session, pending, presets, stats, ownerData };
	},
});

type Tab = "requests" | "owners" | "parcels" | "presets";

function Admin() {
	const router = useRouter();
	const { session, pending, presets, stats, ownerData } = Route.useLoaderData();
	const [tab, setTab] = useState<Tab>("requests");

	const owners = ownerData.owners as OwnerRow[];
	const parcels = ownerData.parcels as ParcelRow[];

	const invalidate = () => router.invalidate();
	const onLogout = async () => {
		await logoutFn();
		invalidate();
	};
	const onRequestAdmin = async () => {
		await requestAdminFn();
		invalidate();
	};

	const tabs: { id: Tab; label: string; badge?: number }[] = [
		{ id: "requests", label: "Aanvragen", badge: pending.length || undefined },
		{ id: "owners", label: "Eigenaren" },
		{ id: "parcels", label: "Percelen" },
		{ id: "presets", label: "Presets" },
	];

	return (
		<div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
			<div className="flex items-start justify-between gap-4">
				<div>
					<Link
						to="/"
						className="mb-1 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowLeft className="size-3.5" />
						Naar de kaart
					</Link>
					<h1 className="text-2xl font-semibold">Admin</h1>
					<p className="text-sm text-muted-foreground">
						Windpark-analyse — beheerdersomgeving
					</p>
				</div>
				{session.user && (
					<div className="text-right text-sm">
						<p className="font-medium">
							{session.user.name ?? session.user.email}
						</p>
						<button
							type="button"
							onClick={onLogout}
							className="text-xs text-muted-foreground underline-offset-2 hover:underline"
						>
							Uitloggen
						</button>
					</div>
				)}
			</div>

			{!session.user ? (
				<div className="space-y-3">
					<p className="text-sm text-muted-foreground">
						Log in om beheerfuncties te gebruiken.
					</p>
					<Button asChild className="w-fit">
						<a href="/api/auth/google">Inloggen met Google</a>
					</Button>
				</div>
			) : session.role !== "admin" ? (
				session.request?.status === "pending" ? (
					<p className="text-sm text-muted-foreground">
						Je aanvraag voor beheerderstoegang is in behandeling.
					</p>
				) : (
					<div className="space-y-2">
						{session.request?.status === "denied" && (
							<p className="text-sm text-muted-foreground">
								Je vorige aanvraag is afgewezen.
							</p>
						)}
						<Button onClick={onRequestAdmin} className="w-fit">
							Beheerderstoegang aanvragen
						</Button>
					</div>
				)
			) : (
				<>
					{stats && (
						<div className="grid grid-cols-3 gap-2">
							{[
								{ label: "Percelen", value: stats.parcels },
								{ label: "Met geometrie", value: stats.parcelsWithGeometry },
								{ label: "Eigenaren", value: stats.owners },
							].map((s) => (
								<div
									key={s.label}
									className="rounded-xl border border-border bg-card p-3 text-center"
								>
									<p className="text-xl font-semibold tabular-nums">
										{s.value}
									</p>
									<p className="text-[11px] text-muted-foreground">{s.label}</p>
								</div>
							))}
						</div>
					)}

					<div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1">
						{tabs.map((t) => (
							<button
								type="button"
								key={t.id}
								onClick={() => setTab(t.id)}
								className={cn(
									"flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
									tab === t.id
										? "bg-background text-foreground shadow-sm"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								{t.label}
								{t.badge ? (
									<span className="rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
										{t.badge}
									</span>
								) : null}
							</button>
						))}
					</div>

					{tab === "requests" && (
						<div className="space-y-2">
							{pending.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									Geen openstaande aanvragen.
								</p>
							) : (
								pending.map((p) => (
									<div
										key={p.sub}
										className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5 text-sm"
									>
										<div className="min-w-0">
											<p className="truncate font-medium">
												{p.name ?? p.email}
											</p>
											<p className="truncate text-xs text-muted-foreground">
												{p.email}
											</p>
										</div>
										<div className="flex shrink-0 gap-1">
											<Button
												size="sm"
												className="h-7"
												onClick={async () => {
													await approveRequestFn({ data: { sub: p.sub } });
													invalidate();
												}}
											>
												Goedkeuren
											</Button>
											<Button
												size="sm"
												variant="ghost"
												className="h-7"
												onClick={async () => {
													await denyRequestFn({ data: { sub: p.sub } });
													invalidate();
												}}
											>
												Afwijzen
											</Button>
										</div>
									</div>
								))
							)}
						</div>
					)}

					{tab === "owners" && <OwnersPanel owners={owners} />}
					{tab === "parcels" && (
						<ParcelsPanel parcels={parcels} owners={owners} />
					)}

					{tab === "presets" && (
						<div className="space-y-2">
							{presets.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									Nog geen presets. Publiceer een opstelling vanaf de kaart.
								</p>
							) : (
								presets.map((preset) => (
									<div
										key={preset.id}
										className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5 text-sm"
									>
										<div className="min-w-0">
											<p className="truncate font-medium">{preset.name}</p>
											<p className="truncate text-xs text-muted-foreground">
												{preset.turbines.length} turbine
												{preset.turbines.length !== 1 ? "s" : ""}
												{preset.minimumDistance
													? ` · ${preset.minimumDistance} m`
													: ""}
											</p>
										</div>
										<Button
											size="sm"
											variant="ghost"
											className="h-7 shrink-0 text-muted-foreground hover:text-destructive"
											onClick={async () => {
												await deletePreset({ data: { id: preset.id } });
												invalidate();
											}}
										>
											Verwijderen
										</Button>
									</div>
								))
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
