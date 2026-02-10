import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { distanceZones } from "@/lib/distanceZones";
import { useMapStore } from "@/stores/mapStore";

export function ZoneToggles() {
	const { zoneVisibility, toggleZone } = useMapStore();

	return (
		<div className="space-y-2">
			{distanceZones.map((zone) => {
				const checked = zoneVisibility[zone.id as keyof typeof zoneVisibility];
				return (
					<div key={zone.id} className="flex items-center gap-2">
						<Checkbox
							id={`zone-${zone.id}`}
							checked={checked}
							onCheckedChange={() =>
								toggleZone(zone.id as keyof typeof zoneVisibility)
							}
						/>
						<span
							className="size-3 rounded-full shrink-0"
							style={{ backgroundColor: zone.color, opacity: 0.5 }}
						/>
						<Label
							htmlFor={`zone-${zone.id}`}
							className="cursor-pointer text-sm"
						>
							{zone.label}
						</Label>
					</div>
				);
			})}
		</div>
	);
}
