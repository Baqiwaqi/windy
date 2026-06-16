import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";
import { OwnerOverlayControl } from "@/components/panels/OwnerOverlayControl";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/server/rpc";
import { useAddressStore } from "@/stores/addressStore";
import { useOwnerStore } from "@/stores/ownerStore";

const MapView = lazy(() =>
	import("@/components/map/MapView").then((m) => ({ default: m.MapView })),
);

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => await getSession(),
});

function App() {
	const { role } = Route.useLoaderData();
	const loadDefaultAddresses = useAddressStore((s) => s.loadDefaultAddresses);
	const setAdmin = useOwnerStore((s) => s.setAdmin);

	useEffect(() => {
		loadDefaultAddresses();
	}, [loadDefaultAddresses]);

	useEffect(() => {
		setAdmin(role === "admin");
	}, [role, setAdmin]);

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
					<OwnerOverlayControl />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
