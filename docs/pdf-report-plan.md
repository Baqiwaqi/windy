# Plan — Windpark-analyse PDF report

Goal: replace the current simple PDF export with the multi-page, styled
**Windpark-analyse** report matching `windpark-analyse-3-x-groot02 (4).pdf`.

Status: **plan only — not implemented.** One decision still open (owner/overdraai
data source, see §2).

---

## 1. Target vs. current data

| Report section | Data status |
|---|---|
| Title / "Gegenereerd" / disclaimer | ✅ have |
| **Configuratie** (aantal, type, tiphoogte, rotordiameter, vermogen, min. afstand) | ✅ have (turbineStore + mapStore) |
| **Methode en bronnen** (static text) | ✅ static |
| Map image | ⚠️ captured today, but missing rotor (overdraai) circles + orange parcel highlights |
| **Turbine → Perceel / Eigenaar** | ❌ needs parcel ID + owner |
| **Overdraai per perceel** (m² + % van perceel + total) | ❌ needs parcel polygons + rotor∩parcel area |
| **Betrokken grondeigenaren** (naam, adres, percelen, overdraai) | ❌ needs owner data |
| **Woningwaardedaling per afstandscategorie** | ⚠️ needs band-% model; WOZ + distances exist |
| **Adressenlijst woningen** (adres, afstand, turbine, WOZ, %, waardedaling) | ✅ have |
| **Kanttekeningen** (static text) | ✅ static |

The app today has: turbines (lat/lng + type), uploaded/affected addresses, WOZ
lookup (kadaster API), distances. It has **no** parcel polygons, owner names, or
overdraai calculation. PDOK WMS only gives a point→parcel-ID lookup (no owners).

---

## 2. OPEN DECISION — owner + overdraai data source

Owner names are privacy-restricted BRK data; not openly searchable on the web.
Pick one before the parcel sections can be built:

- **A. User supplies CSV/JSON** (recommended, fastest, no cost).
  Format: `perceel, eigenaar, adres, turbines, overdraai_m2, pct_perceel`.
  We render it directly. Owners + overdraai both come from the file.
- **B. Kadaster BRK Bevragen API** — auto-fetch owners. Needs Kadaster
  contract + credentials + per-lookup cost. Most work.
- **C. Compute overdraai from PDOK geometry, owners blank** — overdraai m²
  computed via rotor-circle ∩ parcel polygon (no cost); Eigenaar/Adres left
  "Onbekend"; "Betrokken grondeigenaren" section omitted or partial.

`pct_perceel` = overdraai_m² / kadastraleGrootte (grootte available from PDOK).

---

## 3. Architecture

- **PDF engine:** keep `jspdf`; add **`jspdf-autotable`** for the styled tables
  (colored header bands green/orange/red, zebra rows, nl-NL formatting). Map
  embedded as image via existing `html2canvas-pro` capture.
- **Report data assembler:** new pure module `src/lib/report.ts` that takes
  stores + parcel data and returns a typed `ReportModel` (header, config rows,
  turbine rows, overdraai rows, owner rows, waardedaling bands, address rows).
  Pure → unit-testable, no DOM.
- **PdfExport.tsx:** becomes a thin renderer: build `ReportModel`, then emit
  sections with autotable. Number/date formatting centralised (nl-NL).

## 4. New data model / config

- `Parcel { perceel, eigenaar, adres, turbines:number[], overdraaiM2, grootteM2, pctPerceel }`
- `Owner { naam, adres, percelen:string[], turbineJa:boolean, overdraaiM2 }` (aggregated from parcels)
- Waardedaling band config (configStore or new `waardedalingStore`):
  default bands `400–500=8%`, `500–600=6%`, `600–700=4%`, `700–800=2%`,
  `waardedaling = WOZ × band%`. **Editable in UI** (default), values match the PDF.

## 5. Computations

- **Overdraai** (if option B/C geometry): for each turbine, circle r =
  `rotorDiameter/2`; intersect with parcel polygons (PDOK BRK WFS / kadastrale
  kaart geometry) using `@turf/turf` `intersect` + `area`; sum m² per parcel;
  total = sum of all. Group turbines touching each parcel.
- **Woningwaardedaling:** bucket affected addresses into 100 m bands; per band
  count woningen, count with WOZ, sum WOZ, `waardedaling = ΣWOZ × band%`; total
  row. Note woningen-zonder-WOZ count (PDF footnote).
- **Adressenlijst:** per address → distance, nearest turbine, WOZ, band %,
  `waardedaling = WOZ × %`. Sorted by distance.

## 6. PDF layout (page-by-page, matches target)

- **Page 1:** header block (title / subtitle / Gegenereerd / disclaimer) →
  Configuratie table → Methode en bronnen paragraph → map image →
  Turbine table (Turbine | Type | Perceel | Eigenaar) → "Overdraai per perceel —
  totaal X m²" heading.
- **Page 2:** Overdraai per perceel table (orange band) → Betrokken
  grondeigenaren table → Woningwaardedaling per afstandscategorie table (red band)
  + footnote.
- **Page 3+:** Adressenlijst woningen table (red band) → Kanttekeningen bullets.
- **Styling:** header bands colored per turbine palette; zebra rows; nl-NL
  numbers (`94.210 m²`, `€ 1.079.000`); auto page-break with repeated headers.

## 7. Map image upgrades (to match the PDF map)

- Draw **overdraaistraal** circles (r = rotorDiameter/2) around each turbine.
- **Highlight affected parcels** (orange fill) — the parcels in the overdraai set.
- Ensure capture extent frames all turbines + zones.

## 8. Steps

1. Add `jspdf-autotable` (+ `@turf/turf` if geometry route).
2. Waardedaling band config store + small UI control.
3. Implement chosen owner/overdraai data source (§2).
4. (B/C) Overdraai geometry computation + tests.
5. `src/lib/report.ts` assembler + unit tests (waardedaling math, bucketing).
6. Rewrite `PdfExport.tsx` to render all sections via autotable.
7. Map overlay additions (rotor circles + parcel highlight) + capture tweak.
8. Verify against target PDF.

## 9. Risks / unknowns

- **Owner data** — legal/source blocker; resolved by §2 decision.
- **PDOK BRK geometry** for overdraai — confirm WFS geometry + grootte available
  per parcel; intersection accuracy at parcel borders.
- **Map capture** — Leaflet tiles + overlays must render fully before capture
  (CORS, tile load) for a clean image.
- Effort: Option A ≈ small/medium (render-only). Option B/C ≈ large (geometry +
  API + map work).
