import {createContext, useContext, useState} from "react";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
type BookingType = "Standard" | "Personalized";

interface BookingDetailsContextType {
    bookingId: number;
    bookingType: BookingType;
    bookingStatus: BookingStatus;
    bookingPrice: number;
    setBookingStatus: (status: BookingStatus) => void;
    setBookingPrice: (price: number) => void;
}

const BookingDetailsContext = createContext<BookingDetailsContextType | undefined>(undefined);

export const useBookingDetails = () => {
    const context = useContext(BookingDetailsContext);
    if (!context) throw new Error("useBookingDetails must be used within BookingDetailsProvider");
    return context;
};

export const BookingDetailsProvider = ({children, initialData}: any) => {
    const [bookingStatus, setBookingStatus] = useState<BookingStatus>(initialData.status);
    const [bookingPrice, setBookingPrice] = useState<number>(initialData.price);

    return (
        <BookingDetailsContext.Provider value={{
            bookingId: initialData.bookingId,
            bookingType: initialData.bookingType,
            bookingStatus,
            bookingPrice,
            setBookingStatus,
            setBookingPrice
        }}>
            {children}
        </BookingDetailsContext.Provider>
    );
};
