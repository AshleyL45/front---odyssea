export interface ItineraryDetailsResponse {
    id: number;
    name: string;
    description: string;
    shortDescription: string;
    stock: number;
    price: number;
    totalDuration: number;
    themeName: string;
    days: Day[];
}

export interface Day {
    cityName: string;
    countryName: string;
    hotelName: string;
    hotelDescription: string;
    activityName: string;
    activityDescription: string;
    descriptionPerDay: string;
    dayNumber: number;
}