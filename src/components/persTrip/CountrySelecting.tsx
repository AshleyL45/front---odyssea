import {FC, useEffect, useState} from "react";
import {get} from "../../API/api";
import "../../App.css";
import CloseIcon from "@mui/icons-material/Close";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {CountrySelection, PersTripData} from "../../@types/PersonalizeTrip";

// Interface définissant les propriétés du composant
interface CountrySelectingProps {
    onSelectionChange: (count: number) => void;
    maxCountries: number;
}

// Composant principal de sélection des pays
const CountrySelecting: FC<CountrySelectingProps> = ({onSelectionChange, maxCountries}) => {

    const [countries, setCountries] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();
    const [selected, setSelected] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // 🔹 Au montage du composant, charger les pays déjà sélectionnés depuis le contexte
    useEffect(() => {
        if (questionnaireAnswers.countrySelection && questionnaireAnswers.countrySelection.length > 0) {
            setSelected(questionnaireAnswers.countrySelection);
        }
    }, [questionnaireAnswers.countrySelection]);


    // 🔹 Met à jour le parent avec le nombre de pays sélectionnés
    useEffect(() => {
        onSelectionChange(selected.length);
    }, [selected, onSelectionChange]);


    const fetchCountry = async (query: string) => {
        try {
            const getCountries = await get("/countries");
            if (Array.isArray(getCountries.data)) {
                const filteredCountries = getCountries.data
                    .filter((country: any) =>
                        country.name.toLowerCase().includes(query.toLowerCase()) &&
                        !selected.some((selectedCountry) => selectedCountry.id === country.id)
                    );
                setCountries(filteredCountries);
            }
        } catch (e) {
            console.error("Cannot get countries", e);
        }
    };


    // 🔹 Effet pour exécuter fetchCountry avec un délai (debounce) lors de la saisie dans l'input
    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchCountry(searchQuery);
        }, 200);
        return () => clearTimeout(debounce);
    }, [searchQuery, selected]);


    // 🔹 Fonction pour sélectionner un pays
    const handleSelect = (country: CountrySelection) => {
        if (selected.length >= maxCountries) {
            setError(`You can only select up to ${maxCountries} countries.`); // Affiche une erreur si plus de 3 pays
            setSearchQuery("");
            return;
        }

        if (selected.some((c) => c.id === country.id)) {
            return; // Empêche d'ajouter un pays déjà sélectionné
        }

        setError(null); // Supprime l'erreur si la sélection est valide
        const updatedSelection = [...selected, country];
        setIsInputFocused(false);

        setSelected(updatedSelection); // Mise à jour de l'état des pays sélectionnés
        updateResponse("countrySelection", updatedSelection); // Mise à jour du contexte
        localStorage.setItem("selectedCountries", JSON.stringify(updatedSelection)); // Sauvegarde dans le localStorage

        setSearchQuery(""); // Réinitialisation du champ de recherche
        setCountries([]); // Réinitialisation des résultats de recherche
    };

    // 🔹 Fonction pour supprimer un pays sélectionné
    const handleRemove = (countryId: number) => {
        const updatedSelection = selected.filter((c) => c.id !== countryId);

        setSelected(updatedSelection); // Mise à jour de l'état des pays sélectionnés
        updateResponse("countrySelection", updatedSelection); // Mise à jour du contexte
        localStorage.setItem("selectedCountries", JSON.stringify(updatedSelection)); // Sauvegarde dans le localStorage

        if (updatedSelection.length < 3) {
            setError(null); // Supprime l'erreur si on repasse sous la limite de 3 pays
        }
    };

    // 🔹 Met à jour le parent avec le nombre de pays sélectionnés
    useEffect(() => {
        onSelectionChange(selected.length);
    }, [selected, onSelectionChange]);

    console.log(selected); // Debug : affiche la sélection actuelle

    return (
        <div>
            {/* 🔹 Affichage d'un message si 3 pays ne sont pas encore sélectionnés */}
            {selected.length !== maxCountries && (
                <div style={{color: "red", margin: "0 0 20px"}}>
                    You must select exactly {maxCountries} countries.
                </div>
            )}

            {/* 🔹 Champ de recherche pour filtrer les pays */}
            <input
                type="text"
                placeholder="Type here"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                    setIsInputFocused(true);
                    fetchCountry(searchQuery); // Appelle directement au focus
                }}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 250)} // Optionnel : laisse le temps pour cliquer
                required
            />


            {/* 🔹 Affichage des erreurs */}
            {error && <div style={{color: "red", margin: "10px 0"}}>{error}</div>}

            {/* 🔹 Liste des pays disponibles pour la sélection */}
            <div className="searchResults">
                {isInputFocused && countries.length > 0 && (
                    <ul className="result-option">
                        {countries.map((country) => (
                            <li key={country.id} onClick={() => handleSelect(country)}>
                                {country.name}
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            {/* 🔹 Affichage des pays sélectionnés avec possibilité de suppression */}
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {selected.map((country) => (
                    <div key={country.id} className="selected-country">
                        <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}} onClick={() => handleRemove(country.id)}/>
                        {country.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountrySelecting;