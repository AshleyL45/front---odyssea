import {FC, useEffect} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../App.css";
import {usePersonalizedTrip} from "../contexts/PersonalizedTripContext";

const TravelerSelecting: FC = () => {
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();

    const {numberOfAdults, numberOfKids} = questionnaireAnswers;
    console.log(questionnaireAnswers)
    // Initialiser le nombre d'adultes à 2 par défaut
    useEffect(() => {
        if (numberOfAdults === 0) {
            updateResponse("numberOfAdults", 2);
        }
    }, []);

    return (
        <>
            <div style={{margin: "40px 60px"}}>
                <h2>Adults</h2>
                <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                    <RemoveIcon onClick={() => updateResponse("numberOfAdults", Math.max(1, numberOfAdults - 1))}/>
                    <p style={{border: "solid 2px black", padding: "2px 30px"}}>{numberOfAdults}</p>
                    <AddIcon onClick={() => updateResponse("numberOfAdults", numberOfAdults + 1)}/>
                </div>
            </div>
            <div style={{margin: "40px 60px"}}>
                <h2>Children (-18yo)</h2>
                <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                    <RemoveIcon onClick={() => updateResponse("numberOfKids", Math.max(0, numberOfKids - 1))}/>
                    <p style={{border: "solid 2px black", padding: "2px 30px"}}>{numberOfKids}</p>
                    <AddIcon onClick={() => updateResponse("numberOfKids", numberOfKids + 1)}/>
                </div>
            </div>
        </>
    );
};

export default TravelerSelecting;
