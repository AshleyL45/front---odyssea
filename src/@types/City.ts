export interface City {
    id: number;
    countryId: number;
    name: string;
    iataCode: string;
    latitude: number;
    longitude: number;
}

export interface MarkerData {
    dayNumber: number;
    city: City;
}