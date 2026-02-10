/**
 * TypeScript rewrite of adressen_ophalen.py
 * Run with: npx tsx scripts/fetch-addresses.ts
 *
 * Fetches addresses from the PDOK API and exports to CSV.
 */

import * as fs from 'node:fs'
import * as readline from 'node:readline'

const BAG_OBJECTTYPE_CODES: Record<string, string> = {
  '01': 'verblijfsobject',
  '02': 'ligplaats',
  '03': 'standplaats',
}

interface PdokDoc {
  type?: string
  centroide_ll?: string
  weergavenaam?: string
  postcode?: string
  huis_nlt?: string
  straatnaam?: string
  woonplaatsnaam?: string
  gemeentenaam?: string
  adresseerbaarobject_id?: string
}

interface Address {
  adres: string
  postcode: string
  huisnummer: string
  straat: string
  woonplaats: string
  gemeente: string
  objecttype: string
  lat: number
  lng: number
}

function parseAddress(doc: PdokDoc): Address | null {
  if (doc.type !== 'adres') return null

  const centroide = doc.centroide_ll ?? ''
  const match = centroide.match(/POINT\(([^ ]+) ([^ ]+)\)/)
  if (!match) return null

  const lng = parseFloat(match[1])
  const lat = parseFloat(match[2])
  if (isNaN(lat) || isNaN(lng)) return null

  const bagId = doc.adresseerbaarobject_id ?? ''
  const typeCode = bagId.length >= 6 ? bagId.slice(4, 6) : '01'
  const objecttype = BAG_OBJECTTYPE_CODES[typeCode] ?? 'verblijfsobject'

  return {
    adres: doc.weergavenaam ?? '',
    postcode: doc.postcode ?? '',
    huisnummer: doc.huis_nlt ?? '',
    straat: doc.straatnaam ?? '',
    woonplaats: doc.woonplaatsnaam ?? '',
    gemeente: doc.gemeentenaam ?? '',
    objecttype,
    lat,
    lng,
  }
}

async function fetchPdokAddresses(
  url: string,
  baseParams: Record<string, string>,
  fqFilters: string[],
): Promise<Address[]> {
  const addresses: Address[] = []
  let start = 0
  const batchSize = 100

  while (true) {
    const params = new URLSearchParams({
      ...baseParams,
      start: String(start),
      rows: String(batchSize),
    })
    for (const fq of fqFilters) {
      params.append('fq', fq)
    }

    const response = await fetch(`${url}?${params}`)
    const data = await response.json()

    const docs: PdokDoc[] = data?.response?.docs ?? []
    if (docs.length === 0) break

    const numFound: number = data?.response?.numFound ?? 0
    const batchNum = Math.floor(start / batchSize) + 1
    console.log(`    Batch ${batchNum}: ${docs.length} resultaten (totaal: ${numFound})`)

    for (const doc of docs) {
      const addr = parseAddress(doc)
      if (addr) addresses.push(addr)
    }

    start += batchSize
    if (start >= numFound) break

    await new Promise((r) => setTimeout(r, 500))
  }

  return addresses
}

async function fetchByPostcode(postcodes: string[]): Promise<Address[]> {
  const all: Address[] = []
  const url = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free'

  for (const pc of postcodes) {
    console.log(`Ophalen adressen voor postcode ${pc}...`)
    const addresses = await fetchPdokAddresses(url, { q: `postcode:${pc}*` }, ['type:adres'])
    all.push(...addresses)
    console.log(`  ${addresses.length} adressen toegevoegd`)
    await new Promise((r) => setTimeout(r, 500))
  }

  return all
}

async function fetchByTown(towns: string[]): Promise<Address[]> {
  const all: Address[] = []
  const url = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free'

  for (const town of towns) {
    console.log(`Ophalen adressen in ${town}...`)
    const addresses = await fetchPdokAddresses(
      url,
      { q: '*' },
      ['type:adres', `woonplaatsnaam:"${town}"`],
    )
    all.push(...addresses)
    console.log(`  Totaal ${addresses.length} adressen in ${town}`)
    await new Promise((r) => setTimeout(r, 500))
  }

  return all
}

function saveToCsv(addresses: Address[], filename: string) {
  if (addresses.length === 0) {
    console.log('Geen adressen om op te slaan!')
    return
  }

  const header = 'adres,postcode,huisnummer,straat,woonplaats,gemeente,objecttype,lat,lng'
  const rows = addresses.map(
    (a) =>
      `"${a.adres}","${a.postcode}","${a.huisnummer}","${a.straat}","${a.woonplaats}","${a.gemeente}","${a.objecttype}",${a.lat},${a.lng}`,
  )

  fs.writeFileSync(filename, [header, ...rows].join('\n'), 'utf-8')
  console.log(`\nOpgeslagen: ${addresses.length} adressen naar ${filename}`)
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  console.log('='.repeat(60))
  console.log('PDOK Adressen Ophalen voor Windturbine Visualisatie')
  console.log('='.repeat(60))

  console.log('\n1. Op basis van postcodes')
  console.log('2. Op basis van plaatsnamen\n')

  const choice = await prompt('Kies 1 of 2: ')
  let addresses: Address[] = []

  if (choice === '1') {
    const input = await prompt('Postcodes (komma-gescheiden): ')
    const postcodes = input.split(',').map((s) => s.trim())
    addresses = await fetchByPostcode(postcodes)
  } else if (choice === '2') {
    const useDefault = await prompt(
      'Standaard plaatsen gebruiken? (Nederhorst den Berg, Vreeland, Nigtevecht, Loenen aan de Vecht, Kortenhoef) (j/n): ',
    )
    let towns: string[]
    if (useDefault.toLowerCase() === 'j') {
      towns = ['Nederhorst den Berg', 'Vreeland', 'Nigtevecht', 'Loenen aan de Vecht', 'Kortenhoef']
    } else {
      const input = await prompt('Plaatsnamen (komma-gescheiden): ')
      towns = input.split(',').map((s) => s.trim())
    }
    addresses = await fetchByTown(towns)
  } else {
    console.log('Ongeldige keuze!')
    return
  }

  // Deduplicate
  const seen = new Set<string>()
  const unique = addresses.filter((a) => {
    if (seen.has(a.adres)) return false
    seen.add(a.adres)
    return true
  })

  console.log(`\n${unique.length} unieke adressen gevonden`)
  saveToCsv(unique, 'adressen_windturbine.csv')

  // Stats
  const byType: Record<string, number> = {}
  const byTown: Record<string, number> = {}
  for (const a of unique) {
    byType[a.objecttype] = (byType[a.objecttype] ?? 0) + 1
    byTown[a.woonplaats] = (byTown[a.woonplaats] ?? 0) + 1
  }
  console.log('\nPer objecttype:')
  for (const [k, v] of Object.entries(byType).sort()) console.log(`  ${k}: ${v}`)
  console.log('\nPer woonplaats:')
  for (const [k, v] of Object.entries(byTown).sort()) console.log(`  ${k}: ${v}`)
}

main().catch(console.error)
