import {Option} from "./Option";

type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export interface UserItinerary {
    id: number;
    userFirstName: string;
    userLastName: string;
    startDate: string; // ou Date si tu les parses
    endDate: string;
    totalDuration: number;
    departureCity: string;
    startingPrice: number;
    itineraryName: string;
    numberOfAdults: number;
    numberOfKids: number;
    itineraryDays: any[]; //TODO A modifier
    options: Option[];
    bookingDate: string;
    status: BookingStatus;
}
