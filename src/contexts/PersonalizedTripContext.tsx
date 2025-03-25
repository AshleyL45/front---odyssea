import {createContext, FC, JSX, useContext, useEffect, useState} from "react";
import {Activity, CitySelection, PersonalizeTrip} from "../@types/PersonalizeTrip";
import {useAuth} from "./AuthContext";

interface PersonalizedTripProps {
    questionnaireAnswers: PersonalizeTrip;
    updateResponse: (field: string, value: any) => void;
    addCityToCountry: (countryName: string, city: CitySelection) => void; // Ajouter une ville à un pays
    addActivityToCity: (countryName: string, cityName: string, activity: Activity) => void;
}

const PersonalizedTripContext = createContext<PersonalizedTripProps | null>(null);

export const PersonalizedTripContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const {userId} = useAuth();

    const [questionnaireAnswers, setQuestionnaireAnswers] = useState(() => {
        const savedData  = localStorage.getItem("questionnaireData");
        return savedData ? JSON.parse(savedData) : {
            userId: userId,
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


    const addCityToCountry = (countryName: string, city: CitySelection) => {
        setQuestionnaireAnswers((prevState: PersonalizeTrip) => {
            const updatedCountrySelection = prevState.countrySelection.map((country) => {
                if (country.countryName === countryName) {
                    return {
                        ...country,
                        citySelection: [...country.citySelection, city] // Ajoute la nouvelle ville
                    };
                }
                return country;
            });

            return {
                ...prevState,
                countrySelection: updatedCountrySelection
            };
        });
    };


    // Ajoute une activité à une ville
    const addActivityToCity = (countryName: string, cityName: string, activity: Activity) => {
        setQuestionnaireAnswers((prevState: PersonalizeTrip) => {
            const updatedCountrySelection = prevState.countrySelection.map((country) => {
                if (country.countryName === countryName) {
                    const updatedCitySelection = country.citySelection.map((city:any) => {
                        if (city.cityName === cityName) {
                            return {
                                ...city,
                                activities: [...city.activities, activity] // Ajoute la nouvelle activité
                            };
                        }
                        return city;
                    });

                    return {
                        ...country,
                        citySelection: updatedCitySelection
                    };
                }
                return country;
            });

            return {
                ...prevState,
                countrySelection: updatedCountrySelection
            };
        });
    };






    return (
        <PersonalizedTripContext.Provider value={{questionnaireAnswers, updateResponse, addCityToCountry,
            addActivityToCity}}>
            {children}
        </PersonalizedTripContext.Provider>
    )
}

//Hook personnalisÃ©
export const usePersonalizedTrip = () => {
    const context = useContext(PersonalizedTripContext);
    if (!context) {
        throw new Error("usePersonalizedTrip must be used within a ReservationProvider");
    }
    return context;
}