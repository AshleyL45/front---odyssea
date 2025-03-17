import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import OptionsSelecting from "../../components/OptionsSelecting";


const options = {
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


const Trip7: ({}: {}) => JSX.Element = ({}) => {
    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "70%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Would you like to add any options to your itinerary?</h1>

                    <OptionsSelecting options={options} />

                <div style={{display: "block"}}>
                    <CustomButton style={{width: "130px"}} variant="contained">Next</CustomButton>
                </div>

            </div>

        </div>
    );
};

export default Trip7;
