import {FC, useEffect, useState} from "react";
import {get} from "../API/api";
import CloseIcon from "@mui/icons-material/Close";
import {CitySelection} from "../@types/PersonalizeTrip";
import {usePersonalizedTrip} from "../contexts/PersonalizedTripContext";


interface CitySelectingProps {
    countryId: number;
}

const CitySelecting: FC<CitySelectingProps> = ({countryId}) => {
    const [cities, setCities] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {updateResponse, addCityToCountry} = usePersonalizedTrip();

    // Récupération des villes sélectionnées au chargement (en fonction du pays)
    useEffect(() => {
        const storedSelectedCities = localStorage.getItem(`selectedCities_${countryId}`);
        if (storedSelectedCities) {
            try {
                const parsedCities = JSON.parse(storedSelectedCities);
                setSelected(Array.isArray(parsedCities) ? parsedCities : []); // 🔥 Protection contre erreur JSON
            } catch (error) {
                console.error("Error parsing selected cities:", error);
                setSelected([]); // 🔥 Protection contre erreur JSON
            }
        }
    }, [countryId]); // Lorsque `countryId` change, recharger les villes sélectionnées

    // Récupération des villes disponibles en fonction de la recherche
    useEffect(() => {
        const fetchCities = async () => {
            try {
                console.log("Fetching cities..."); // 🔥 DEBUG
                const response = await get<any[]>("/cities");

                if (!response || !Array.isArray(response)) {
                    throw new Error("Invalid response format");
                }

                console.log("API Response:", response); // 🔥 DEBUG

                const selectedIds = selected.map((city) => city.id);
                const filteredCities = response.filter(
                    (city) =>
                        city.countryId === countryId &&
                        city.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        !selectedIds.includes(city.id)
                );

                setCities(filteredCities);
                console.log(selected)
            } catch (e) {
                console.error("Error fetching cities:", e); // 🔥 Capture d'erreur
            }
        };

        if (searchQuery) {
            const debounce = setTimeout(fetchCities, 200);
            return () => clearTimeout(debounce);
        } else {
            setCities([]);
        }
    }, [searchQuery, countryId, selected]); // Dépendances mises à jour pour éviter de trop nombreuses requêtes

    // Fonction pour sélectionner une ville
    const handleSelect = (city: CitySelection) => {
        if (selected.length >= 2) {
            setError("You can only select 2 cities per country.");
            setSearchQuery("");
            return;
        }

        if (!selected.some((c) => c.id === city.id)) {
            const newSelection = [...selected, city];
            setSelected(newSelection);
            console.log(newSelection)
            // const newCity : CitySelection ={id: city.id, cityName:city.cityName, activities:[]}
            localStorage.setItem(`selectedCities_${countryId}`, JSON.stringify(newSelection)); // Mise à jour immédiate dans localStorage
            setSearchQuery(""); // Reset la recherche après sélection
        }
        setCities([]); // Optionnel Réinitialise les résultats de recherche
    };

    // Effacer l'erreur si moins de 2 villes sont sélectionnées
    useEffect(() => {
        if (selected.length < 2) {
            setError(null);
        }
    }, [selected]);

    // Fonction pour supprimer une ville
    const handleRemove = (cityId: number) => {
        const updatedSelection = selected.filter((c) => c.id !== cityId);
        setSelected(updatedSelection);
        localStorage.setItem(`selectedCities_${countryId}`, JSON.stringify(updatedSelection)); // Mise à jour immédiate dans localStorage
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type here"
                className="search-input-city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {error && <div style={{color: "red", margin: "10px 0"}}>{error}</div>}
            <div className="searchResults">
                {cities.length > 0 && (
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
