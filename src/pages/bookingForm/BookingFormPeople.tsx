import {FC, JSX, useState} from 'react';
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useReservation} from "../../contexts/ReservationContext";


const BookingFormPeople: ({}: {}) => JSX.Element = ({}) => {
    const navigate = useNavigate();
    const {updateResponse}= useReservation();

    const [adults, setAdults] = useState(0);
    const [kids, setKids] = useState(0);

    const handleAdultChange = (delta: number) => {
        const newAdults = Math.max(0, adults + delta);
        setAdults(newAdults);
        updateResponse("numberOfAdults", newAdults); // Mettre à jour directement le contexte
        console.log(adults)
    };

    // Mettre à jour le contexte quand le nombre d'enfants change
    const handleKidsChange = (delta: number) => {
        const newKids = Math.max(0, kids + delta);
        setKids(newKids);
        updateResponse("numberOfKids", newKids);  // Mettre à jour directement le contexte
    };

    const handleNext = () => {
        if (adults === 0) {
            alert("Please insert a valid adults number.");
        } else {
            // Les valeurs sont déjà synchronisées avec le contexte, on passe à la page suivante
            navigate("/booking/options");
        }
    };


    return (
        <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>

            <h1 style={{fontSize: "25px", margin: "30px 0"}}>How many travellers are you ?</h1>

            <div className="container-user-select"
                 style={{display: "flex", justifyContent: "center", margin: "50px 0"}}>
                <div style={{margin: "40px 60px"}}>
                    <h2>Adults</h2>
                    <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                        <RemoveIcon onClick={() => handleAdultChange(- 1)}/>
                        <p style={{border: "solid 2px black", padding: "2px 30px"}}>{adults}</p>
                        <AddIcon onClick={() => handleAdultChange(1)}/>
                    </div>
                </div>
                <div style={{margin: "40px 60px"}}>
                    <h2>Children (-18yo)</h2>
                    <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                        <RemoveIcon onClick={() => handleKidsChange(- 1)}/>
                        <p style={{border: "solid 2px black", padding: "2px 30px"}}>{kids}</p>
                        <AddIcon onClick={() => handleKidsChange(1)}/>
                    </div>
                </div>
            </div>

            <CustomButton style={{width: "130px", marginTop: "30px"}} variant="contained" onClick={handleNext}>Next</CustomButton>

        </div>
    );
};

export default BookingFormPeople;
