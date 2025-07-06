import {Option} from "./Option";
import {Reservation2} from "./Reservation2";

export interface AdminBookingDetails {
    userFirstName: string;
    userLastName: string;
    itineraryName: string;
    itineraryPrice: number;
    booking: Reservation2;
    options: Option[];
}
