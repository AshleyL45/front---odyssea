import {createContext, FC, JSX, useContext, useState} from "react";
import {Reservation} from "../@types/Reservation";

interface ReservationProps {
    questionnaireAnswers: Reservation;
    updateResponse: (field: string, value: any) => void;
}

const ReservationContext = createContext<ReservationProps | null>(null);

export const ReservationContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {

    const [questionnaireAnswers, setQuestionnaireAnswers] = useState(() => {
        const savedData = localStorage.getItem("questionnaireData");
        return savedData ? JSON.parse(savedData) : {
            userId: 0,
            itineraryId: 0,
            status: '',
            departureDate: '',
            returnDate: '',
            numberOfAdults: 0,
            numberOfKids: 0,
            optionIds: []
        };
    });

    const updateResponse = (field : string, value : any) => {
        const newResponses = {...questionnaireAnswers, [field]: value};
        setQuestionnaireAnswers(newResponses);
        localStorage.setItem("questionnaireData", JSON.stringify(newResponses));
    };

    return (
        <ReservationContext.Provider value={{questionnaireAnswers, updateResponse}}>
            {children}
        </ReservationContext.Provider>
    )
}

//Hook personnalisé
export const useReservation = () => {
    const context = useContext(ReservationContext);
    if(!context){
        throw new Error("useReservation must be used within a ReservationProvider");
    }
    return context;
}