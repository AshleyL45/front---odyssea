import {FC, useEffect, useState} from 'react';
import {get} from "../API/api";
import "../App.css"
import {usePersonalizedTrip} from "../contexts/PersonalizedTripContext";
import {CitySelection} from "../@types/PersonalizeTrip";

const CityFromSelecting: FC = () => {

    const [options, setOptions] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();

    useEffect(() => {
        if (questionnaireAnswers.departureCity) {
            setSearchQuery(questionnaireAnswers.departureCity);
        }
    }, [questionnaireAnswers.departureCity]);


    useEffect(() => {
        if (searchQuery) {
            const fetchCities = async () => {
                try {
                    const getOptions = await get("/cities");
                    if (Array.isArray(getOptions)) {
                        const filteredOptions = getOptions.filter((city: any) =>
                            city.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setOptions(filteredOptions);
                    }
                } catch (e) {
                    console.error("Cannot get cities", e);
                }
            };

            const debounce = setTimeout(() => fetchCities(), 200);
            return () => clearTimeout(debounce);
        } else {
            setOptions([]);
        }
    }, [searchQuery]);

    const handleSelect = (city: any) => {
        updateResponse("departureCity", city.name);
        setSearchQuery(city.name); // Met à jour l'input avec la ville sélectionnée
        setOptions([]); // Vide immédiatement les options pour cacher la liste
    };

    console.log(questionnaireAnswers.departureCity)


    return (

        <div>
            <input
                type="text"
                placeholder="Type here"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
            />
            <div className="searchResults">
                {options.length > 0 && searchQuery !== questionnaireAnswers.departureCity && (
                    <ul className="result-option">
                        {options.map((city) => (
                            <li key={city.name} onClick={() => handleSelect(city)}>
                                {city.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CityFromSelecting;
