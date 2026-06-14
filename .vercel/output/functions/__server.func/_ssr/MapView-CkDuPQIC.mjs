import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { L } from "../_libs/leaflet.mjs";
import { b as useTurbineStore, c as useThemeStore, a as useMapStore, d as distanceZones, f as findConflicts, u as useAddressStore, t as turbineColors, e as turbineTypes } from "./index-CianWrvA.mjs";
import { M as MapContainer, T as TileLayer, W as WMSTileLayer, u as useMapEvents, a as useMap, b as Marker, P as Popup, C as Circle, c as CircleMarker } from "../_libs/react-leaflet.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/papaparse.mjs";
import "stream";
import "../_chunks/_libs/@hookform/resolvers.mjs";
import "../_libs/react-hook-form.mjs";
import "../_libs/zod.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_chunks/_libs/@radix-ui/react-tooltip.mjs";
import "../_chunks/_libs/@radix-ui/primitive.mjs";
import "../_chunks/_libs/@radix-ui/react-compose-refs.mjs";
import "../_chunks/_libs/@radix-ui/react-context.mjs";
import "../_chunks/_libs/@radix-ui/react-dismissable-layer.mjs";
import "../_chunks/_libs/@radix-ui/react-primitive.mjs";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "../_chunks/_libs/@radix-ui/react-slot.mjs";
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
import "../_chunks/_libs/@radix-ui/react-dialog.mjs";
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
import "../_chunks/_libs/@radix-ui/react-collapsible.mjs";
import "../_chunks/_libs/@radix-ui/react-select.mjs";
import "../_chunks/_libs/@radix-ui/number.mjs";
import "../_chunks/_libs/@radix-ui/react-collection.mjs";
import "../_chunks/_libs/@radix-ui/react-direction.mjs";
import "../_chunks/_libs/@radix-ui/react-use-previous.mjs";
import "../_chunks/_libs/@radix-ui/react-separator.mjs";
import "../_chunks/_libs/@radix-ui/react-checkbox.mjs";
import "../_chunks/_libs/@radix-ui/react-label.mjs";
import "../_chunks/_libs/@radix-ui/react-slider.mjs";
import "../_chunks/_libs/@radix-ui/react-dropdown-menu.mjs";
import "../_chunks/_libs/@radix-ui/react-menu.mjs";
import "../_chunks/_libs/@radix-ui/react-roving-focus.mjs";
import "../_chunks/_libs/@react-leaflet/core.mjs";
function AddressMarker() {
  const searchedAddress = useAddressStore((s) => s.searchedAddress);
  if (!searchedAddress) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Marker, { position: [searchedAddress.latlng.lat, searchedAddress.latlng.lng], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: searchedAddress.address }) }) }) });
}
function getZoneColor(distance) {
  for (const zone of distanceZones) {
    if (distance <= zone.distance) return zone.color;
  }
  return distanceZones[distanceZones.length - 1].color;
}
function AffectedAddressMarkers() {
  const affectedAddresses = useAddressStore((s) => s.affectedAddresses);
  const selectedAddress = useAddressStore((s) => s.selectedAddress);
  const setSelectedAddress = useAddressStore((s) => s.setSelectedAddress);
  if (affectedAddresses.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: affectedAddresses.map((addr) => {
    const isSelected = selectedAddress?.address === addr.address && selectedAddress?.turbineIndex === addr.turbineIndex;
    const color = getZoneColor(addr.distance);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CircleMarker,
      {
        center: [addr.lat, addr.lng],
        radius: isSelected ? 8 : 5,
        pathOptions: {
          color: isSelected ? "#ffffff" : color,
          fillColor: color,
          fillOpacity: isSelected ? 1 : 0.7,
          weight: isSelected ? 3 : 1.5
        },
        eventHandlers: {
          click: () => setSelectedAddress(addr)
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: addr.address }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            addr.postcode,
            " ",
            addr.woonplaats
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block w-2 h-2 rounded-full mr-1",
                style: { backgroundColor: color }
              }
            ),
            addr.distance,
            "m — ",
            addr.turbineName
          ] })
        ] }) })
      },
      `${addr.address}-${addr.turbineIndex}`
    );
  }) });
}
function DistanceZones({ turbine }) {
  const zoneVisibility = useMapStore((s) => s.zoneVisibility);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: distanceZones.map((zone) => {
    const visible = zoneVisibility[zone.id];
    if (!visible) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Circle,
      {
        center: [turbine.latlng.lat, turbine.latlng.lng],
        radius: zone.distance,
        pathOptions: {
          color: zone.color,
          fillColor: zone.color,
          fillOpacity: 0.1,
          weight: 2
        }
      },
      `${turbine.id}-${zone.id}`
    );
  }) });
}
function MinDistCircle({ turbine }) {
  const showMinDistance = useMapStore((s) => s.showMinDistance);
  const minimumTurbineDistance = useMapStore((s) => s.minimumTurbineDistance);
  const turbines = useTurbineStore((s) => s.turbines);
  const conflicting = reactExports.useMemo(
    () => findConflicts(turbines, minimumTurbineDistance),
    [turbines, minimumTurbineDistance]
  );
  if (!showMinDistance) return null;
  const hasConflict = conflicting.has(turbine.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Circle,
    {
      center: [turbine.latlng.lat, turbine.latlng.lng],
      radius: minimumTurbineDistance,
      pathOptions: {
        color: hasConflict ? "#dc2626" : "#8b5cf6",
        fillColor: hasConflict ? "#dc2626" : "#8b5cf6",
        fillOpacity: hasConflict ? 0.25 : 0.15,
        weight: 2,
        dashArray: "5, 5"
      }
    }
  );
}
function createTurbineIcon(typeIndex) {
  const color = turbineColors[typeIndex];
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <circle cx="12" cy="12" r="11" fill="${color.fill}" opacity="0.9"/>
      <path d="M12 2 L12 22 M12 12 L2 7 M12 12 L22 7 M12 12 L17 22"
            stroke="white" stroke-width="1.5" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
}
function TurbineMarker({ turbine }) {
  const moveTurbine = useTurbineStore((s) => s.moveTurbine);
  const icon = reactExports.useMemo(
    () => createTurbineIcon(turbine.typeIndex),
    [turbine.typeIndex]
  );
  const tipHeight = turbine.type.hubHeight + turbine.type.rotorDiameter / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Marker,
    {
      position: [turbine.latlng.lat, turbine.latlng.lng],
      icon,
      draggable: true,
      eventHandlers: {
        drag(e) {
          const pos = e.target.getLatLng();
          moveTurbine(turbine.id, { lat: pos.lat, lng: pos.lng });
        },
        dragend(e) {
          const pos = e.target.getLatLng();
          moveTurbine(turbine.id, { lat: pos.lat, lng: pos.lng });
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: turbine.type.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Ashoogte: ",
          turbine.type.hubHeight,
          "m"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Rotordiameter: ",
          turbine.type.rotorDiameter,
          "m"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Vermogen: ",
          turbine.type.power,
          " MW"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
          "Tiphoogte: ",
          tipHeight,
          "m"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 mt-2", children: "Sleep de turbine om te verplaatsen" })
      ] }) })
    }
  );
}
const TILE_URLS = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
};
function MapClickHandler() {
  const { isAddMode, selectedTypeIndex, addTurbine } = useTurbineStore();
  useMapEvents({
    click(e) {
      if (isAddMode) {
        const type = turbineTypes[selectedTypeIndex];
        addTurbine(
          { lat: e.latlng.lat, lng: e.latlng.lng },
          type,
          selectedTypeIndex
        );
      }
    }
  });
  return null;
}
function CursorManager() {
  const isAddMode = useTurbineStore((s) => s.isAddMode);
  const map = useMapEvents({});
  if (map) {
    map.getContainer().style.cursor = isAddMode ? "crosshair" : "";
  }
  return null;
}
const PARCEL_MIN_ZOOM = 16;
const esc = (v) => String(v ?? "").replace(
  /[&<>"]/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]
);
async function fetchParcelInfo(map, latlng) {
  const size = map.getSize();
  const point = map.latLngToContainerPoint(latlng);
  const bounds = map.getBounds();
  const crs = map.options.crs ?? L.CRS.EPSG3857;
  const sw = crs.project(bounds.getSouthWest());
  const ne = crs.project(bounds.getNorthEast());
  const params = new URLSearchParams({
    service: "WMS",
    version: "1.3.0",
    request: "GetFeatureInfo",
    layers: "Perceel",
    query_layers: "Perceel",
    crs: "EPSG:3857",
    // WMS 1.3.0 EPSG:3857 axis order is (east, north) -> minx,miny,maxx,maxy.
    bbox: `${sw.x},${sw.y},${ne.x},${ne.y}`,
    width: String(size.x),
    height: String(size.y),
    i: String(Math.round(point.x)),
    j: String(Math.round(point.y)),
    info_format: "application/json",
    feature_count: "1"
  });
  const res = await fetch(
    `https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?${params}`
  );
  if (!res.ok) throw new Error(`WMS ${res.status}`);
  const json = await res.json();
  return json.features?.[0]?.properties ?? null;
}
function renderParcelHtml(p) {
  const aanduiding = [p.kadastraleGemeenteWaarde, p.sectie, p.perceelnummer].filter((v) => v != null && v !== "").join(" ") || "Onbekend perceel";
  const area = p.kadastraleGrootteWaarde != null ? `${Number(p.kadastraleGrootteWaarde).toLocaleString("nl-NL")} m²` : "–";
  return `<div style="font:13px/1.5 system-ui,sans-serif">
	<strong>${esc(aanduiding)}</strong>
	<table style="margin-top:4px;border-collapse:collapse">
		<tr><td style="padding-right:8px;opacity:.7">Perceelnummer</td><td>${esc(p.perceelnummer)}</td></tr>
		<tr><td style="padding-right:8px;opacity:.7">Sectie</td><td>${esc(p.sectie)}</td></tr>
		<tr><td style="padding-right:8px;opacity:.7">Gemeente</td><td>${esc(p.kadastraleGemeenteWaarde)}</td></tr>
		<tr><td style="padding-right:8px;opacity:.7">Oppervlakte</td><td>${esc(area)}</td></tr>
	</table>
</div>`;
}
function ParcelInfo() {
  const map = useMap();
  useMapEvents({
    async click(e) {
      if (useTurbineStore.getState().isAddMode) return;
      if (map.getZoom() < PARCEL_MIN_ZOOM) {
        L.popup({ maxWidth: 260 }).setLatLng(e.latlng).setContent("Zoom in further to inspect a parcel.").openOn(map);
        return;
      }
      const popup = L.popup({ maxWidth: 260 }).setLatLng(e.latlng).setContent("Loading parcel…").openOn(map);
      try {
        const props = await fetchParcelInfo(map, e.latlng);
        popup.setContent(
          props ? renderParcelHtml(props) : "No parcel found here."
        );
      } catch {
        popup.setContent("Could not load parcel info.");
      }
    }
  });
  return null;
}
function MapFlyTo() {
  const map = useMap();
  const selectedAddress = useAddressStore((s) => s.selectedAddress);
  const prevRef = reactExports.useRef(selectedAddress);
  reactExports.useEffect(() => {
    if (selectedAddress && selectedAddress !== prevRef.current) {
      map.flyTo([selectedAddress.lat, selectedAddress.lng], 16, {
        duration: 1
      });
    }
    prevRef.current = selectedAddress;
  }, [selectedAddress, map]);
  return null;
}
function MapView() {
  const turbines = useTurbineStore((s) => s.turbines);
  const theme = useThemeStore((s) => s.theme);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MapContainer,
    {
      center: [52.235, 5.05],
      zoom: 12,
      className: "h-full w-full",
      preferCanvas: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TileLayer,
          {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
            url: TILE_URLS[theme]
          },
          theme
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WMSTileLayer,
          {
            url: "https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0",
            layers: "Kadastralekaart",
            format: "image/png",
            transparent: true,
            version: "1.3.0",
            crossOrigin: true,
            zIndex: 10,
            attribution: 'Kadaster / <a href="https://www.pdok.nl">PDOK</a>'
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapClickHandler, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParcelInfo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CursorManager, {}),
        turbines.map((turbine) => /* @__PURE__ */ jsxRuntimeExports.jsx(TurbineMarker, { turbine }, turbine.id)),
        turbines.map((turbine) => /* @__PURE__ */ jsxRuntimeExports.jsx(DistanceZones, { turbine }, `zones-${turbine.id}`)),
        turbines.map((turbine) => /* @__PURE__ */ jsxRuntimeExports.jsx(MinDistCircle, { turbine }, `min-${turbine.id}`)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AffectedAddressMarkers, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AddressMarker, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapFlyTo, {})
      ]
    }
  );
}
export {
  MapView
};
