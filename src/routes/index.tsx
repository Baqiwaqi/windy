import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAddressStore } from "@/stores/addressStore";

const MapView = lazy(() =>
	import("@/components/map/MapView").then((m) => ({ default: m.MapView })),
);

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const loadDefaultAddresses = useAddressStore((s) => s.loadDefaultAddresses);

	useEffect(() => {
		loadDefaultAddresses();
	}, [loadDefaultAddresses]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="flex flex-col h-screen overflow-hidden">
				<header className="flex items-center gap-2 border-b px-4 py-2">
					<SidebarTrigger className="-ml-1" />
					<div className="flex-1">
						<h1 className="text-sm font-semibold">Windturbine Visualisatie</h1>
						<p className="text-xs text-muted-foreground">
							Hoeker en GarstenPolder
						</p>
					</div>
					<ThemeToggle />
				</header>
				<div className="flex-1 relative">
					<Suspense
						fallback={
							<div className="h-full w-full flex items-center justify-center bg-background">
								<p className="text-muted-foreground">Kaart laden...</p>
							</div>
						}
					>
						<MapView />
					</Suspense>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
