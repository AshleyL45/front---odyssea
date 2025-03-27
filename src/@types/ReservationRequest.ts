export interface ReservationRequest {
    itineraryId: number;
    departureDate: string;
    returnDate: string;
    numberOfAdults: number;
    numberOfKids: number;
}
