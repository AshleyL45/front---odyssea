import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import TravelerSelecting from "../../components/persTrip/TravelerSelecting";
import "../../App.css"
import Pages from "../../components/layout/Pages"
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {post} from "../../API/api";

const TravelerSelect2: FC<{}> = ({}) => {
    const navigate = useNavigate();

    const {questionnaireAnswers} = usePersonalizedTrip();
    const {numberOfAdults} = questionnaireAnswers;
    const {numberOfKids} = questionnaireAnswers

    const generateStepTwo = async () => {
        if (numberOfAdults && numberOfKids !== undefined) {
            try {
                console.log(numberOfAdults, numberOfKids)
                const response = await post("/generate/step3", {
                    numberAdults: numberOfAdults,
                    numberKids: numberOfKids
                });
                console.log(response);
                if (response?.success === true) {
                    navigate("/personalized-trip/departure");
                }
            } catch (e) {
                console.error('Cannot generate step 2');
            }
        } else {
            alert("Please enter at least one adult traveler.");
        }

    };

    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "22.3%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a href="#"
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0"}}>How many travellers are you ?</h1>

                <div
                    className="container-user-select"
                    style={{display: "flex", justifyContent: "center", margin: "50px 0"}}
                >
                    <TravelerSelecting/>
                </div>

                <CustomButton
                    style={{width: "130px"}}
                    variant="contained"
                    onClick={generateStepTwo}
                >
                    Next
                </CustomButton>

            </div>
        </div>
    );
};

export default TravelerSelect2;