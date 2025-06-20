export interface Reservation2 {
    reservationId: number;
    userId: number;
    itineraryId: number;
    status: string;
    departureDate: string; // `LocalDate` Java → `string` en JSON
    returnDate: string;
    totalPrice: number;     // BigDecimal → number
    purchaseDate: string;
    numberOfAdults: number;
    numberOfKids: number;
    type: string;
}
