import {Option} from "./Option"; // à adapter selon ton projet
import {ItineraryDay} from "./PersonalizeTrip";

export interface AdminUserItineraryDetails {
    id: number;
    userFirstName: string;
    userLastName: string;
    startDate: string;
    endDate: string;
    totalDuration: number;
    departureCity: string;
    startingPrice: number;
    itineraryName: string;
    numberOfAdults: number;
    numberOfKids: number;
    itineraryDays: ItineraryDay[];
    options: Option[];
    bookingDate: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
}
