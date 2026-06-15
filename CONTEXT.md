# Windy — Windpark-analyse

A tool for placing wind turbines on a Dutch map and analysing their impact:
distance zones, affected dwellings + WOZ values, cadastral parcels, and a
generated **Windpark-analyse** report. One privileged operator (the **Admin**)
curates shared turbine layouts and landowner data; everyone else uses the tool
anonymously.

## Language

**Admin**:
A Member whose email is in the bootstrap allowlist, or who has been granted the
admin role by an existing Admin. Unlocks: publishing shared Presets, viewing
landowner overlays on the map, generating exports that include owner data, and
approving Admin requests. The admin entry point is unadvertised (hidden from
Visitors), but admin powers are enforced server-side regardless of who finds it.

**Member**:
A person signed in with Google who is not (yet) an Admin. Has the same
capabilities as a Visitor, plus a stable identity and the ability to submit an
Admin request.

**Admin request**:
A Member's pending request to be granted the admin role, approved (or denied) by
an existing Admin.

**Visitor**:
An anonymous, unauthenticated person using the app. Can place turbines, load
published Presets, and generate exports _without_ owner data.
_Avoid_: User (ambiguous — could mean Visitor or Member).

**Preset**:
A turbine layout published by the Admin for Visitors to load. Distinct from a
Configuration, which is a layout saved privately in one browser.
_Avoid_: using "Configuration" and "Preset" interchangeably.

**Configuration**:
A turbine layout (turbines + minimum distance) saved locally in a single
browser. Private to that browser. The seed concept a Preset is published from.

**Parcel** (perceel):
A Dutch cadastral parcel, identified by **gemeente + sectie + perceelnummer**.
Geometry and area come from PDOK/Kadaster; the clicked parcel on the map is the
unit joined to owner data.
_Avoid_: plot, lot.

**Owner** (grondeigenaar):
The legal owner of one or more Parcels. Carries personal data (name, address,
birthdate) and is therefore sensitive — see flagged constraint below. An Owner
may have a Partner, and a Parcel's legal Owner may differ from its Erfpachter.

**Partner**:
A person co-listed with an Owner (the `Met` columns: relationship + name,
address, birthdate). Surfaced alongside the Owner, not as a separate entity.

**Erfpacht** (leasehold):
A right of use over a Parcel held by someone other than its legal Owner (the
Erfpachter / gebruiker). When present, the report distinguishes the legal Owner
from the Erfpachter, because the user of the land may matter more than the owner
for windpark purposes.

**Naamcode**:
The join key linking a Parcel to its Owner. Present on both the parcel records
and the owner records in the Admin's source data.

## Flagged constraints

- **Owner data is personal data (AVG/GDPR).** Names, home addresses, and
  birthdates of [[Owner]]s are restricted. Only the [[Admin]] may view or export
  it; it must never be served to a [[Visitor]]. This constraint is the entire
  reason the Admin sign-in exists, and is why the gate must be enforced
  server-side — a client-only check would still ship the data to the browser.
