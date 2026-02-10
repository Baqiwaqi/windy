import { Button } from "@/components/ui/button";
import { turbineEmojis } from "@/lib/turbineTypes";
import { useTurbineStore } from "@/stores/turbineStore";

export function TurbineList() {
	const { turbines, removeTurbine } = useTurbineStore();

	return (
		<div className="space-y-2">
			{turbines.length === 0 ? (
				<p className="text-xs text-muted-foreground">
					Nog geen turbines geplaatst
				</p>
			) : (
				turbines.map((turbine, idx) => (
					<div
						key={turbine.id}
						className="flex justify-between items-start text-sm border-b border-border pb-2"
					>
						<div>
							<p className="font-medium">
								{turbineEmojis[turbine.typeIndex]} Turbine {idx + 1}
							</p>
							<p className="text-xs text-muted-foreground">
								{turbine.type.name}
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive h-auto py-0.5 px-1 text-xs"
							onClick={() => removeTurbine(turbine.id)}
						>
							Verwijder
						</Button>
					</div>
				))
			)}
		</div>
	);
}
