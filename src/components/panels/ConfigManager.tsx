import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { turbineTypes } from "@/lib/turbineTypes";
import { useConfigStore } from "@/stores/configStore";
import { useMapStore } from "@/stores/mapStore";
import { useTurbineStore } from "@/stores/turbineStore";
import type { Configuration } from "@/types";

const configSchema = z.object({
	name: z.string().min(1, "Naam is verplicht"),
});

type ConfigFormValues = z.infer<typeof configSchema>;

export function ConfigManager() {
	const { configurations, saveConfiguration, deleteConfiguration } =
		useConfigStore();
	const { turbines, clearTurbines, addTurbine } = useTurbineStore();
	const { minimumTurbineDistance, setMinimumTurbineDistance } = useMapStore();

	const form = useForm<ConfigFormValues>({
		resolver: zodResolver(configSchema),
		defaultValues: { name: "" },
	});

	const onSubmit = (values: ConfigFormValues) => {
		if (turbines.length === 0) {
			alert("Plaats eerst turbines voordat je een configuratie opslaat");
			return;
		}

		const config: Configuration = {
			id: Date.now(),
			name: values.name,
			timestamp: new Date().toISOString(),
			turbines: turbines.map((t) => ({
				latlng: t.latlng,
				typeIndex: t.typeIndex,
				type: t.type,
			})),
			minimumDistance: minimumTurbineDistance,
		};

		saveConfiguration(config);
		form.reset();
		alert(`Configuratie "${values.name}" opgeslagen!`);
	};

	const handleLoad = (config: Configuration) => {
		clearTurbines();
		setMinimumTurbineDistance(config.minimumDistance || 800);

		for (const td of config.turbines) {
			const type = turbineTypes[td.typeIndex];
			addTurbine(td.latlng, type, td.typeIndex);
		}
	};

	const handleDelete = (id: number) => {
		if (confirm("Weet je zeker dat je deze configuratie wilt verwijderen?")) {
			deleteConfiguration(id);
		}
	};

	const handleExportJson = (config: Configuration) => {
		const blob = new Blob([JSON.stringify(config, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `windturbine-${config.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleImportJson = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const config = JSON.parse(
						event.target?.result as string,
					) as Configuration;
					if (!config.turbines || !config.name) {
						throw new Error("Ongeldig configuratiebestand");
					}
					config.id = Date.now();
					config.timestamp = new Date().toISOString();
					saveConfiguration(config);
					alert(`Configuratie "${config.name}" ge\u00efmporteerd!`);
				} catch (err) {
					alert(err instanceof Error ? err.message : "Fout bij importeren");
				}
			};
			reader.readAsText(file);
		};
		input.click();
	};

	return (
		<div className="space-y-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Naam configuratie..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Huidige configuratie opslaan
					</Button>
				</form>
			</Form>

			<Button
				onClick={handleImportJson}
				variant="secondary"
				size="sm"
				className="w-full"
			>
				JSON importeren
			</Button>

			<div className="space-y-2">
				{configurations.length === 0 ? (
					<p className="text-xs text-muted-foreground">
						Nog geen configuraties opgeslagen
					</p>
				) : (
					configurations.map((config) => {
						const date = new Date(config.timestamp);
						const dateStr = date.toLocaleDateString("nl-NL", {
							day: "numeric",
							month: "short",
							hour: "2-digit",
							minute: "2-digit",
						});

						return (
							<div
								key={config.id}
								className="border border-border rounded p-2 text-sm"
							>
								<div className="flex justify-between items-start mb-1">
									<p className="font-medium">{config.name}</p>
									<Button
										variant="ghost"
										size="sm"
										className="text-destructive hover:text-destructive h-auto py-0 px-1 text-xs"
										onClick={() => handleDelete(config.id)}
									>
										&#x2715;
									</Button>
								</div>
								<p className="text-xs text-muted-foreground mb-2">
									{config.turbines.length} turbine
									{config.turbines.length !== 1 ? "s" : ""} &bull; {dateStr}
								</p>
								<div className="flex gap-1">
									<Button
										onClick={() => handleLoad(config)}
										size="sm"
										className="flex-1 text-xs h-7"
									>
										Laden
									</Button>
									<Button
										onClick={() => handleExportJson(config)}
										variant="secondary"
										size="sm"
										className="flex-1 text-xs h-7"
									>
										Export
									</Button>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
