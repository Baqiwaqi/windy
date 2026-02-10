export interface LatLng {
	lat: number;
	lng: number;
}

export interface TurbineType {
	name: string;
	hubHeight: number;
	rotorDiameter: number;
	power: number;
}

export interface Turbine {
	id: number;
	latlng: LatLng;
	typeIndex: number;
	type: TurbineType;
}

export interface DistanceZone {
	distance: number;
	color: string;
	label: string;
	id: string;
}

export interface Address {
	address: string;
	postcode: string;
	huisnummer: string;
	woonplaats: string;
	objecttype: string;
	lat: number;
	lng: number;
}

export interface AffectedAddress extends Address {
	distance: number;
	turbineIndex: number;
	turbineName: string;
}

export interface Configuration {
	id: number;
	name: string;
	timestamp: string;
	turbines: {
		latlng: LatLng;
		typeIndex: number;
		type: TurbineType;
	}[];
	minimumDistance: number;
}
