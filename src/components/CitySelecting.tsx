import {FC, useEffect, useState} from "react";
import {TextField, Menu, MenuItem} from "@mui/material";
import {get} from "../API/api";
import CloseIcon from "@mui/icons-material/Close";

interface City {
    id: number;
    name: string;
}

interface Country {
    id: number;
    name: string;
}

const CitySelecting: FC<{}> = ({}) => {

    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState<string[]>([]);


    const fetchCity = async (query: string = "") => {
        try {
            const getCities = await get("/cities");
            if (Array.isArray(getCities)) {
                const filteredCities = getCities
                    .filter((city: City) => city.name.toLowerCase().includes(query.toLowerCase()));
                setCities(filteredCities);
            }

        } catch (e) {
            console.error("Cannot get options", e);
        }
    };


    useEffect(() => {
        if (searchQuery) {
            const debounce = setTimeout(() => fetchCity(searchQuery), 200);
            return () => clearTimeout(debounce);
        } else {
            setCities([]);
        }
    }, [searchQuery, selected]);


    const handleSelect = (city: string) => {
        if (!selected.includes(city)) {
            setSelected([...selected, city]);
            setSearchQuery("");
        }
        setCities([]);
    };

    const handleRemove = (city: string) => {
        setSelected(selected.filter((c: string) => c !== city));
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
                {cities.length > 0 && (
                    <ul className="result-option">
                        {cities.map((city) => (
                            <li key={city.name} onClick={() => handleSelect(city.name)}>
                                {city.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
                {selected.map((city) => (
                    <div className="selected-country">
                        <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}} onClick={() => handleRemove(city)}/>
                        {city}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitySelecting;