import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { P as Papa } from "../_libs/papaparse.mjs";
import { a } from "../_chunks/_libs/@hookform/resolvers.mjs";
import { u as useForm, F as FormProvider, C as Controller, b as useFormContext, c as useFormState } from "../_libs/react-hook-form.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { F as Fan, P as Plus, L as List, C as CircleDot, R as Ruler, S as Search, a as FileSpreadsheet, b as Settings, c as ChevronDown, d as Save, e as Check, W as Wind, f as FolderOpen, D as Download, T as Trash2, U as Upload, g as FileDown, h as PanelLeft, i as Sun, M as Moon, X, j as ChevronUp } from "../_libs/lucide-react.mjs";
import { P as Provider } from "../_chunks/_libs/@radix-ui/react-tooltip.mjs";
import { R as Root, C as Content, a as Close, T as Title, D as Description, P as Portal$1, O as Overlay } from "../_chunks/_libs/@radix-ui/react-dialog.mjs";
import { R as Root$1, C as CollapsibleTrigger$1, a as CollapsibleContent$1 } from "../_chunks/_libs/@radix-ui/react-collapsible.mjs";
import { S as Slot } from "../_chunks/_libs/@radix-ui/react-slot.mjs";
import { R as Root2, T as Trigger, I as Icon, V as Value, P as Portal, C as Content2, a as Viewport, b as Item, c as ItemIndicator, d as ItemText, S as ScrollUpButton, e as ScrollDownButton } from "../_chunks/_libs/@radix-ui/react-select.mjs";
import { R as Root$2 } from "../_chunks/_libs/@radix-ui/react-separator.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_chunks/_libs/@radix-ui/react-checkbox.mjs";
import { R as Root$3 } from "../_chunks/_libs/@radix-ui/react-label.mjs";
import { R as Root$4, T as Track, a as Range, b as Thumb } from "../_chunks/_libs/@radix-ui/react-slider.mjs";
import { R as Root2$1, T as Trigger$1, P as Portal2, C as Content2$1, I as Item2 } from "../_chunks/_libs/@radix-ui/react-dropdown-menu.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "stream";
import "../_chunks/_libs/@radix-ui/primitive.mjs";
import "../_chunks/_libs/@radix-ui/react-compose-refs.mjs";
import "../_chunks/_libs/@radix-ui/react-context.mjs";
import "../_chunks/_libs/@radix-ui/react-dismissable-layer.mjs";
import "../_chunks/_libs/@radix-ui/react-primitive.mjs";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "../_chunks/_libs/@radix-ui/react-use-callback-ref.mjs";
import "../_chunks/_libs/@radix-ui/react-use-escape-keydown.mjs";
import "../_chunks/_libs/@radix-ui/react-popper.mjs";
import "../_chunks/_libs/@floating-ui/react-dom.mjs";
import "../_chunks/_libs/@floating-ui/dom.mjs";
import "../_chunks/_libs/@floating-ui/core.mjs";
import "../_chunks/_libs/@floating-ui/utils.mjs";
import "../_chunks/_libs/@radix-ui/react-arrow.mjs";
import "../_chunks/_libs/@radix-ui/react-use-layout-effect.mjs";
import "../_chunks/_libs/@radix-ui/react-use-size.mjs";
import "../_chunks/_libs/@radix-ui/react-presence.mjs";
import "../_chunks/_libs/@radix-ui/react-visually-hidden.mjs";
import "../_chunks/_libs/@radix-ui/react-id.mjs";
import "../_chunks/_libs/@radix-ui/react-use-controllable-state.mjs";
import "../_chunks/_libs/@radix-ui/react-focus-scope.mjs";
import "../_chunks/_libs/@radix-ui/react-portal.mjs";
import "../_chunks/_libs/@radix-ui/react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_chunks/_libs/@radix-ui/number.mjs";
import "../_chunks/_libs/@radix-ui/react-collection.mjs";
import "../_chunks/_libs/@radix-ui/react-direction.mjs";
import "../_chunks/_libs/@radix-ui/react-use-previous.mjs";
import "../_chunks/_libs/@radix-ui/react-menu.mjs";
import "../_chunks/_libs/@radix-ui/react-roving-focus.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function parseAddressCsv(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });
  if (result.errors.length > 0 && result.data.length === 0) {
    throw new Error(`CSV parse fout: ${result.errors[0].message}`);
  }
  const fields = result.meta.fields ?? [];
  const lower = fields.map((f) => f.toLowerCase());
  const find = (...names) => {
    for (const n of names) {
      const idx = lower.indexOf(n);
      if (idx >= 0) return fields[idx];
    }
    return null;
  };
  const adresCol = find("adres", "address", "weergavenaam") ?? fields[0];
  const postcodeCol = find("postcode") ?? fields[1];
  const latCol = find("lat", "latitude");
  const lngCol = find("lng", "lon", "longitude");
  const huisnummerCol = find("huisnummer", "huis_nlt");
  const woonplaatsCol = find("woonplaats", "woonplaatsnaam");
  const objecttypeCol = find("objecttype");
  const nummeraanduidingCol = find("nummeraanduiding_id", "nummeraanduiding");
  if (!latCol || !lngCol) {
    throw new Error(
      'CSV bestand mist lat/lng kolommen.\nZorg dat de header "lat" en "lng" kolommen bevat.'
    );
  }
  const addresses = [];
  for (const row of result.data) {
    const lat = parseFloat(row[latCol]);
    const lng = parseFloat(row[lngCol]);
    if (isNaN(lat) || isNaN(lng)) continue;
    const nummeraanduidingId = nummeraanduidingCol ? row[nummeraanduidingCol] : void 0;
    addresses.push({
      address: row[adresCol] ?? "",
      postcode: row[postcodeCol] ?? "",
      huisnummer: huisnummerCol ? row[huisnummerCol] ?? "" : "",
      woonplaats: woonplaatsCol ? row[woonplaatsCol] ?? "" : "",
      objecttype: objecttypeCol ? row[objecttypeCol] ?? "verblijfsobject" : "verblijfsobject",
      lat,
      lng,
      ...nummeraanduidingId ? { nummeraanduidingId } : {}
    });
  }
  return addresses;
}
const useAddressStore = create((set, get) => ({
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
  }
}));
const useMapStore = create((set) => ({
  zoneVisibility: {
    zone500: true,
    zone1000: true,
    zone1500: true,
    zone2000: false
  },
  showMinDistance: true,
  minimumTurbineDistance: 800,
  hinderDistance: 1e3,
  toggleZone: (zoneId) => set((s) => ({
    zoneVisibility: {
      ...s.zoneVisibility,
      [zoneId]: !s.zoneVisibility[zoneId]
    }
  })),
  setShowMinDistance: (show) => set({ showMinDistance: show }),
  setMinimumTurbineDistance: (distance) => set({ minimumTurbineDistance: distance }),
  setHinderDistance: (distance) => set({ hinderDistance: distance })
}));
let idCounter = Date.now();
const nextId = () => ++idCounter;
const useTurbineStore = create((set) => ({
  turbines: [],
  isAddMode: false,
  selectedTypeIndex: 0,
  setAddMode: (on) => set({ isAddMode: on }),
  toggleAddMode: () => set((s) => ({ isAddMode: !s.isAddMode })),
  setSelectedTypeIndex: (idx) => set({ selectedTypeIndex: idx }),
  addTurbine: (latlng, type, typeIndex) => set((s) => ({
    turbines: [...s.turbines, { id: nextId(), latlng, type, typeIndex }],
    isAddMode: false
  })),
  removeTurbine: (id) => set((s) => ({
    turbines: s.turbines.filter((t) => t.id !== id)
  })),
  moveTurbine: (id, latlng) => set((s) => ({
    turbines: s.turbines.map((t) => t.id === id ? { ...t, latlng } : t)
  })),
  clearTurbines: () => set({ turbines: [] }),
  loadTurbines: (turbines) => set({ turbines: turbines.map((t) => ({ ...t, id: nextId() })) })
}));
function PdfExport() {
  const [exporting, setExporting] = reactExports.useState(false);
  const turbines = useTurbineStore((s) => s.turbines);
  const affectedAddresses = useAddressStore((s) => s.affectedAddresses);
  const hinderDistance = useMapStore((s) => s.hinderDistance);
  const handleExport = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("../_libs/html2canvas-pro.mjs"),
        import("../_libs/jspdf.mjs")
      ]);
      const mapElement = document.querySelector(
        ".leaflet-container"
      );
      if (!mapElement) {
        alert("Kaart niet gevonden");
        return;
      }
      const canvas = await html2canvas(mapElement, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: 2
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 10;
      pdf.setFontSize(16);
      pdf.text(
        "Windturbine Visualisatie - Hoeker en GarstenPolder",
        pdfWidth / 2,
        position,
        { align: "center" }
      );
      position += 10;
      pdf.setFontSize(10);
      const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      pdf.text(`Datum: ${dateStr}`, pdfWidth / 2, position, {
        align: "center"
      });
      position += 10;
      if (imgHeight > pdfHeight - position - 10) {
        const scale = (pdfHeight - position - 10) / imgHeight;
        pdf.addImage(
          imgData,
          "JPEG",
          10,
          position,
          imgWidth * scale,
          imgHeight * scale
        );
      } else {
        pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
      }
      position += Math.min(imgHeight, pdfHeight - position - 10) + 10;
      if (turbines.length > 0) {
        pdf.addPage();
        position = 20;
        pdf.setFontSize(14);
        pdf.text("Turbine Details", 10, position);
        position += 10;
        pdf.setFontSize(10);
        const colorNames = ["Klein", "Middelgroot", "Groot"];
        for (let idx = 0; idx < turbines.length; idx++) {
          const turbine = turbines[idx];
          pdf.text(
            `Turbine ${idx + 1}: ${colorNames[turbine.typeIndex]} (${turbine.type.name})`,
            10,
            position
          );
          position += 5;
          pdf.text(
            `  Locatie: ${turbine.latlng.lat.toFixed(6)}, ${turbine.latlng.lng.toFixed(6)}`,
            10,
            position
          );
          position += 5;
          pdf.text(
            `  Ashoogte: ${turbine.type.hubHeight}m, Tiphoogte: ${turbine.type.hubHeight + turbine.type.rotorDiameter / 2}m`,
            10,
            position
          );
          position += 8;
          if (position > pdfHeight - 20) {
            pdf.addPage();
            position = 20;
          }
        }
        if (affectedAddresses.length > 0) {
          position += 5;
          pdf.setFontSize(14);
          pdf.text(`Woningen binnen ${hinderDistance}m`, 10, position);
          position += 10;
          pdf.setFontSize(10);
          pdf.text(
            `Totaal aantal woningen: ${affectedAddresses.length}`,
            10,
            position
          );
        }
      }
      const filename = `windturbine-visualisatie-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF export fout:", err);
      alert(
        `Fout bij PDF export: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setExporting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      onClick: handleExport,
      disabled: exporting,
      variant: "outline",
      className: "w-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "size-4 mr-2" }),
        exporting ? "PDF maken..." : "Export PDF"
      ]
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$3,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const Form = FormProvider;
const FormFieldContext = reactExports.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = reactExports.useContext(FormFieldContext);
  const itemContext = reactExports.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = reactExports.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props,
      children: body
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function calculateDistance(a2, b) {
  const R = 6371e3;
  const phi1 = a2.lat * Math.PI / 180;
  const phi2 = b.lat * Math.PI / 180;
  const dPhi = (b.lat - a2.lat) * Math.PI / 180;
  const dLambda = (b.lng - a2.lng) * Math.PI / 180;
  const x = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) * Math.sin(dLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}
function findConflicts(turbines, minDistance) {
  const conflicting = /* @__PURE__ */ new Set();
  for (let i = 0; i < turbines.length; i++) {
    for (let j = i + 1; j < turbines.length; j++) {
      const dist = calculateDistance(turbines[i].latlng, turbines[j].latlng);
      if (dist < minDistance) {
        conflicting.add(turbines[i].id);
        conflicting.add(turbines[j].id);
      }
    }
  }
  return conflicting;
}
async function searchAddress(postcode, huisnummer) {
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  const response = await fetch(
    `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${cleanPostcode}+${huisnummer}&fq=type:adres`
  );
  const data = await response.json();
  if (data.response.docs.length === 0) {
    throw new Error("Adres niet gevonden");
  }
  const result = data.response.docs[0];
  const match = result.centroide_ll.match(/POINT\(([^ ]+) ([^ ]+)\)/);
  if (!match) {
    throw new Error("Ongeldige coördinaten ontvangen van PDOK API");
  }
  const lng = parseFloat(match[1]);
  const lat = parseFloat(match[2]);
  if (isNaN(lat) || isNaN(lng)) {
    throw new Error("Ongeldige coördinaten ontvangen van PDOK API");
  }
  if (lat < 50 || lat > 54 || lng < 3 || lng > 8) {
    throw new Error("Coördinaten lijken niet in Nederland te liggen");
  }
  return {
    latlng: { lat, lng },
    address: result.weergavenaam,
    postcode: cleanPostcode,
    huisnummer
  };
}
async function lookupNummeraanduidingId(postcode, huisnummer) {
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  const cleanHuisnummer = huisnummer.trim().toUpperCase();
  try {
    const response = await fetch(
      `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${cleanPostcode}+${encodeURIComponent(cleanHuisnummer)}&fq=type:adres&fl=nummeraanduiding_id,postcode,huis_nlt&rows=5`
    );
    if (!response.ok) return null;
    const data = await response.json();
    const docs = data.response.docs;
    if (docs.length === 0) return null;
    const exact = docs.find(
      (doc) => doc.postcode === cleanPostcode && doc.huis_nlt?.toUpperCase() === cleanHuisnummer
    );
    return (exact ?? docs[0]).nummeraanduiding_id ?? null;
  } catch {
    return null;
  }
}
const addressSchema = object({
  postcode: string().regex(/^\d{4}\s?[A-Za-z]{2}$/, "Ongeldige postcode (bijv. 1234AB)"),
  huisnummer: string().min(1, "Huisnummer is verplicht")
});
function AddressSearch() {
  const [loading, setLoading] = reactExports.useState(false);
  const { searchedAddress, setSearchedAddress } = useAddressStore();
  const turbines = useTurbineStore((s) => s.turbines);
  const form = useForm({
    resolver: a(addressSchema),
    defaultValues: { postcode: "", huisnummer: "" }
  });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await searchAddress(values.postcode, values.huisnummer);
      setSearchedAddress(result);
    } catch (err) {
      form.setError("postcode", {
        message: err instanceof Error ? err.message : "Fout bij zoeken"
      });
    } finally {
      setLoading(false);
    }
  };
  let analysisContent = null;
  if (searchedAddress && turbines.length > 0) {
    const distances = turbines.map(
      (t) => calculateDistance(searchedAddress.latlng, t.latlng)
    );
    const minDist = Math.round(Math.min(...distances));
    let zoneText = "";
    if (minDist < 500) zoneText = "Binnen 500m zone";
    else if (minDist < 1e3) zoneText = "Binnen 1km zone";
    else if (minDist < 1500) zoneText = "Binnen 1.5km zone";
    else if (minDist < 2e3) zoneText = "Binnen 2km zone";
    else zoneText = "Buiten 2km zone";
    analysisContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-2 rounded border border-border bg-muted/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold mb-1", children: "Analyse adres" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: searchedAddress.address }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
        "Dichtstbijzijnde turbine: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          minDist,
          "m"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: zoneText })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            control: form.control,
            name: "postcode",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Postcode", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            control: form.control,
            name: "huisnummer",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "w-20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Nr", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full", size: "sm", children: loading ? "..." : "Zoek" })
    ] }) }),
    analysisContent
  ] });
}
const turbineTypes = [
  {
    name: "Klein (3 MW, 150m tip)",
    hubHeight: 100,
    rotorDiameter: 100,
    power: 3
  },
  {
    name: "Middelgroot (4.5 MW, 200m tip)",
    hubHeight: 120,
    rotorDiameter: 160,
    power: 4.5
  },
  {
    name: "Groot (6 MW, 250m tip)",
    hubHeight: 150,
    rotorDiameter: 200,
    power: 6
  }
];
const turbineColors = [
  { fill: "#10b981", name: "Groen" },
  { fill: "#f59e0b", name: "Oranje" },
  { fill: "#ef4444", name: "Rood" }
];
const turbineEmojis = ["🟢", "🟠", "🔴"];
const useConfigStore = create()(
  persist(
    (set, get) => ({
      configurations: [],
      activeConfigId: null,
      saveConfiguration: (config) => set((s) => {
        const idx = s.configurations.findIndex((c) => c.id === config.id);
        if (idx === -1) {
          return { configurations: [...s.configurations, config] };
        }
        const next = [...s.configurations];
        next[idx] = config;
        return { configurations: next };
      }),
      deleteConfiguration: (id) => set((s) => ({
        configurations: s.configurations.filter((c) => c.id !== id),
        activeConfigId: s.activeConfigId === id ? null : s.activeConfigId
      })),
      setActiveConfig: (id) => set({ activeConfigId: id }),
      loadConfigurations: () => get().configurations
    }),
    {
      name: "windturbineConfigs",
      partialize: (s) => ({ configurations: s.configurations })
    }
  )
);
const configSchema = object({
  name: string().min(1, "Naam is verplicht")
});
function relativeTime(timestamp) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.round(diffMs / 6e4);
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
    year: "numeric"
  });
}
function ConfigManager() {
  const {
    configurations,
    activeConfigId,
    saveConfiguration,
    deleteConfiguration,
    setActiveConfig
  } = useConfigStore();
  const { turbines, loadTurbines } = useTurbineStore();
  const { minimumTurbineDistance, setMinimumTurbineDistance } = useMapStore();
  const [feedback, setFeedback] = reactExports.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const feedbackTimer = reactExports.useRef(null);
  const deleteTimer = reactExports.useRef(null);
  reactExports.useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
      if (deleteTimer.current) clearTimeout(deleteTimer.current);
    },
    []
  );
  const flash = (message) => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setFeedback(message);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 3e3);
  };
  const form = useForm({
    resolver: a(configSchema),
    defaultValues: { name: "" }
  });
  const onSubmit = (values) => {
    const name = values.name.trim();
    const existing = configurations.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    const config = {
      id: existing?.id ?? Date.now(),
      name,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      turbines: turbines.map((t) => ({
        latlng: t.latlng,
        typeIndex: t.typeIndex,
        type: t.type
      })),
      minimumDistance: minimumTurbineDistance
    };
    saveConfiguration(config);
    setActiveConfig(config.id);
    form.reset();
    flash(existing ? `"${name}" bijgewerkt` : `"${name}" opgeslagen`);
  };
  const handleLoad = (config) => {
    setMinimumTurbineDistance(config.minimumDistance || 800);
    loadTurbines(
      config.turbines.map((td) => ({
        latlng: td.latlng,
        typeIndex: td.typeIndex,
        type: turbineTypes[td.typeIndex] ?? td.type
      }))
    );
    setActiveConfig(config.id);
    flash(`"${config.name}" geladen`);
  };
  const handleDeleteClick = (id) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      if (deleteTimer.current) clearTimeout(deleteTimer.current);
      deleteTimer.current = setTimeout(() => setConfirmDeleteId(null), 3e3);
      return;
    }
    deleteConfiguration(id);
    setConfirmDeleteId(null);
    flash("Configuratie verwijderd");
  };
  const handleExportJson = (config) => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = `windturbine-${config.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.json`;
    document.body.appendChild(a2);
    a2.click();
    document.body.removeChild(a2);
    URL.revokeObjectURL(url);
  };
  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(
            event.target?.result
          );
          if (!config.turbines || !config.name) {
            throw new Error("Ongeldig configuratiebestand");
          }
          config.id = Date.now();
          config.timestamp = (/* @__PURE__ */ new Date()).toISOString();
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Naam configuratie...",
                  className: "h-8 text-sm",
                  ...field
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  size: "sm",
                  className: "h-8 shrink-0 px-2.5",
                  disabled: !canSave,
                  title: canSave ? "Huidige opstelling opslaan" : "Plaats eerst turbines op de kaart",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Opslaan" })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      !canSave && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Plaats eerst turbines om een configuratie op te slaan" })
    ] }) }),
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("output", { className: "flex items-center gap-1.5 text-xs text-primary animate-in fade-in slide-in-from-top-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }),
      feedback
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: configurations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "size-5 text-muted-foreground/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 text-xs text-muted-foreground", children: "Nog geen configuraties — sla je huidige opstelling op of importeer een JSON-bestand" })
    ] }) : configurations.map((config) => {
      const isActive = config.id === activeConfigId;
      const isConfirmingDelete = config.id === confirmDeleteId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "group rounded-lg border p-2.5 text-sm transition-colors",
            isActive ? "border-primary/50 bg-accent/50" : "border-border hover:border-primary/30"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-0.5 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: config.name }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-2.5" }),
                "Actief"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-xs text-muted-foreground", children: [
              config.turbines.length,
              " turbine",
              config.turbines.length !== 1 ? "s" : "",
              config.minimumDistance ? ` · ${config.minimumDistance} m` : "",
              " · ",
              relativeTime(config.timestamp)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => handleLoad(config),
                  size: "sm",
                  variant: isActive ? "secondary" : "default",
                  className: "h-7 flex-1 gap-1.5 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "size-3" }),
                    isActive ? "Opnieuw laden" : "Laden"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => handleExportJson(config),
                  variant: "ghost",
                  size: "sm",
                  className: "size-7 p-0",
                  title: "Exporteren als JSON",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Exporteren" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleDeleteClick(config.id),
                  variant: isConfirmingDelete ? "destructive" : "ghost",
                  size: "sm",
                  className: cn(
                    "h-7 p-0 transition-all",
                    isConfirmingDelete ? "w-auto px-2 text-xs" : "w-7 text-muted-foreground hover:text-destructive"
                  ),
                  title: isConfirmingDelete ? "Klik nogmaals om te verwijderen" : "Verwijderen",
                  children: isConfirmingDelete ? "Zeker?" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Verwijderen" })
                  ] })
                }
              )
            ] })
          ]
        },
        config.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: handleImportJson,
        variant: "outline",
        size: "sm",
        className: "h-7 w-full gap-1.5 text-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-3" }),
          "JSON importeren"
        ]
      }
    )
  ] });
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const distanceZones = [
  { distance: 500, color: "#ef4444", label: "500m", id: "zone500" },
  { distance: 1e3, color: "#f97316", label: "1km", id: "zone1000" },
  { distance: 1500, color: "#eab308", label: "1.5km", id: "zone1500" },
  { distance: 2e3, color: "#84cc16", label: "2km", id: "zone2000" }
];
function getZoneColor(distance) {
  for (const zone of distanceZones) {
    if (distance <= zone.distance) return zone.color;
  }
  return distanceZones[distanceZones.length - 1].color;
}
function AddressDetailSheet() {
  const {
    affectedAddresses,
    isAddressSheetOpen,
    selectedAddress,
    setAddressSheetOpen,
    setSelectedAddress
  } = useAddressStore();
  const hinderDistance = useMapStore((s) => s.hinderDistance);
  const sorted = [...affectedAddresses].sort(
    (a2, b) => a2.distance - b.distance
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: isAddressSheetOpen, onOpenChange: setAddressSheetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-md p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "px-4 pt-4 pb-2 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { children: [
        affectedAddresses.length,
        " getroffen adressen"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { children: [
        "Binnen ",
        hinderDistance,
        "m van geplaatste turbines"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1 px-2 py-1", children: sorted.map((addr) => {
      const isSelected = selectedAddress?.address === addr.address && selectedAddress?.turbineIndex === addr.turbineIndex;
      const color = getZoneColor(addr.distance);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedAddress(addr),
          className: cn(
            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted/50",
            isSelected && "bg-muted"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: addr.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                addr.postcode,
                " ",
                addr.woonplaats
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end shrink-0 gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white",
                  style: { backgroundColor: color },
                  children: [
                    addr.distance,
                    "m"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: addr.turbineName })
            ] })
          ] })
        },
        `${addr.address}-${addr.turbineIndex}`
      );
    }) })
  ] }) });
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = reactExports.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root$4,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Thumb,
          {
            "data-slot": "slider-thumb",
            className: "border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          index2
        ))
      ]
    }
  );
}
const WOZ_API_BASE = "https://api.kadaster.nl/lvwoz/wozwaardeloket-api/v1";
const MAX_RETRIES = 2;
const DEFAULT_RETRY_SECONDS = 5;
function latestWozValue(wozWaarden) {
  let latest = null;
  for (const w of wozWaarden) {
    if (!latest || w.peildatum > latest.peildatum) {
      latest = w;
    }
  }
  if (!latest) return null;
  return { waarde: latest.vastgesteldeWaarde, peildatum: latest.peildatum };
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function fetchWozValue(nummeraanduidingId) {
  const paddedId = nummeraanduidingId.padStart(16, "0");
  const url = `${WOZ_API_BASE}/wozwaarde/nummeraanduiding/${paddedId}`;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url);
      if (response.status === 429) {
        const reset = parseFloat(
          response.headers.get("X-Rate-Limit-Reset") ?? ""
        );
        const waitSeconds = Number.isNaN(reset) || reset <= 0 ? DEFAULT_RETRY_SECONDS : reset;
        await sleep(waitSeconds * 1e3);
        continue;
      }
      if (!response.ok) return null;
      const data = await response.json();
      return latestWozValue(data.wozWaarden ?? []);
    } catch {
      return null;
    }
  }
  return null;
}
async function enrichAddressesWithWoz(addresses, options = {}) {
  const { concurrency = 4, onProgress } = options;
  const results = /* @__PURE__ */ new Map();
  const total = addresses.length;
  let next = 0;
  let done = 0;
  const worker = async () => {
    while (next < total) {
      const addr = addresses[next++];
      const nummeraanduidingId = addr.nummeraanduidingId ?? await lookupNummeraanduidingId(addr.postcode, addr.huisnummer);
      const value = nummeraanduidingId ? await fetchWozValue(nummeraanduidingId) : null;
      results.set(addr.address, value);
      done++;
      onProgress?.(done, total);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(concurrency, total) }, worker)
  );
  return results;
}
function CsvAnalysis() {
  const fileRef = reactExports.useRef(null);
  const includeWozId = reactExports.useId();
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  const [includeWoz, setIncludeWoz] = reactExports.useState(false);
  const [exportProgress, setExportProgress] = reactExports.useState(null);
  const {
    uploadedAddresses,
    affectedAddresses,
    isLoading,
    setUploadedAddresses,
    setAffectedAddresses,
    setAddressSheetOpen
  } = useAddressStore();
  const turbines = useTurbineStore((s) => s.turbines);
  const { hinderDistance, setHinderDistance } = useMapStore();
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const addresses = parseAddressCsv(event.target?.result);
        setUploadedAddresses(addresses);
        const ligplaatsen = addresses.filter(
          (a2) => a2.objecttype === "ligplaats"
        ).length;
        const standplaatsen = addresses.filter(
          (a2) => a2.objecttype === "standplaats"
        ).length;
        let summary = `${addresses.length} adressen succesvol geladen!`;
        if (ligplaatsen > 0 || standplaatsen > 0) {
          const parts = [];
          if (ligplaatsen > 0)
            parts.push(`${ligplaatsen} ligplaatsen (woonboten)`);
          if (standplaatsen > 0) parts.push(`${standplaatsen} standplaatsen`);
          summary += `
Waarvan ${parts.join(", ")}.`;
        }
        alert(summary);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Fout bij CSV parsing");
      }
    };
    reader.readAsText(file);
  };
  const handleAnalyze = () => {
    if (turbines.length === 0) {
      alert("Plaats eerst turbines voordat je een analyse uitvoert");
      return;
    }
    if (uploadedAddresses.length === 0) {
      alert(
        "Upload eerst een CSV bestand met adressen.\n\nGebruik het bestand gegenereerd door adressen_ophalen.py\nof een CSV met kolommen: adres,postcode,...,lat,lng"
      );
      return;
    }
    setAnalyzing(true);
    try {
      const allAffected = [];
      const seen = /* @__PURE__ */ new Set();
      for (let i = 0; i < turbines.length; i++) {
        const turbine = turbines[i];
        for (const addr of uploadedAddresses) {
          const distance = calculateDistance(turbine.latlng, {
            lat: addr.lat,
            lng: addr.lng
          });
          if (distance <= hinderDistance && !seen.has(addr.address)) {
            seen.add(addr.address);
            allAffected.push({
              ...addr,
              distance: Math.round(distance),
              turbineIndex: i,
              turbineName: `Turbine ${i + 1}`
            });
          }
        }
      }
      setAffectedAddresses(allAffected);
    } finally {
      setAnalyzing(false);
    }
  };
  const handleExport = async () => {
    if (affectedAddresses.length === 0) {
      alert("Geen adressen om te exporteren. Voer eerst een analyse uit.");
      return;
    }
    const sorted = [...affectedAddresses].sort(
      (a22, b) => a22.distance - b.distance
    );
    let wozValues = /* @__PURE__ */ new Map();
    if (includeWoz) {
      setExporting(true);
      setExportProgress({ done: 0, total: sorted.length });
      try {
        wozValues = await enrichAddressesWithWoz(sorted, {
          onProgress: (done, total) => setExportProgress({ done, total })
        });
      } catch {
        if (!confirm(
          "WOZ-waarden konden niet worden opgehaald. Exporteren zonder WOZ-kolom?"
        )) {
          setExporting(false);
          setExportProgress(null);
          return;
        }
      } finally {
        setExporting(false);
        setExportProgress(null);
      }
    }
    const wozColumns = includeWoz ? ",WOZ-waarde (EUR),WOZ-peildatum" : "";
    let csv = `Adres,Postcode,Huisnummer,Woonplaats,Afstand (m),Dichtstbijzijnde Turbine,Latitude,Longitude${wozColumns}
`;
    for (const addr of sorted) {
      csv += `"${addr.address}","${addr.postcode}","${addr.huisnummer}","${addr.woonplaats}",${addr.distance},"${addr.turbineName}",${addr.lat},${addr.lng}`;
      if (includeWoz) {
        const woz = wozValues.get(addr.address);
        csv += `,${woz?.waarde ?? ""},"${woz?.peildatum ?? ""}"`;
      }
      csv += "\n";
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = `windturbine-adressen-binnen-${hinderDistance}m.csv`;
    document.body.appendChild(a2);
    a2.click();
    document.body.removeChild(a2);
    URL.revokeObjectURL(url);
  };
  const turbineStats = turbines.map((t, i) => ({
    index: i,
    typeIndex: t.typeIndex,
    count: affectedAddresses.filter((a2) => a2.turbineIndex === i).length
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3 border-b border-border space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold block", children: "Adressenbestand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: ".csv",
          onChange: handleFileUpload,
          className: "sr-only"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "h-7 w-full text-xs",
          onClick: () => fileRef.current?.click(),
          children: uploadedAddresses.length > 0 ? "CSV vervangen" : "CSV uploaden"
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary", children: "Adressen laden..." }),
      !isLoading && uploadedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary", children: [
        uploadedAddresses.length,
        " adressen geladen"
      ] }),
      !isLoading && uploadedAddresses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground break-words", children: "CSV van adressen_ophalen.py of met kolommen adres, postcode, lat, lng" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Afstand voor analyse:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 250,
          max: 2e3,
          step: 50,
          value: [hinderDistance],
          onValueChange: ([v]) => setHinderDistance(v)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "250m" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          hinderDistance,
          "m"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2000m" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAnalyze, disabled: analyzing, className: "w-full", children: analyzing ? "Bezig met analyseren..." : "Analyseer woningen" }),
    affectedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm border-t border-border pt-2 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Resultaten:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "Totaal: ",
          affectedAddresses.length,
          " woningen"
        ] }),
        " binnen",
        " ",
        hinderDistance,
        "m"
      ] }),
      turbineStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs space-y-1", children: turbineStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        turbineEmojis[stat.typeIndex],
        " Turbine ",
        stat.index + 1,
        ":",
        " ",
        stat.count,
        " woningen"
      ] }, stat.index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => setAddressSheetOpen(true),
          variant: "outline",
          size: "sm",
          className: "w-full",
          children: "Bekijk alle adressen"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: includeWozId,
            checked: includeWoz,
            disabled: exporting,
            onCheckedChange: (v) => setIncludeWoz(v === true)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: includeWozId, className: "cursor-pointer text-xs", children: "Inclusief WOZ-waarden (langzamer)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleExport,
          disabled: exporting,
          variant: "secondary",
          size: "sm",
          className: "w-full",
          children: exporting && exportProgress ? `WOZ-waarden ophalen... ${exportProgress.done}/${exportProgress.total}` : "Export adressenlijst"
        }
      ),
      exporting && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Dit kan enkele minuten duren bij veel adressen." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddressDetailSheet, {})
  ] });
}
function MinDistControl() {
  const {
    showMinDistance,
    minimumTurbineDistance,
    setShowMinDistance,
    setMinimumTurbineDistance
  } = useMapStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: "show-min-dist",
          checked: showMinDistance,
          onCheckedChange: (v) => setShowMinDistance(v === true)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "show-min-dist", className: "cursor-pointer text-sm", children: "Toon minimumafstand" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Afstand (meters):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 400,
          max: 1500,
          step: 50,
          value: [minimumTurbineDistance],
          onValueChange: ([v]) => setMinimumTurbineDistance(v)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "400m" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          minimumTurbineDistance,
          "m"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1500m" })
      ] })
    ] })
  ] });
}
function TurbineList() {
  const { turbines, removeTurbine } = useTurbineStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: turbines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Nog geen turbines geplaatst" }) : turbines.map((turbine, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex justify-between items-start text-sm border-b border-border pb-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            turbineEmojis[turbine.typeIndex],
            " Turbine ",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: turbine.type.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-destructive hover:text-destructive h-auto py-0.5 px-1 text-xs",
            onClick: () => removeTurbine(turbine.id),
            children: "Verwijder"
          }
        )
      ]
    },
    turbine.id
  )) });
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" })
    }
  );
}
function TurbinePlacer() {
  const { isAddMode, selectedTypeIndex, setSelectedTypeIndex, toggleAddMode } = useTurbineStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: String(selectedTypeIndex),
        onValueChange: (v) => setSelectedTypeIndex(Number(v)),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: turbineTypes.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(i), children: [
            t.name,
            " - ",
            ["🟢", "🟠", "🔴"][i]
          ] }, i)) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: toggleAddMode,
        variant: isAddMode ? "destructive" : "default",
        className: "w-full",
        children: isAddMode ? "Annuleren" : "Klik op kaart om te plaatsen"
      }
    ),
    isAddMode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Klik op de kaart om een turbine te plaatsen" })
  ] });
}
function ZoneToggles() {
  const { zoneVisibility, toggleZone } = useMapStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: distanceZones.map((zone) => {
    const checked = zoneVisibility[zone.id];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: `zone-${zone.id}`,
          checked,
          onCheckedChange: () => toggleZone(zone.id)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "size-3 rounded-full shrink-0",
          style: { backgroundColor: zone.color, opacity: 0.5 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: `zone-${zone.id}`,
          className: "cursor-pointer text-sm",
          children: zone.label
        }
      )
    ] }, zone.id);
  }) });
}
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleTrigger$1,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleContent$1,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$2,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(
    void 0
  );
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "20rem";
const SIDEBAR_WIDTH_MOBILE = "20rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = reactExports.useState(false);
  const [_open, _setOpen] = reactExports.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = reactExports.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = reactExports.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = reactExports.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: cn("bg-sidebar-border mx-2 w-auto", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function CollapsibleSection({
  label,
  icon: Icon2,
  defaultOpen = true,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { defaultOpen, className: "group/collapsible", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { className: "py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { className: "flex w-full items-center gap-2 rounded-md font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "size-3.5 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { className: "min-w-0 px-2 pt-2 pb-1", children }) })
  ] }) });
}
function AppSidebar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: "h-14 justify-center border-b border-sidebar-border px-4 py-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fan, { className: "size-4.5 animate-[spin_7s_linear_infinite] motion-reduce:animate-none" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-display text-lg font-bold uppercase leading-none tracking-[0.22em] text-foreground", children: "Windy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block truncate text-[11px] leading-tight text-muted-foreground", children: "Windturbine-visualisatie" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { className: "overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { label: "Turbine plaatsen", icon: Plus, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TurbinePlacer, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { label: "Geplaatste turbines", icon: List, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TurbineList, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { label: "Afstandscirkels", icon: CircleDot, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoneToggles, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { label: "Minimumafstand", icon: Ruler, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MinDistControl, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { label: "Zoek adres", icon: Search, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddressSearch, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          label: "Woningen analyse",
          icon: FileSpreadsheet,
          defaultOpen: false,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CsvAnalysis, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          label: "Configuraties",
          icon: Settings,
          defaultOpen: false,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigManager, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarFooter, { className: "gap-2 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PdfExport, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center font-mono text-[10px] tracking-wide text-muted-foreground/70", children: "Kaartdata: PDOK · BAG" })
    ] })
  ] });
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger$1,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2$1,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const useThemeStore = create()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => set((s) => {
        const next = s.theme === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle("dark", next === "dark");
        return { theme: next };
      }),
      setTheme: (theme) => set(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        return { theme };
      })
    }),
    {
      name: "windy-theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle(
            "dark",
            state.theme === "dark"
          );
        }
      }
    }
  )
);
function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "size-8", children: [
      theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Wissel thema" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setTheme("light"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4 mr-2" }),
        "Licht"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setTheme("dark"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4 mr-2" }),
        "Donker"
      ] })
    ] })
  ] });
}
function Stat({
  value,
  unit,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-3 py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-semibold leading-tight tabular-nums text-foreground", children: [
      value,
      unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-[10px] font-normal text-muted-foreground", children: unit })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.1em] text-muted-foreground", children: label })
  ] });
}
function Header() {
  const turbines = useTurbineStore((s) => s.turbines);
  const isAddMode = useTurbineStore((s) => s.isAddMode);
  const affectedAddresses = useAddressStore((s) => s.affectedAddresses);
  const hinderDistance = useMapStore((s) => s.hinderDistance);
  const totalPower = turbines.reduce((sum, t) => sum + t.type.power, 0);
  const powerLabel = totalPower % 1 === 0 ? String(totalPower) : totalPower.toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, { className: "-ml-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-px shrink-0 bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate font-display text-sm font-semibold uppercase tracking-[0.1em]", children: "Windturbine Visualisatie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px] text-muted-foreground", children: "Hoeker- en Garstenpolder" })
    ] }),
    isAddMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden shrink-0 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 animate-pulse rounded-full bg-primary" }),
      "Klik op de kaart om te plaatsen"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden shrink-0 items-stretch divide-x divide-border rounded-lg border border-border bg-card shadow-xs sm:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: turbines.length, label: "turbines" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: powerLabel, unit: "MW", label: "vermogen" }),
      affectedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Stat,
        {
          value: affectedAddresses.length,
          label: `< ${hinderDistance} m`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/70 via-primary/20 to-transparent" })
  ] });
}
const MapView = reactExports.lazy(() => import("./MapView--pwxfuhB.mjs").then((m) => ({
  default: m.MapView
})));
function App() {
  const loadDefaultAddresses = useAddressStore((s) => s.loadDefaultAddresses);
  reactExports.useEffect(() => {
    loadDefaultAddresses();
  }, [loadDefaultAddresses]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarInset, { className: "flex flex-col h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Kaart laden..." }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapView, {}) }) })
    ] })
  ] });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: App
}, Symbol.toStringTag, { value: "Module" }));
export {
  useMapStore as a,
  useTurbineStore as b,
  useThemeStore as c,
  distanceZones as d,
  turbineTypes as e,
  findConflicts as f,
  index as i,
  turbineColors as t,
  useAddressStore as u
};
