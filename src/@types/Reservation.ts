export interface Reservation {
    userId: number;
    itineraryId: number;
    status: string;
    departureDate: string;
    returnDate: string;
    numberOfAdults: number
    numberOfKids: number;
    optionIds: number[] | null;
}