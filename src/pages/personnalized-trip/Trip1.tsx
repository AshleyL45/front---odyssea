import {FC} from 'react';
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Calender from "../../components/Calender";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const Trip1: FC<{}> = ({}) => {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useLocalStorage<string | null>("departureDate", null);
    const [endDate, setEndDate] = useLocalStorage<string | null>("returnDate", null);

    const handleNextStep = () => {
        if (startDate && endDate) {
            navigate("/personalized-trip/departure");
        } else {
            alert("Please select a departure date before proceeding.");
        }
    };
    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{width: "10%", height: "6px", borderRadius: "0 5px 5px 0", backgroundColor: "#2C3E50", position: "relative", top: "-6px"
                }}></div>
            </div>
            <a href="#" style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor:"pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}} onClick={() => navigate(-1)}/>
                previous step
            </a>
            <div className="container-calender">
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "20px 0 50px"}}>Select the departure date of your 13-day stay : </p>

                <Calender/>

                <CustomButton
                    style={{width: "130px", marginTop: "70px"}}
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={!startDate || !endDate}

                >Next
                </CustomButton>
            </div>
        </div>
    );
};

export default Trip1;
