import {FC, useEffect, useState} from 'react';
import {get} from "../API/api";
import "../App.css"
import CloseIcon from "@mui/icons-material/Close";

interface Country {
    name: string;
}

const CountrySelecting: FC<{}> = ({}) => {

    const [countries, setCountries] = useState<Country[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState<string[]>([]);


    const fetchCountry = async (query: string = "") => {
        try {
            const getCountries = await get("/countries");
            if (Array.isArray(getCountries)) {
                const filteredCountries = getCountries
                    .filter((country: Country) => country.name.toLowerCase().includes(query.toLowerCase()));
                setCountries(filteredCountries);
            }

        } catch (e) {
            console.error("Cannot get options", e);
        }
    };


    useEffect(() => {
        if (searchQuery) {
            const debounce = setTimeout(() => fetchCountry(searchQuery), 200);
            return () => clearTimeout(debounce);
        } else {
            setCountries([]);
        }
    }, [searchQuery, selected]);


    const handleSelect = (country: string) => {
        if (!selected.includes(country)) {
            setSelected([...selected, country]);
            setSearchQuery("");
        }
        setCountries([]);
    };

    const handleRemove = (country: string) => {
        setSelected(selected.filter((c: string) => c !== country));
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
                {countries.length > 0 && (
                    <ul className="result-option">
                        {countries.map((country) => (
                            <li key={country.name} onClick={() => handleSelect(country.name)}>
                                {country.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {selected.map((country) => (
                    <div className="selected-country">
                        <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}} onClick={() => handleRemove(country)}/>
                        {country}
                    </div>
                ))}
            </div>


            {/*
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div className="selected-country">
                            <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}}/>
                            Pologne
                        </div>
                        <div className="selected-country">
                            <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}}/>
                            Japon
                        </div>
                </div>
                */}
        </div>
    );
};

export default CountrySelecting;
