import {FC, useEffect, useState} from 'react';
import {get} from "../../API/api";
import "../../App.css"
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {CitySelection} from "../../@types/PersonalizeTrip";

interface Props {
    onFilledChange: (filled: boolean) => void;
}

const CityFromSelecting: FC<Props> = ({onFilledChange}) => {
    const [options, setOptions] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (questionnaireAnswers.departureCity) {
            setSearchQuery(questionnaireAnswers.departureCity);
            onFilledChange(true)
        }
    }, [questionnaireAnswers.departureCity]);

    useEffect(() => {
        if (isInputFocused || searchQuery) {
            const fetchCities = async () => {
                try {
                    const getCities = await get("/cities");
                    if (Array.isArray(getCities.data)) {
                        const filteredOptions = searchQuery
                            ? getCities.data.filter((city: any) =>
                                city.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            : getCities.data;
                        setOptions(filteredOptions);

                        // Vérifie si le texte entré correspond à une ville exacte
                        const isValid = getCities.data.some(
                            (city: any) =>
                                city.name.toLowerCase() === searchQuery.toLowerCase()
                        );
                        onFilledChange(isValid);
                    }
                } catch (e) {
                    console.error("Cannot get cities", e);
                    onFilledChange(false);
                }
            };

            const debounce = setTimeout(() => fetchCities(), 200);
            return () => clearTimeout(debounce);
        }
    }, [searchQuery, isInputFocused]);

    const handleSelect = (city: any) => {
        updateResponse("departureCity", city.name);
        setSearchQuery(city.name);
        setOptions([]); // Ferme la liste après sélection
        setIsInputFocused(false); // Retire le focus
        onFilledChange(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (options.length > 0) {
                setOptions([]);
                setIsInputFocused(false);
            }
        }, 200);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type here"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={handleBlur}
                required
            />
            <div className="searchResults">
                {isInputFocused && options.length > 0 && (
                    <ul className="result-option">
                        {options.map((city) => (
                            <li
                                key={city.name}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(city)}
                            >
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