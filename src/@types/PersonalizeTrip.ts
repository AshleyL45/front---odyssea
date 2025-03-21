export interface PersonalizeTrip {
    userId: number;
    startDate: string;
    departureCity: string;
    countrySelection: CountrySelection[];
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
