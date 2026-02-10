import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { calculateDistance } from "@/lib/geo";
import { searchAddress } from "@/lib/pdok";
import { useAddressStore } from "@/stores/addressStore";
import { useTurbineStore } from "@/stores/turbineStore";

const addressSchema = z.object({
	postcode: z
		.string()
		.regex(/^\d{4}\s?[A-Za-z]{2}$/, "Ongeldige postcode (bijv. 1234AB)"),
	huisnummer: z.string().min(1, "Huisnummer is verplicht"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressSearch() {
	const [loading, setLoading] = useState(false);

	const { searchedAddress, setSearchedAddress } = useAddressStore();
	const turbines = useTurbineStore((s) => s.turbines);

	const form = useForm<AddressFormValues>({
		resolver: zodResolver(addressSchema),
		defaultValues: { postcode: "", huisnummer: "" },
	});

	const onSubmit = async (values: AddressFormValues) => {
		setLoading(true);

		try {
			const result = await searchAddress(values.postcode, values.huisnummer);
			setSearchedAddress(result);
		} catch (err) {
			form.setError("postcode", {
				message: err instanceof Error ? err.message : "Fout bij zoeken",
			});
		} finally {
			setLoading(false);
		}
	};

	let analysisContent = null;
	if (searchedAddress && turbines.length > 0) {
		const distances = turbines.map((t) =>
			calculateDistance(searchedAddress.latlng, t.latlng),
		);
		const minDist = Math.round(Math.min(...distances));

		let zoneText = "";
		if (minDist < 500) zoneText = "Binnen 500m zone";
		else if (minDist < 1000) zoneText = "Binnen 1km zone";
		else if (minDist < 1500) zoneText = "Binnen 1.5km zone";
		else if (minDist < 2000) zoneText = "Binnen 2km zone";
		else zoneText = "Buiten 2km zone";

		analysisContent = (
			<div className="mt-3 p-2 rounded border border-border bg-muted/50">
				<p className="text-xs font-semibold mb-1">Analyse adres</p>
				<p className="text-xs font-semibold">{searchedAddress.address}</p>
				<p className="text-xs">
					Dichtstbijzijnde turbine: <strong>{minDist}m</strong>
				</p>
				<p className="text-xs text-muted-foreground">{zoneText}</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<div className="flex gap-2">
						<FormField
							control={form.control}
							name="postcode"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<Input placeholder="Postcode" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="huisnummer"
							render={({ field }) => (
								<FormItem className="w-20">
									<FormControl>
										<Input placeholder="Nr" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={loading} className="w-full" size="sm">
						{loading ? "..." : "Zoek"}
					</Button>
				</form>
			</Form>
			{analysisContent}
		</div>
	);
}
