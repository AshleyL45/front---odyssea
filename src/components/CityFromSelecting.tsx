import {FC, useEffect, useState} from 'react';
import {get} from "../API/api";
import "../App.css"

interface City {
    name: string;
}

const CityFromSelecting: FC<{}> = ({}) => {

    const [options, setOptions] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState<string>("");


    const fetchOptions = async (query: string = "") => {
        try {
            const getOptions = await get("/cities");
            if (Array.isArray(getOptions)) {
                // Filtrage des options en fonction du texte entré
                const filteredOptions = getOptions.filter((city: City) =>
                    city.name.toLowerCase().includes(query.toLowerCase())
                );
                setOptions(filteredOptions);
            }
        } catch (e) {
            console.error("Cannot get options", e);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const debounce = setTimeout(() => fetchOptions(searchQuery), 200);
            return () => clearTimeout(debounce);
        } else {
            setOptions([]);
        }
    }, [searchQuery, selected]);

    const handleSelect = (city: string) => {
        setSelected(city);
        setSearchQuery(city); // Met à jour l'input avec la ville sélectionnée
        setOptions([]); // Vide immédiatement les options pour cacher la liste
    };


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
                {options.length > 0 && searchQuery !== selected && (
                    <ul className="result-option">
                        {options.map((option) => (
                            <li key={option.name} onClick={() => handleSelect(option.name)}>{option.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CityFromSelecting;
