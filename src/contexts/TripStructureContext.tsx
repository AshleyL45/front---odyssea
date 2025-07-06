import {createContext, FC, JSX, useContext, useEffect, useState} from "react";
import {Activity, CitySelection, PersonalizeTrip} from "../@types/PersonalizeTrip";
import {useAuth} from "./AuthContext";

interface StructuredDataContextProps {
    structuredData: PersonalizeTrip;
}

const StructuredDataContext = createContext<StructuredDataContextProps | null>(null);

const loadAndStructureData = (userId: number): PersonalizeTrip => {
    const rawQuestionnaire = localStorage.getItem("questionnaireData");
    const rawSelectedCountries = localStorage.getItem("selectedCountries");

    if (!rawQuestionnaire || !rawSelectedCountries) {
        return {
            userId,
            duration: 0,
            startDate: '',
            departureCity: '',
            countrySelection: [],
            numberOfAdults: 0,
            numberOfKids: 0,
            hotelStanding: 0,
            options: [],
            itineraryName: ""
        };
    }

    const questionnaireData = JSON.parse(rawQuestionnaire);
    const selectedCountries = JSON.parse(rawSelectedCountries);

    const countrySelection = selectedCountries.map((country: any) => {
        const rawCities = localStorage.getItem(`selectedCities_${country.id}`);
        const citySelection = rawCities ? JSON.parse(rawCities).map((city: any) => {
            const rawActivities = localStorage.getItem(`selectedActivities_${city.id}`);
            const activities = rawActivities ? JSON.parse(rawActivities) : [];

            return {id: city.id, cityName: city.name, activities};
        }) : [];

        return {countryName: country.name, citySelection};
    });

    return {
        userId: questionnaireData.userId,
        duration: questionnaireData.duration,
        startDate: questionnaireData.startDate,
        departureCity: questionnaireData.departureCity,
        countrySelection,
        numberOfAdults: questionnaireData.numberOfAdults,
        numberOfKids: questionnaireData.numberOfKids,
        hotelStanding: questionnaireData.hotelStanding,
        options: [], // À compléter si nécessaire
        itineraryName: questionnaireData.itineraryName
    };
};

export const StructuredDataProvider: FC<{ children: JSX.Element }> = ({children}) => {
    const {userId} = useAuth();
    const [structuredData, setStructuredData] = useState<PersonalizeTrip>(() => loadAndStructureData(userId));

    return (
        <StructuredDataContext.Provider value={{structuredData}}>
            {children}
        </StructuredDataContext.Provider>
    );
};

// Hook pour la structuration des données
export const useStructuredData = () => {
    const context = useContext(StructuredDataContext);
    if (!context) {
        throw new Error("useStructuredData must be used within a StructuredDataProvider");
    }
    return context;
};