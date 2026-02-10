#!/usr/bin/env python3
"""
Script om adressen op te halen via PDOK API en te exporteren naar CSV
voor gebruik in de windturbine visualisatie tool.
"""

import requests
import csv
import re
import time
from typing import List, Dict

# BAG objecttype codes op positie 4-5 van adresseerbaarobject_id
BAG_OBJECTTYPE_CODES = {
    '01': 'verblijfsobject',
    '02': 'ligplaats',
    '03': 'standplaats',
}

def parse_address(doc: Dict) -> Dict | None:
    """
    Parse een PDOK document naar een adres dictionary.
    Bepaalt het BAG objecttype (verblijfsobject/ligplaats/standplaats)
    aan de hand van het adresseerbaarobject_id.
    
    Args:
        doc: PDOK API document
    
    Returns:
        Adres dictionary of None als parsing faalt
    """
    if doc.get('type') != 'adres':
        return None
    
    centroide = doc.get('centroide_ll', '')
    if not centroide:
        return None
    
    match = re.search(r'POINT\(([^ ]+) ([^ ]+)\)', centroide)
    if not match:
        return None
    
    lng = float(match.group(1))
    lat = float(match.group(2))
    
    # Bepaal objecttype uit BAG ID (positie 4-5: 01=verblijfsobject, 02=ligplaats, 03=standplaats)
    bag_id = doc.get('adresseerbaarobject_id', '')
    type_code = bag_id[4:6] if len(bag_id) >= 6 else '01'
    objecttype = BAG_OBJECTTYPE_CODES.get(type_code, 'verblijfsobject')
    
    return {
        'adres': doc.get('weergavenaam', ''),
        'postcode': doc.get('postcode', ''),
        'huisnummer': doc.get('huis_nlt', ''),
        'straat': doc.get('straatnaam', ''),
        'woonplaats': doc.get('woonplaatsnaam', ''),
        'gemeente': doc.get('gemeentenaam', ''),
        'objecttype': objecttype,
        'lat': lat,
        'lng': lng
    }


def fetch_pdok_addresses(url: str, params: dict, fq_filters: list) -> List[Dict]:
    """
    Haal adressen op van PDOK met paginatie.
    
    Args:
        url: PDOK API endpoint URL
        params: Basis query parameters
        fq_filters: Filter query parameters
    
    Returns:
        List van adres dictionaries
    """
    addresses = []
    start = 0
    batch_size = params.get('rows', 100)
    
    while True:
        batch_params = {**params, 'start': start}
        for fq in fq_filters:
            batch_params.setdefault('fq', [])
            if isinstance(batch_params['fq'], str):
                batch_params['fq'] = [batch_params['fq']]
            batch_params['fq'].append(fq)
        
        response = requests.get(url, params=batch_params)
        response.raise_for_status()
        data = response.json()
        
        if 'response' not in data or 'docs' not in data['response']:
            break
        
        docs = data['response']['docs']
        if not docs:
            break
        
        num_found = data['response'].get('numFound', 0)
        batch_num = start // batch_size + 1
        print(f"    Batch {batch_num}: {len(docs)} resultaten (totaal beschikbaar: {num_found})")
        
        for doc in docs:
            address = parse_address(doc)
            if address:
                addresses.append(address)
        
        start += batch_size
        
        if start >= num_found:
            break
        
        time.sleep(0.5)
    
    return addresses


def fetch_addresses_by_postcode(postcodes: List[str]) -> List[Dict]:
    """
    Haalt adressen op voor een lijst van postcodes.
    
    Args:
        postcodes: List van postcodes (bijv. ['1394', '1231'])
    
    Returns:
        List van adres dictionaries
    """
    all_addresses = []
    url = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free"
    
    for postcode in postcodes:
        print(f"Ophalen adressen voor postcode {postcode}...")
        
        params = {
            'q': f'postcode:{postcode}*',
            'rows': 100,
        }
        fq_filters = ['type:adres']
        
        try:
            addresses = fetch_pdok_addresses(url, params, fq_filters)
            all_addresses.extend(addresses)
            ligplaatsen = sum(1 for a in addresses if a['objecttype'] == 'ligplaats')
            standplaatsen = sum(1 for a in addresses if a['objecttype'] == 'standplaats')
            extra = []
            if ligplaatsen:
                extra.append(f"{ligplaatsen} ligplaatsen")
            if standplaatsen:
                extra.append(f"{standplaatsen} standplaatsen")
            extra_str = f" (waarvan {', '.join(extra)})" if extra else ""
            print(f"  {len(addresses)} adressen toegevoegd{extra_str}")
            time.sleep(0.5)
        except requests.exceptions.RequestException as e:
            print(f"  Fout bij ophalen: {e}")
            continue
    
    return all_addresses


def fetch_addresses_by_town(towns: List[str]) -> List[Dict]:
    """
    Haalt adressen op voor een lijst van plaatsnamen.
    
    Args:
        towns: List van plaatsnamen (bijv. ['Vreeland', 'Nigtevecht'])
    
    Returns:
        List van adres dictionaries
    """
    all_addresses = []
    url = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free"
    
    for town in towns:
        print(f"Ophalen adressen in {town}...")
        
        params = {
            'q': '*',
            'rows': 100,
        }
        fq_filters = [
            'type:adres',
            f'woonplaatsnaam:"{town}"',
        ]
        
        try:
            addresses = fetch_pdok_addresses(url, params, fq_filters)
            all_addresses.extend(addresses)
            ligplaatsen = sum(1 for a in addresses if a['objecttype'] == 'ligplaats')
            standplaatsen = sum(1 for a in addresses if a['objecttype'] == 'standplaats')
            extra = []
            if ligplaatsen:
                extra.append(f"{ligplaatsen} ligplaatsen")
            if standplaatsen:
                extra.append(f"{standplaatsen} standplaatsen")
            extra_str = f" (waarvan {', '.join(extra)})" if extra else ""
            print(f"  Totaal {len(addresses)} adressen in {town}{extra_str}")
            time.sleep(0.5)
        except requests.exceptions.RequestException as e:
            print(f"  Fout bij ophalen: {e}")
            continue
    
    return all_addresses


def save_to_csv(addresses: List[Dict], filename: str):
    """
    Sla adressen op in CSV formaat.
    
    Args:
        addresses: List van adres dictionaries
        filename: Naam van het output bestand
    """
    if not addresses:
        print("Geen adressen om op te slaan!")
        return
    
    print(f"\nOpslaan van {len(addresses)} adressen naar {filename}...")
    
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['adres', 'postcode', 'huisnummer', 'straat', 'woonplaats', 'gemeente', 'objecttype', 'lat', 'lng'])
        writer.writeheader()
        writer.writerows(addresses)
    
    print(f"Klaar! CSV bestand opgeslagen als '{filename}'")
    print(f"\nDit bestand kun je nu uploaden in de windturbine visualisatie tool.")


def main():
    print("=" * 60)
    print("PDOK Adressen Ophalen voor Windturbine Visualisatie")
    print("=" * 60)
    print()
    
    # Configuratie voor gebied Hoeker en GarstenPolder
    print("Welke methode wil je gebruiken?")
    print("1. Op basis van postcodes (bijv. 1394, 1231)")
    print("2. Op basis van plaatsnamen (bijv. Nederhorst den Berg, Vreeland)")
    print()
    
    choice = input("Kies 1 of 2: ").strip()
    
    addresses = []
    
    if choice == '1':
        # Postcodes voor het gebied
        print("\nVoer postcodes in gescheiden door komma's")
        print("Voorbeeld: 1394,1231,1393")
        postcodes_input = input("Postcodes: ").strip()
        postcodes = [pc.strip() for pc in postcodes_input.split(',')]
        
        addresses = fetch_addresses_by_postcode(postcodes)
        
    elif choice == '2':
        # Plaatsnamen
        print("\nStandaard plaatsen: Nederhorst den Berg, Vreeland, Nigtevecht, Loenen aan de Vecht, Kortenhoef")
        print("Wil je deze gebruiken? (j/n)")
        use_default = input().strip().lower()
        
        if use_default == 'j':
            towns = ['Nederhorst den Berg', 'Vreeland', 'Nigtevecht', 'Loenen aan de Vecht', 'Kortenhoef']
        else:
            print("\nVoer plaatsnamen in gescheiden door komma's")
            towns_input = input("Plaatsnamen: ").strip()
            towns = [t.strip() for t in towns_input.split(',')]
        
        addresses = fetch_addresses_by_town(towns)
    
    else:
        print("Ongeldige keuze!")
        return
    
    # Verwijder duplicaten (op basis van adres)
    unique_addresses = []
    seen = set()
    for addr in addresses:
        if addr['adres'] not in seen:
            seen.add(addr['adres'])
            unique_addresses.append(addr)
    
    print(f"\n{len(unique_addresses)} unieke adressen gevonden")
    
    # Opslaan
    output_file = 'adressen_windturbine.csv'
    save_to_csv(unique_addresses, output_file)
    
    # Toon statistieken
    print("\n" + "=" * 60)
    print("STATISTIEKEN")
    print("=" * 60)
    
    # Per objecttype
    by_type = {}
    for addr in unique_addresses:
        otype = addr['objecttype']
        by_type[otype] = by_type.get(otype, 0) + 1
    
    print("\nAantal per objecttype:")
    for otype, count in sorted(by_type.items()):
        print(f"  {otype}: {count}")
    
    # Per woonplaats
    by_town = {}
    for addr in unique_addresses:
        town = addr['woonplaats']
        by_town[town] = by_town.get(town, 0) + 1
    
    print("\nAantal adressen per woonplaats:")
    for town, count in sorted(by_town.items()):
        # Toon ook ligplaatsen per woonplaats
        lig = sum(1 for a in unique_addresses if a['woonplaats'] == town and a['objecttype'] == 'ligplaats')
        extra = f" (waarvan {lig} ligplaatsen)" if lig else ""
        print(f"  {town}: {count}{extra}")
    
    print("\n" + "=" * 60)


if __name__ == '__main__':
    main()
