import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import OptionsSelecting from "../../components/OptionsSelecting";
import {useNavigate} from "react-router-dom";


const Trip7: FC<{}> = ({}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "89.2%",
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

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Would you like to add any options to your
                    itinerary?</h1>
                <p style={{color: "grey"}}>Optional</p>

                <OptionsSelecting />

                <div style={{display: "block"}}>
                    <CustomButton style={{width: "130px"}} variant="contained"
                                  onClick={() => navigate("/personalized-trip/recap")}
                    >Next</CustomButton>
                </div>

            </div>

        </div>
    );
};

export default Trip7;
