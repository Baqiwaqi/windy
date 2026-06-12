import {
	ChevronDown,
	CircleDot,
	Fan,
	FileSpreadsheet,
	List,
	Plus,
	Ruler,
	Search,
	Settings,
} from "lucide-react";
import { PdfExport } from "@/components/export/PdfExport";
import { AddressSearch } from "@/components/panels/AddressSearch";
import { ConfigManager } from "@/components/panels/ConfigManager";
import { CsvAnalysis } from "@/components/panels/CsvAnalysis";
import { MinDistControl } from "@/components/panels/MinDistControl";
import { TurbineList } from "@/components/panels/TurbineList";
import { TurbinePlacer } from "@/components/panels/TurbinePlacer";
import { ZoneToggles } from "@/components/panels/ZoneToggles";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarSeparator,
} from "@/components/ui/sidebar";

function CollapsibleSection({
	label,
	icon: Icon,
	defaultOpen = true,
	children,
}: {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	defaultOpen?: boolean;
	children: React.ReactNode;
}) {
	return (
		<Collapsible defaultOpen={defaultOpen} className="group/collapsible">
			<SidebarGroup className="py-1">
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
						<Icon className="size-3.5 shrink-0 text-primary" />
						<span className="flex-1 truncate text-left">{label}</span>
						<ChevronDown className="size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent className="min-w-0 px-2 pt-2 pb-1">
						{children}
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader className="h-14 justify-center border-b border-sidebar-border px-4 py-0">
				<div className="flex items-center gap-3">
					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
						<Fan className="size-4.5 animate-[spin_7s_linear_infinite] motion-reduce:animate-none" />
					</div>
					<div className="min-w-0">
						<span className="block font-display text-lg font-bold uppercase leading-none tracking-[0.22em] text-foreground">
							Windy
						</span>
						<span className="mt-0.5 block truncate text-[11px] leading-tight text-muted-foreground">
							Windturbine-visualisatie
						</span>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent className="overflow-x-hidden">
				<CollapsibleSection label="Turbine plaatsen" icon={Plus}>
					<TurbinePlacer />
				</CollapsibleSection>

				<CollapsibleSection label="Geplaatste turbines" icon={List}>
					<TurbineList />
				</CollapsibleSection>

				<SidebarSeparator />

				<CollapsibleSection label="Afstandscirkels" icon={CircleDot}>
					<ZoneToggles />
				</CollapsibleSection>

				<CollapsibleSection label="Minimumafstand" icon={Ruler}>
					<MinDistControl />
				</CollapsibleSection>

				<SidebarSeparator />

				<CollapsibleSection label="Zoek adres" icon={Search}>
					<AddressSearch />
				</CollapsibleSection>

				<CollapsibleSection
					label="Woningen analyse"
					icon={FileSpreadsheet}
					defaultOpen={false}
				>
					<CsvAnalysis />
				</CollapsibleSection>

				<SidebarSeparator />

				<CollapsibleSection
					label="Configuraties"
					icon={Settings}
					defaultOpen={false}
				>
					<ConfigManager />
				</CollapsibleSection>
			</SidebarContent>

			<SidebarSeparator />

			<SidebarFooter className="gap-2 px-4 py-3">
				<PdfExport />
				<p className="text-center font-mono text-[10px] tracking-wide text-muted-foreground/70">
					Kaartdata: PDOK · BAG
				</p>
			</SidebarFooter>
		</Sidebar>
	);
}
