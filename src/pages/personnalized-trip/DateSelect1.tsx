import {FC} from 'react';
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Calender from "../../components/persTrip/CalenderPersTrip";
import {useNavigate} from "react-router-dom";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css";
import Pages from "../../components/layout/Pages";
import DurationSelecting from "../../components/persTrip/DurationSelecting";
import persTripData from "../../assets/persTripData.json";
import {post} from "../../API/api";


const DateSelect1: FC<{}> = ({}) => {

    const navigate = useNavigate();
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();
    const {duration} = questionnaireAnswers;
    const {startDate} = questionnaireAnswers;

    const formatDate = (dateString: any) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const generateStepOne = async () => {
        if (startDate && duration) {
            try {
                const newDate = formatDate(startDate);
                const response = await post("/generate/step1", {
                    duration: duration,
                    startDate: newDate});
                console.log(response)
                if (response?.success === true) {
                    navigate("/personalized-trip/traveler-selection")
                }
            } catch (e) {
                console.error('Cannot generate step 1')
            }
        } else {
            alert("Please select a date before the next step.");
        }
    };


    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "11.15%",
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
                <ArrowBackIcon sx={{fontSize: "15px"}} onClick={() => navigate(-1)}/>
                previous step
            </a>
            <div className="container-calender">
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "5px 0 20px", color: "grey"}}>Select the duration of your stay :</p>
                <DurationSelecting
                    durations={persTripData}
                    onSelectDuration={(numberOfDays) => updateResponse("duration", numberOfDays)}
                    selectedDuration={questionnaireAnswers.duration}
                />
                <Calender/>
                <CustomButton
                    style={{width: "130px", marginTop: "70px"}}
                    variant="contained"
                    disabled={!duration || !startDate}
                    onClick={generateStepOne}
                >Next
                </CustomButton>
            </div>
        </div>
    );
};

export default DateSelect1;