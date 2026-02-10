import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { distanceZones } from "@/lib/distanceZones";
import { cn } from "@/lib/utils";
import { useAddressStore } from "@/stores/addressStore";
import { useMapStore } from "@/stores/mapStore";

function getZoneColor(distance: number): string {
	for (const zone of distanceZones) {
		if (distance <= zone.distance) return zone.color;
	}
	return distanceZones[distanceZones.length - 1].color;
}

export function AddressDetailSheet() {
	const {
		affectedAddresses,
		isAddressSheetOpen,
		selectedAddress,
		setAddressSheetOpen,
		setSelectedAddress,
	} = useAddressStore();
	const hinderDistance = useMapStore((s) => s.hinderDistance);

	const sorted = [...affectedAddresses].sort(
		(a, b) => a.distance - b.distance,
	);

	return (
		<Sheet open={isAddressSheetOpen} onOpenChange={setAddressSheetOpen}>
			<SheetContent side="right" className="w-full sm:max-w-md p-0">
				<SheetHeader className="px-4 pt-4 pb-2 border-b border-border">
					<SheetTitle>
						{affectedAddresses.length} getroffen adressen
					</SheetTitle>
					<SheetDescription>
						Binnen {hinderDistance}m van geplaatste turbines
					</SheetDescription>
				</SheetHeader>

				<div className="overflow-y-auto flex-1 px-2 py-1">
					{sorted.map((addr) => {
						const isSelected =
							selectedAddress?.address === addr.address &&
							selectedAddress?.turbineIndex === addr.turbineIndex;
						const color = getZoneColor(addr.distance);

						return (
							<button
								type="button"
								key={`${addr.address}-${addr.turbineIndex}`}
								onClick={() => setSelectedAddress(addr)}
								className={cn(
									"w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted/50",
									isSelected && "bg-muted",
								)}
							>
								<div className="flex items-start justify-between gap-2">
									<div className="min-w-0 flex-1">
										<p className="font-medium truncate">{addr.address}</p>
										<p className="text-xs text-muted-foreground">
											{addr.postcode} {addr.woonplaats}
										</p>
									</div>
									<div className="flex flex-col items-end shrink-0 gap-0.5">
										<span
											className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
											style={{ backgroundColor: color }}
										>
											{addr.distance}m
										</span>
										<span className="text-xs text-muted-foreground">
											{addr.turbineName}
										</span>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}
