export interface City {
    name: string;
    latitude: number;
    longitude: number;
}

export interface MarkerData {
    dayNumber: number;
    city: City;
}