import {FC, useState} from 'react';
import "../App.css"

interface Option {
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
};


const OptionsSelecting: React.FC<{ options: Options }> = ({options}) => {

    return (
        <div className="container-option-layout">

            {Object.keys(options).map((key: string) => (
                <div className="option-layout" key={key}>
                    {options[key].map((option: Option, index: number) => (
                        <div key={index}>
                            <h4>{option.title}</h4>
                            <div className="option-layout-item">
                                {Object.keys(option).map((optKey, idx) => (
                                    optKey !== "title" && (
                                        <div key={idx}>
                                            <input type="checkbox" id={option[optKey]} name={option[optKey]}/>
                                            <label htmlFor={option[optKey]}>{option[optKey]}</label>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OptionsSelecting;
