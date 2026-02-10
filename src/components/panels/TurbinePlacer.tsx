import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { turbineTypes } from "@/lib/turbineTypes";
import { useTurbineStore } from "@/stores/turbineStore";

export function TurbinePlacer() {
	const { isAddMode, selectedTypeIndex, setSelectedTypeIndex, toggleAddMode } =
		useTurbineStore();

	return (
		<div className="space-y-2">
			<Select
				value={String(selectedTypeIndex)}
				onValueChange={(v) => setSelectedTypeIndex(Number(v))}
			>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{turbineTypes.map((t, i) => (
						<SelectItem key={i} value={String(i)}>
							{t.name} - {["\u{1F7E2}", "\u{1F7E0}", "\u{1F534}"][i]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				onClick={toggleAddMode}
				variant={isAddMode ? "destructive" : "default"}
				className="w-full"
			>
				{isAddMode ? "Annuleren" : "Klik op kaart om te plaatsen"}
			</Button>
			{isAddMode && (
				<p className="text-xs text-muted-foreground">
					Klik op de kaart om een turbine te plaatsen
				</p>
			)}
		</div>
	);
}
