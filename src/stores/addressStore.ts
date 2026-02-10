import { create } from "zustand";
import { parseAddressCsv } from "@/lib/csv";
import type { SearchedAddress } from "@/lib/pdok";
import type { Address, AffectedAddress } from "@/types";

interface AddressState {
	uploadedAddresses: Address[];
	affectedAddresses: AffectedAddress[];
	searchedAddress: SearchedAddress | null;
	selectedAddress: AffectedAddress | null;
	isAddressSheetOpen: boolean;
	isLoading: boolean;

	setUploadedAddresses: (addresses: Address[]) => void;
	setAffectedAddresses: (addresses: AffectedAddress[]) => void;
	setSearchedAddress: (address: SearchedAddress | null) => void;
	setSelectedAddress: (address: AffectedAddress | null) => void;
	setAddressSheetOpen: (open: boolean) => void;
	loadDefaultAddresses: () => Promise<void>;
}

export const useAddressStore = create<AddressState>((set, get) => ({
	uploadedAddresses: [],
	affectedAddresses: [],
	searchedAddress: null,
	selectedAddress: null,
	isAddressSheetOpen: false,
	isLoading: false,

	setUploadedAddresses: (addresses) => set({ uploadedAddresses: addresses }),
	setAffectedAddresses: (addresses) => set({ affectedAddresses: addresses }),
	setSearchedAddress: (address) => set({ searchedAddress: address }),
	setSelectedAddress: (address) => set({ selectedAddress: address }),
	setAddressSheetOpen: (open) => set({ isAddressSheetOpen: open }),

	loadDefaultAddresses: async () => {
		// Skip if already loaded
		if (get().uploadedAddresses.length > 0 || get().isLoading) return;

		set({ isLoading: true });
		try {
			const response = await fetch("/adressen_windturbine.csv");
			if (!response.ok) return;
			const csvText = await response.text();
			const addresses = parseAddressCsv(csvText);
			set({ uploadedAddresses: addresses });
			console.log(`Auto-loaded ${addresses.length} adressen from default CSV`);
		} catch (err) {
			console.warn("Could not auto-load addresses:", err);
		} finally {
			set({ isLoading: false });
		}
	},
}));
