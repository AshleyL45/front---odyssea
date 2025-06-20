export interface PersonalizeTrip {
    userId: number;
    duration: number;
    startDate: string;
    departureCity: string;
    countrySelection: any[];
    numberOfAdults: number;
    numberOfKids: number;
    hotelStanding: number;
    options: Option[];
    itineraryName: string;
}


export interface CountrySelection {
    id: number;
    countryName: string;
    citySelection: CitySelection[];
}

export interface CitySelection {
    id: number;
    cityName: string;
    activities: Activity[];
}

export interface Activity {
    id: number;
    cityId: number;
    name: string;
    type: string;
    physicalEffort: string;
    duration: number;
    description: string;
    price: number;
}

export interface Option {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
}


export interface PersonalizedTripResponse {
    id: number;
    userId: number;
    startDate: string;
    endDate: string;
    totalDuration: number;
    departureCity: string;
    startingPrice: number;
    itineraryName: string;
    numberOfAdults: number;
    numberOfKids: number;
    status?: string;
    itineraryDays: ItineraryDay[];
    options: Option[];
}

export interface Activity {
    id: number;
    cityId: number;
    name: string;
    type: string;
    physicalEffort: string;
    duration: number;
    description: string;
    price: number;
}

export interface Hotel {
    id: number;
    cityId: number;
    name: string;
    starRating: number;
    description: string;
    price: number;
}

interface FlightItineraryDTO {
    id: number;
    duration: string; // ISO 8601 duration format (e.g., 'PT5H10M')
    segments: FlightSegment[];
}

interface FlightSegment {
    id: string;
    departure: FlightLocation;
    arrival: FlightLocation;
    carrierCode: string;
    aircraft: Aircraft;
    duration: string;
    price: number | null;
    carrierName: string;
    aircraftName: string;
}

interface FlightLocation {
    iataCode: string;
    at: string; // ISO 8601 date-time format (e.g., '2025-04-21T11:30:00')
}

interface Aircraft {
    code: string;
}

export interface ItineraryDay {
    cityName: string;
    countryName: string;
    hotel: Hotel | null;
    activity: Activity | null;
    dayNumber: number;
    date: string;
    dayOff: boolean;
    flightItineraryDTO: FlightItineraryDTO | null;
}

export interface PersTripData {
    numberOfDays: number,
    daysDisplay: string,
    numberOfCountries: number,
    numberOfCities: number
}