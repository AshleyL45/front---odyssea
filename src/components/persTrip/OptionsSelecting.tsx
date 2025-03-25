import {FC, useEffect, useState} from 'react';
import "../../App.css";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {Option} from "../../@types/PersonalizeTrip";

const OptionsSelecting: FC = () => {
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();
    const {options: selectedOptions = []} = questionnaireAnswers;

    const [options, setOptions] = useState<{ [key: string]: Option[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour récupérer les options
    const fetchOptions = async () => {
        try {
            const response = await fetch("http://localhost:8080/options/all");
            //console.log("Réponse de l'API :", response); // Log de la réponse
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //console.log("Options reçues :", data); // Log des données reçues

            // Vérifiez que la réponse est bien un tableau
            if (!Array.isArray(data)) {
                throw new Error("Les données reçues ne sont pas un tableau d'options");
            }

            // Grouper les options par catégorie
            const groupedOptions: { [key: string]: Option[] } = {};
            data.forEach(({id, name, description, category, price}) => {
                if (!groupedOptions[category]) {
                    groupedOptions[category] = [];
                }
                groupedOptions[category].push({id, name, description, category, price});
            });

            setOptions(groupedOptions);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des options :", error);
            setError("Failed to load options. Please try again later.");
            setLoading(false);
        }
    };


    // Appeler fetchOptions au montage du composant
    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSelection = (option: Option) => {
        const isSelected = selectedOptions.some((selectedOption) => selectedOption.name === option.name);

        const updatedOptions = isSelected
            ? selectedOptions.filter((selectedOption) => selectedOption.name !== option.name)
            : [...selectedOptions, option];

        updateResponse("options", updatedOptions);
    };

    if (loading) {
        return <div>Loading options...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-option-layout">
            {Object.keys(options).map((category) => (
                <div className="option-layout" key={category}>
                    <h4 style={{fontSize: "1.1rem"}}>{category}</h4>
                    <div className="option-layout-item">
                        {options[category].map((option, idx) => (
                            <div key={idx}>
                                <input
                                    type="checkbox"
                                    id={option.name}
                                    name={option.name}
                                    checked={selectedOptions.some((selectedOption) => selectedOption.name === option.name)}
                                    onChange={() => handleSelection(option)}
                                />
                                <label htmlFor={option.name}>
                                    <strong>{option.name}</strong> <br/> {option.description}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OptionsSelecting;