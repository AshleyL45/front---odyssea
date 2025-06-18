import {createContext, FC, JSX, useContext, useEffect, useState} from "react";
import {Booking} from "../@types/Booking";
import {useAuth} from "./AuthContext";
import {Trip} from "../@types/Trip";

interface BookingProps {
    questionnaireAnswers: Booking;
    updateResponse: (field: string, value: any) => void;
    trip: any;
    setTrip: (trip: Trip) => void;
}

const BookingContext = createContext<BookingProps | null>(null);

export const BookingContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const {userId} = useAuth();

    const [questionnaireAnswers, setQuestionnaireAnswers] = useState(() => {
        const savedData = localStorage.getItem("questionnaireData");
        let initial = savedData ? JSON.parse(savedData) : {};

        // fallback en cas de données invalides ou corrompues
        if (!initial.itineraryId || initial.itineraryId <= 0) {
            initial.itineraryId = 1;
        }

        return {
            userId,
            status: "En attente",
            departureDate: '',
            returnDate: '',
            numberOfAdults: 0,
            numberOfKids: 0,
            optionIds: [],
            ...initial, // surcharge avec les données valides
        };
    });


    const updateResponse = (field: string, value: any) => {
        setQuestionnaireAnswers((prevState: any) => ({
            ...prevState,
            [field]: value
        }));
    };

    useEffect(() => {
        localStorage.setItem("questionnaireData", JSON.stringify(questionnaireAnswers));
    }, [questionnaireAnswers]);

    const [trip, setTrip] = useState<any>(null);

    return (
        <BookingContext.Provider value={{questionnaireAnswers, updateResponse, trip, setTrip}}>
            {children}
        </BookingContext.Provider>
    )
}

//Hook personnalisé
export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}