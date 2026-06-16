import { zodResolver } from "@hookform/resolvers/zod";
import {
	Check,
	Download,
	FolderOpen,
	Globe2,
	Save,
	Trash2,
	Upload,
	Wind,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import type { StoredPreset } from "@/server/rpc";
import { useConfigStore } from "@/stores/configStore";
import { useMapStore } from "@/stores/mapStore";
import { useOwnerStore } from "@/stores/ownerStore";
import { usePresetStore } from "@/stores/presetStore";
import { useTurbineStore } from "@/stores/turbineStore";
import type { Configuration } from "@/types";

const configSchema = z.object({
	name: z.string().min(1, "Naam is verplicht"),
});

type ConfigFormValues = z.infer<typeof configSchema>;

function relativeTime(timestamp: string): string {
	const diffMs = Date.now() - new Date(timestamp).getTime();
	const minutes = Math.round(diffMs / 60_000);
	if (minutes < 1) return "zojuist";
	const rtf = new Intl.RelativeTimeFormat("nl-NL", { numeric: "auto" });
	if (minutes < 60) return rtf.format(-minutes, "minute");
	const hours = Math.round(minutes / 60);
	if (hours < 24) return rtf.format(-hours, "hour");
	const days = Math.round(hours / 24);
	if (days < 30) return rtf.format(-days, "day");
	return new Date(timestamp).toLocaleDateString("nl-NL", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function ConfigManager() {
	const {
		configurations,
		activeConfigId,
		saveConfiguration,
		deleteConfiguration,
		setActiveConfig,
	} = useConfigStore();
	const { turbines, loadTurbines } = useTurbineStore();
	const { minimumTurbineDistance, setMinimumTurbineDistance } = useMapStore();

	const isAdmin = useOwnerStore((s) => s.isAdmin);
	const presets = usePresetStore((s) => s.presets);
	const loadPresets = usePresetStore((s) => s.load);
	const publishPresetAction = usePresetStore((s) => s.publish);
	const removePreset = usePresetStore((s) => s.remove);

	const [feedback, setFeedback] = useState<string | null>(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
	const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
			if (deleteTimer.current) clearTimeout(deleteTimer.current);
		},
		[],
	);

	useEffect(() => {
		loadPresets();
	}, [loadPresets]);

	const flash = (message: string) => {
		if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
		setFeedback(message);
		feedbackTimer.current = setTimeout(() => setFeedback(null), 3000);
	};

	const form = useForm<ConfigFormValues>({
		resolver: zodResolver(configSchema),
		defaultValues: { name: "" },
	});

	const onSubmit = (values: ConfigFormValues) => {
		const name = values.name.trim();
		const existing = configurations.find(
			(c) => c.name.toLowerCase() === name.toLowerCase(),
		);

		const config: Configuration = {
			id: existing?.id ?? Date.now(),
			name,
			timestamp: new Date().toISOString(),
			turbines: turbines.map((t) => ({
				latlng: t.latlng,
				typeIndex: t.typeIndex,
				type: t.type,
			})),
			minimumDistance: minimumTurbineDistance,
		};

		saveConfiguration(config);
		setActiveConfig(config.id);
		form.reset();
		flash(existing ? `"${name}" bijgewerkt` : `"${name}" opgeslagen`);
	};

	const handleLoad = (config: Configuration) => {
		setMinimumTurbineDistance(config.minimumDistance || 800);
		loadTurbines(
			config.turbines.map((td) => ({
				latlng: td.latlng,
				typeIndex: td.typeIndex,
				type: turbineTypes[td.typeIndex] ?? td.type,
			})),
		);
		setActiveConfig(config.id);
		flash(`"${config.name}" geladen`);
	};

	const handleLoadPreset = (preset: StoredPreset) => {
		setMinimumTurbineDistance(preset.minimumDistance || 800);
		loadTurbines(
			preset.turbines.map((td) => ({
				latlng: td.latlng,
				typeIndex: td.typeIndex,
				type: turbineTypes[td.typeIndex] ?? td.type,
			})),
		);
		flash(`"${preset.name}" geladen`);
	};

	const handlePublish = async () => {
		const name = form.getValues("name").trim();
		if (!name) {
			form.setError("name", { message: "Naam is verplicht" });
			return;
		}
		await publishPresetAction({
			name,
			turbines: turbines.map((t) => ({
				latlng: t.latlng,
				typeIndex: t.typeIndex,
				type: t.type,
			})),
			minimumDistance: minimumTurbineDistance,
		});
		form.reset();
		flash(`"${name}" gepubliceerd`);
	};

	const handleDeleteClick = (id: number) => {
		if (confirmDeleteId !== id) {
			setConfirmDeleteId(id);
			if (deleteTimer.current) clearTimeout(deleteTimer.current);
			deleteTimer.current = setTimeout(() => setConfirmDeleteId(null), 3000);
			return;
		}
		deleteConfiguration(id);
		setConfirmDeleteId(null);
		flash("Configuratie verwijderd");
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
					flash(`"${config.name}" geïmporteerd`);
				} catch (err) {
					flash(err instanceof Error ? err.message : "Fout bij importeren");
				}
			};
			reader.readAsText(file);
		};
		input.click();
	};

	const canSave = turbines.length > 0;

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
									<div className="flex gap-1.5">
										<Input
											placeholder="Naam configuratie..."
											className="h-8 text-sm"
											{...field}
										/>
										<Button
											type="submit"
											size="sm"
											className="h-8 shrink-0 px-2.5"
											disabled={!canSave}
											title={
												canSave
													? "Huidige opstelling opslaan"
													: "Plaats eerst turbines op de kaart"
											}
										>
											<Save className="size-3.5" />
											<span className="sr-only">Opslaan</span>
										</Button>
										{isAdmin && (
											<Button
												type="button"
												onClick={handlePublish}
												size="sm"
												variant="secondary"
												className="h-8 shrink-0 px-2.5"
												disabled={!canSave}
												title="Publiceren als preset voor iedereen"
											>
												<Globe2 className="size-3.5" />
												<span className="sr-only">Publiceren</span>
											</Button>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{!canSave && (
						<p className="text-[11px] text-muted-foreground">
							Plaats eerst turbines om een configuratie op te slaan
						</p>
					)}
				</form>
			</Form>

			{feedback && (
				<output className="flex items-center gap-1.5 text-xs text-primary animate-in fade-in slide-in-from-top-1">
					<Check className="size-3.5" />
					{feedback}
				</output>
			)}

			<div className="space-y-2">
				{configurations.length === 0 ? (
					<div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-6 text-center">
						<Wind className="size-5 text-muted-foreground/60" />
						<p className="px-4 text-xs text-muted-foreground">
							Nog geen configuraties — sla je huidige opstelling op of importeer
							een JSON-bestand
						</p>
					</div>
				) : (
					configurations.map((config) => {
						const isActive = config.id === activeConfigId;
						const isConfirmingDelete = config.id === confirmDeleteId;

						return (
							<div
								key={config.id}
								className={cn(
									"group rounded-lg border p-2.5 text-sm transition-colors",
									isActive
										? "border-primary/50 bg-accent/50"
										: "border-border hover:border-primary/30",
								)}
							>
								<div className="mb-0.5 flex items-center justify-between gap-2">
									<p className="truncate font-medium">{config.name}</p>
									{isActive && (
										<span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
											<Check className="size-2.5" />
											Actief
										</span>
									)}
								</div>
								<p className="mb-2 text-xs text-muted-foreground">
									{config.turbines.length} turbine
									{config.turbines.length !== 1 ? "s" : ""}
									{config.minimumDistance
										? ` · ${config.minimumDistance} m`
										: ""}
									{" · "}
									{relativeTime(config.timestamp)}
								</p>
								<div className="flex items-center gap-1">
									<Button
										onClick={() => handleLoad(config)}
										size="sm"
										variant={isActive ? "secondary" : "default"}
										className="h-7 flex-1 gap-1.5 text-xs"
									>
										<FolderOpen className="size-3" />
										{isActive ? "Opnieuw laden" : "Laden"}
									</Button>
									<Button
										onClick={() => handleExportJson(config)}
										variant="ghost"
										size="sm"
										className="size-7 p-0"
										title="Exporteren als JSON"
									>
										<Download className="size-3.5" />
										<span className="sr-only">Exporteren</span>
									</Button>
									<Button
										onClick={() => handleDeleteClick(config.id)}
										variant={isConfirmingDelete ? "destructive" : "ghost"}
										size="sm"
										className={cn(
											"h-7 p-0 transition-all",
											isConfirmingDelete
												? "w-auto px-2 text-xs"
												: "w-7 text-muted-foreground hover:text-destructive",
										)}
										title={
											isConfirmingDelete
												? "Klik nogmaals om te verwijderen"
												: "Verwijderen"
										}
									>
										{isConfirmingDelete ? (
											"Zeker?"
										) : (
											<>
												<Trash2 className="size-3.5" />
												<span className="sr-only">Verwijderen</span>
											</>
										)}
									</Button>
								</div>
							</div>
						);
					})
				)}
			</div>

			{presets.length > 0 && (
				<div className="space-y-2">
					<p className="text-xs font-medium text-muted-foreground">
						Gepubliceerde presets
					</p>
					{presets.map((preset) => (
						<div
							key={preset.id}
							className="rounded-lg border border-border p-2.5 text-sm"
						>
							<div className="mb-2 flex items-center justify-between gap-2">
								<p className="truncate font-medium">{preset.name}</p>
								<span className="shrink-0 text-[10px] text-muted-foreground">
									{preset.turbines.length} turbine
									{preset.turbines.length !== 1 ? "s" : ""}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Button
									onClick={() => handleLoadPreset(preset)}
									size="sm"
									className="h-7 flex-1 gap-1.5 text-xs"
								>
									<FolderOpen className="size-3" />
									Laden
								</Button>
								{isAdmin && (
									<Button
										onClick={() => removePreset(preset.id)}
										variant="ghost"
										size="sm"
										className="size-7 p-0 text-muted-foreground hover:text-destructive"
										title="Preset verwijderen"
									>
										<Trash2 className="size-3.5" />
										<span className="sr-only">Verwijderen</span>
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			<Button
				onClick={handleImportJson}
				variant="outline"
				size="sm"
				className="h-7 w-full gap-1.5 text-xs"
			>
				<Upload className="size-3" />
				JSON importeren
			</Button>
		</div>
	);
}
