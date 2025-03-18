import {FC,JSX, useState} from 'react';
import "../App.css"
import {Option} from "../@types/Option";
import {useReservation} from "../contexts/ReservationContext";

/*interface Option {
    title: string;

    [key: string]: string;
}

type Options = {
    [key: string]: Option[];
};

const options: Options = {
    typeOption1: [
        {
            title: "Services d’Exception & Confort",
            option1: "Assistant linguistique",
            option2: "Service médical VIP",
            option3: "Babysitter certifié(e) et multilingue",
        }
    ],
    typeOption2: [
        {
            title: "Luxe & Bien-être",
            option1: "Chef privé",
            option2: "Coach bien-être et fitness",
            option3: "Salle de cinéma privée",
        }
    ],
    typeOption3: [
        {
            title: "Transports & Expériences Exclusives",
            option1: "Hélicoptère privé",
            option2: "Location de yacht",
            option3: "Photographe professionnel",
        }
    ],
    typeOption4: [
        {
            title: "Shopping & Événements",
            option1: "Personal shopper",
            option2: "Organisateur d’événements"
        }
    ],
};*/

interface OptionsSelectingProps {
    options: Option[];
    onOptionsChange: (selectedOptions: number[]) => void;
}


const OptionsSelecting: FC<OptionsSelectingProps> = ({options, onOptionsChange}) => {

    const categories = [
        "Luxury & Well-being",
        "Transport & Exclusive Experiences",
        "Shopping & Events",
        "Exceptional Services & Comfort"
    ]

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const handleToggleOption = (optionId: number) => {
        setSelectedOptions(prev => {
            const newSelectedOptions = prev.includes(optionId)
                ? prev.filter(id => id !== optionId)  // Supprimer l'option si déjà sélectionnée
                : [...prev, optionId];  // Ajouter l'option si non sélectionnée
            onOptionsChange(newSelectedOptions);  // Transmettre les options sélectionnées au parent
            return newSelectedOptions;
        });
    };

    return (
        <div className="container-option-layout">
            {categories.map((category: string) => {
                const filteredOptions = options.filter(option => option.category === category);

                return (
                    <div className="option-layout" key={category}>
                        <h3>{category}</h3>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div key={index} className="option-layout-item">
                                    <input type="checkbox" id={`option-${option.id}`} name={option.name}
                                           checked={selectedOptions.includes(option.id)}
                                           onChange={() => handleToggleOption(option.id)} />
                                    <label htmlFor={`option-${option.id}`}>{option.name} - ${option.price}</label>
                                </div>
                            ))
                        ) : (
                            <p>Aucune option disponible</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OptionsSelecting;
