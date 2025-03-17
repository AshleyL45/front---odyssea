import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import HotelSelecting from "../../components/HotelSelecting";
import "../../App.css"
import {useNavigate} from "react-router-dom";

const Trip6: FC<{}> = ({}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "60%",
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

            <div className="hotel-select" style={{margin: "100px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>What kind of accommodation are you looking for
                    ?</h1>
                <p style={{margin: "40px 0 20px"}}>Hotel standing : </p>

                <HotelSelecting/>

                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained"
                              onClick={() => navigate("/personalized-trip/option-selection")}
                >Next</CustomButton>
            </div>
        </div>
    );
};

export default Trip6;
