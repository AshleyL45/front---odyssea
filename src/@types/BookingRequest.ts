export interface BookingRequest {
    itineraryId: number;
    departureDate: string;
    returnDate: string;
    numberOfAdults: number;
    numberOfKids: number;
}
