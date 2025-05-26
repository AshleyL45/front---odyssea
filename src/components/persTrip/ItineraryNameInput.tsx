import {FC, useEffect, useState} from 'react';
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css"

const ItineraryNameInput: FC<{}> = () => {

    const [itineraryName, setItineraryName] = useState<string>('');
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();

    // Mettre à jour le state avec le nom de l'itinéraire récupéré du contexte
    useEffect(() => {
        if (questionnaireAnswers.itineraryName) {
            setItineraryName(questionnaireAnswers.itineraryName);
        }
    }, [questionnaireAnswers.itineraryName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newItineraryName = e.target.value;
        setItineraryName(newItineraryName); // Mettre à jour le state local

        // Mettre à jour l'itinéraire dans le contexte global
        updateResponse("itineraryName", newItineraryName);
    };

    return (
        <>

            <form style={{display: "flex", flexDirection: "column"}}>
                <label style={{textAlign: "center", margin: "20px 0"}}>Your trip name :</label>
                <input
                    className="input-user-trip"
                    type="text"
                    id="name-user-trip"
                    name="name-user-trip"
                    required
                    placeholder="Enter the name ..."
                    value={itineraryName}
                    onChange={handleInputChange} // Mettre à jour le state et le contexte
                />
            </form>

        </>
    );
};

export default ItineraryNameInput;
