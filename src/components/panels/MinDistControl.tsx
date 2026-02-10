import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useMapStore } from "@/stores/mapStore";

export function MinDistControl() {
	const {
		showMinDistance,
		minimumTurbineDistance,
		setShowMinDistance,
		setMinimumTurbineDistance,
	} = useMapStore();

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Checkbox
					id="show-min-dist"
					checked={showMinDistance}
					onCheckedChange={(v) => setShowMinDistance(v === true)}
				/>
				<Label htmlFor="show-min-dist" className="cursor-pointer text-sm">
					Toon minimumafstand
				</Label>
			</div>
			<div className="space-y-2">
				<Label className="text-xs text-muted-foreground">
					Afstand (meters):
				</Label>
				<Slider
					min={400}
					max={1500}
					step={50}
					value={[minimumTurbineDistance]}
					onValueChange={([v]) => setMinimumTurbineDistance(v)}
				/>
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>400m</span>
					<span className="font-semibold text-foreground">
						{minimumTurbineDistance}m
					</span>
					<span>1500m</span>
				</div>
			</div>
		</div>
	);
}
