import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
				<Header />
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
