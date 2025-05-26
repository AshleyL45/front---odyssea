import {FC, useEffect, useState} from "react";
import {get} from "../../API/api";
import CloseIcon from "@mui/icons-material/Close";
import {CitySelection} from "../../@types/PersonalizeTrip";

interface CitySelectingProps {
    countryId: number;
    onCitySelectionChange: (countryId: number, count: number) => void;
}

const CitySelecting: FC<CitySelectingProps> = ({countryId, onCitySelectionChange}) => {
    const [cities, setCities] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cachedCities, setCachedCities] = useState<{ [key: number]: any[] }>({}); // Cache des villes
    const [isInputFocused, setIsInputFocused] = useState(false);

    // 🔹 Récupération des villes sélectionnées stockées en localStorage au chargement
    useEffect(() => {
        const storedSelectedCities = localStorage.getItem(`selectedCities_${countryId}`);
        if (storedSelectedCities) {
            try {
                const parsedCities = JSON.parse(storedSelectedCities);
                setSelected(Array.isArray(parsedCities) ? parsedCities : []);
            } catch (error) {
                console.error("Error parsing selected cities:", error);
                setSelected([]);
            }
        }
    }, [countryId]);

    const fetchCities = async (query: string = "") => {
        if (cachedCities[countryId]) {
            console.log(`Using cached cities for country ${countryId}`);
            filterCities(cachedCities[countryId], query);
            return;
        }

        try {
            console.log(`Fetching cities for country ${countryId}...`);
            const response = await get("/cities");

            if (!response || !Array.isArray(response?.data)) {
                throw new Error("Invalid response format");
            }
            console.log(response.data)
            setCachedCities(prev => ({...prev, [countryId]: response.data}));
            filterCities(response?.data, query);
        } catch (e) {
            console.error("Error fetching cities:", e);
        }
    };

    const filterCities = (citiesData: any[], query: string = "") => {
        const selectedIds = selected.map((city) => city.id);
        const filteredCities = citiesData.filter(
            (city) =>
                city.countryId === countryId &&
                city.name.toLowerCase().includes(query.toLowerCase()) &&
                !selectedIds.includes(city.id)
        );
        setCities(filteredCities);
    };


    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchCities(searchQuery);
        }, 200);
        return () => clearTimeout(debounce);
    }, [searchQuery, countryId]);

    useEffect(() => {
        if (!cachedCities[countryId]) {
            fetchCities("");
        }
    }, [countryId]);


    // 🔹 Sélectionner une ville
    const handleSelect = (city: CitySelection) => {
        if (selected.length >= 2) {
            setError("You can only select 2 cities per country.");
            setSearchQuery("");
            return;
        }

        if (!selected.some((c) => c.id === city.id)) {
            const newSelection = [...selected, city];
            setSelected(newSelection);
            // Enregistrer les 2 villes sélectionnées dans localStorage
            localStorage.setItem(`selectedCities_${countryId}`, JSON.stringify(newSelection));
            onCitySelectionChange(countryId, newSelection.length);
        }

        setError(null);
        setSearchQuery("");
        setCities([]);
        setIsInputFocused(false)
    };

    // 🔹 Supprimer une ville
    const handleRemove = (cityId: number) => {
        const updatedSelection = selected.filter((c) => c.id !== cityId);
        setSelected(updatedSelection);
        localStorage.setItem(`selectedCities_${countryId}`, JSON.stringify(updatedSelection));
        onCitySelectionChange(countryId, updatedSelection.length);

        if(updatedSelection.length < 2 ){
            setError(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type here"
                className="search-input-city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                    setIsInputFocused(true);
                    fetchCities(""); // Charger les villes au focus même si rien n'est tapé
                }}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
            />
            {error && <div style={{color: "red", margin: "10px 0"}}>{error}</div>}
            <div className="searchResults">
                {isInputFocused && cities.length > 0 && (
                    <ul className="result-option">
                        {cities.map((city) => (
                            <li key={city.id} onClick={() => handleSelect(city)}>
                                {city.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                {selected.map((city) => (
                    <div key={city.id} className="selected-country">
                        <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}} onClick={() => handleRemove(city.id)}/>
                        {city.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitySelecting;
