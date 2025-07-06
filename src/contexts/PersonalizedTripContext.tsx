import {createContext, FC, JSX, useContext, useEffect, useState} from "react";
import {Activity, CitySelection, PersonalizeTrip} from "../@types/PersonalizeTrip";
import {useAuth} from "./AuthContext";

interface PersonalizedTripProps {
    questionnaireAnswers: PersonalizeTrip;
    updateResponse: (field: string, value: any) => void;
}

const PersonalizedTripContext = createContext<PersonalizedTripProps | null>(null);

export const PersonalizedTripContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {

    const [questionnaireAnswers, setQuestionnaireAnswers] = useState(() => {
        const savedData  = localStorage.getItem("questionnaireData");
        return savedData ? JSON.parse(savedData) : {
            duration: '',
            startDate: '',
            departureCity: '',
            countrySelection: [],
            numberOfAdults: 0,
            numberOfKids: 0,
            hotelStanding: 0,
            options: [],
            itineraryName: ""
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



    return (
        <PersonalizedTripContext.Provider value={{questionnaireAnswers, updateResponse}}>
            {children}
        </PersonalizedTripContext.Provider>
    )
}

//Hook personnalisé
export const usePersonalizedTrip = () => {
    const context = useContext(PersonalizedTripContext);
    if (!context) {
        throw new Error("usePersonalizedTrip must be used within a BookingProvider");
    }
    return context;
}