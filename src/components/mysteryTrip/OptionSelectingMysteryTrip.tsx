import React, {FC, useEffect, useState} from 'react';
import "../../App.css";
import {useBooking} from "../../contexts/BookingContext";
import {Option} from "../../@types/Option";

interface GroupedOptions {
    [category: string]: Option[];
}

interface OptionsSelectingProps {
    // plus besoin de props, tout est tiré du contexte
}

const OptionsSelectingMysteryTrip: FC<OptionsSelectingProps> = () => {
    const {questionnaireAnswers, updateResponse} = useBooking();
    const selectedIds: number[] = questionnaireAnswers.optionIds || [];

    const [options, setOptions] = useState<GroupedOptions>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOptions = async () => {
        try {
            const response = await fetch("http://localhost:8080/options/all");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const json = await response.json();
            if (!Array.isArray(json.data)) throw new Error("Les données reçues ne sont pas un tableau d'options");

            const grouped: GroupedOptions = {};
            json.data.forEach((opt: any) => {
                const o: Option = {
                    id: opt.id,
                    name: opt.name,
                    description: opt.description,
                    category: opt.category,
                    price: opt.price,
                };
                if (!grouped[o.category]) grouped[o.category] = [];
                grouped[o.category].push(o);
            });

            setOptions(grouped);
        } catch (err) {
            console.error("Erreur lors de la récupération des options :", err);
            setError("Failed to load options. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSelection = (id: number) => {
        const updated = selectedIds.includes(id)
            ? selectedIds.filter(i => i !== id)
            : [...selectedIds, id];
        updateResponse('optionIds', updated);
    };

    if (loading) return <div>Loading options...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container-option-layout">
            {Object.entries(options).map(([category, opts]) => (
                <div className="option-layout" key={category}>
                    <h4 style={{fontSize: '1.2rem', margin: '30px 0'}}>{category}</h4>
                    <div className="option-layout-item">
                        {opts.map(option => (
                            <div key={option.id}>
                                <input
                                    type="checkbox"
                                    id={`opt-${option.id}`}
                                    checked={selectedIds.includes(option.id)}
                                    onChange={() => handleSelection(option.id)}
                                />
                                <label htmlFor={`opt-${option.id}`}>
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

export default OptionsSelectingMysteryTrip;