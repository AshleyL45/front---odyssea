import Itinerary from "./Itinerary";
import {Option} from "./Option";

export interface BookingConfirmation {
    id: number;
    itinerary: Itinerary;
    departureDate: Date;
    returnDate: Date;
    status: "CANCELLED" | "PENDING" | "CONFIRMED";
    numberOfAdults: number;
    numberOfKids: number;
    optionList: Option[];
    purchaseDate: Date;
    price: number;
}
