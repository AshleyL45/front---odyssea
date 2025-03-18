import {createContext, FC, JSX, useContext, useEffect, useState} from "react";
import {Reservation} from "../@types/Reservation";
import {useAuth} from "./AuthContext";

interface ReservationProps {
    questionnaireAnswers: Reservation;
    updateResponse: (field: string, value: any) => void;
}

const ReservationContext = createContext<ReservationProps | null>(null);

export const ReservationContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const {userId} = useAuth();

    const [questionnaireAnswers, setQuestionnaireAnswers] = useState(() => {
        const savedData = localStorage.getItem("questionnaireData");
        return savedData ? JSON.parse(savedData) : {
            userId: userId,
            itineraryId: 0,
            status: "En attente",
            departureDate: '',
            returnDate:'',
            numberOfAdults: 0,
            numberOfKids: 0,
            optionIds: []
        };
    });

    /*console.log(userId)
    console.log(questionnaireAnswers)*/

    const updateResponse = (field: string, value: any) => {
        setQuestionnaireAnswers((prevState:any) => ({
            ...prevState,
            [field]: value
        }));
    };

    useEffect(() => {
        localStorage.setItem("questionnaireData", JSON.stringify(questionnaireAnswers));
    }, [questionnaireAnswers]);

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