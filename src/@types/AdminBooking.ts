type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export default interface AdminBooking {
    bookingId: number;
    userFirstName: string;
    userLastName: string;
    price: number;
    purchaseDate: string;
    status: BookingStatus;
}
