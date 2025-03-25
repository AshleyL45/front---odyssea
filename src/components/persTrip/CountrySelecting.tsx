import {FC, useEffect, useState} from "react";
import {get} from "../../API/api";
import "../../App.css";
import CloseIcon from "@mui/icons-material/Close";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {CountrySelection} from "../../@types/PersonalizeTrip";

// Interface définissant les propriétés du composant
interface CountrySelectingProps {
    onSelectionChange: (count: number) => void; // Fonction callback pour signaler le nombre de pays sélectionnés
}

// Composant principal de sélection des pays
const CountrySelecting: FC<CountrySelectingProps> = ({onSelectionChange}) => {

    // État contenant la liste des pays disponibles
    const [countries, setCountries] = useState<any[]>([]);
    // État pour stocker la recherche utilisateur
    const [searchQuery, setSearchQuery] = useState("");
    // Récupération du contexte contenant les réponses du questionnaire
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();
    // État pour stocker les pays sélectionnés par l'utilisateur
    const [selected, setSelected] = useState<any[]>([]);
    // État pour gérer les erreurs
    const [error, setError] = useState<string | null>(null);

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

    // 🔹 Fonction pour récupérer la liste des pays depuis l'API
    const fetchCountry = async (query: string = "") => {
        try {
            const getCountries = await get("/countries"); // Récupération des pays depuis l'API

            if (Array.isArray(getCountries)) {
                // Filtrer les pays pour ne garder que ceux qui correspondent à la recherche
                // et qui ne sont pas déjà sélectionnés
                const filteredCountries = getCountries
                    .filter((country: any) =>
                        country.name.toLowerCase().includes(query.toLowerCase()) &&
                        !selected.some((selectedCountry) => selectedCountry.id === country.id)
                    );

                setCountries(filteredCountries); // Mise à jour de l'état avec les pays filtrés
            }
        } catch (e) {
            console.error("Cannot get countries", e);
        }
    };

    // 🔹 Effet pour exécuter `fetchCountry` avec un délai (debounce) lors de la saisie dans l'input
    useEffect(() => {
        if (searchQuery) {
            const debounce = setTimeout(() => fetchCountry(searchQuery), 200);
            return () => clearTimeout(debounce); // Annule la requête si l'utilisateur continue de taper
        } else {
            setCountries([]); // Efface les résultats si le champ de recherche est vide
        }
    }, [searchQuery, selected]); // Dépendances : déclenché quand la recherche ou la sélection change

    // 🔹 Fonction pour sélectionner un pays
    const handleSelect = (country: CountrySelection) => {
        if (selected.length >= 3) {
            setError("You can only select up to 3 countries."); // Affiche une erreur si plus de 3 pays
            setSearchQuery("");
            return;
        }

        if (selected.some((c) => c.id === country.id)) {
            return; // Empêche d'ajouter un pays déjà sélectionné
        }

        setError(null); // Supprime l'erreur si la sélection est valide

        const updatedSelection = [...selected, country];

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
            {selected.length !== 3 && (
                <div style={{color: "red", margin: "0 0 40px"}}>
                    You must select exactly 3 countries.
                </div>
            )}

            {/* 🔹 Champ de recherche pour filtrer les pays */}
            <input
                type="text"
                placeholder="Type here"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
            />

            {/* 🔹 Affichage des erreurs */}
            {error && <div style={{color: "red", margin: "10px 0"}}>{error}</div>}

            {/* 🔹 Liste des pays disponibles pour la sélection */}
            <div className="searchResults">
                {countries.length > 0 && (
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