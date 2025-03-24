export interface PersonalizeTrip {
    userId: number;
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
    itineraryDays: ItineraryDay[];
    options: Option[]; // A importer
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

export interface FlightItineraryDTO {
    id: number;
    oneWay: boolean;
    totalPrice: number;
    currency: string;
    createdAt: string;
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