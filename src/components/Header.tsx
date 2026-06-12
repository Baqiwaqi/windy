import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAddressStore } from "@/stores/addressStore";
import { useMapStore } from "@/stores/mapStore";
import { useTurbineStore } from "@/stores/turbineStore";

function Stat({
	value,
	unit,
	label,
}: {
	value: string | number;
	unit?: string;
	label: string;
}) {
	return (
		<div className="flex flex-col items-center px-3 py-1">
			<span className="font-mono text-sm font-semibold leading-tight tabular-nums text-foreground">
				{value}
				{unit && (
					<span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
						{unit}
					</span>
				)}
			</span>
			<span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
				{label}
			</span>
		</div>
	);
}

export function Header() {
	const turbines = useTurbineStore((s) => s.turbines);
	const isAddMode = useTurbineStore((s) => s.isAddMode);
	const affectedAddresses = useAddressStore((s) => s.affectedAddresses);
	const hinderDistance = useMapStore((s) => s.hinderDistance);

	const totalPower = turbines.reduce((sum, t) => sum + t.type.power, 0);
	const powerLabel =
		totalPower % 1 === 0 ? String(totalPower) : totalPower.toFixed(1);

	return (
		<header className="relative flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
			<SidebarTrigger className="-ml-1" />
			<div className="h-5 w-px shrink-0 bg-border" />

			<div className="min-w-0 flex-1">
				<h1 className="truncate font-display text-sm font-semibold uppercase tracking-[0.1em]">
					Windturbine Visualisatie
				</h1>
				<p className="truncate text-[11px] text-muted-foreground">
					Hoeker- en Garstenpolder
				</p>
			</div>

			{isAddMode && (
				<span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary md:flex">
					<span className="size-1.5 animate-pulse rounded-full bg-primary" />
					Klik op de kaart om te plaatsen
				</span>
			)}

			<div className="hidden shrink-0 items-stretch divide-x divide-border rounded-lg border border-border bg-card shadow-xs sm:flex">
				<Stat value={turbines.length} label="turbines" />
				<Stat value={powerLabel} unit="MW" label="vermogen" />
				{affectedAddresses.length > 0 && (
					<Stat
						value={affectedAddresses.length}
						label={`< ${hinderDistance} m`}
					/>
				)}
			</div>

			<ThemeToggle />

			<div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/70 via-primary/20 to-transparent" />
		</header>
	);
}

export default Header;
