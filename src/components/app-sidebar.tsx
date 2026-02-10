import {
	ChevronDown,
	CircleDot,
	FileSpreadsheet,
	List,
	Plus,
	Ruler,
	Search,
	Settings,
	Wind,
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
			<SidebarGroup>
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger className="flex w-full items-center gap-2">
						<Icon className="size-4" />
						<span className="flex-1 text-left">{label}</span>
						<ChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent className="px-2 pt-2">
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
			<SidebarHeader className="px-4 py-3">
				<div className="flex items-center gap-2">
					<Wind className="size-6 text-primary" />
					<span className="text-lg font-bold tracking-wider text-primary">
						WINDY
					</span>
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					Windturbine Visualisatie
				</p>
			</SidebarHeader>

			<SidebarSeparator />

			<SidebarContent>
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

			<SidebarFooter className="px-4 py-3">
				<PdfExport />
			</SidebarFooter>
		</Sidebar>
	);
}
