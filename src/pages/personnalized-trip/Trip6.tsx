import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Calender from "../../components/Calender";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import HotelSelecting from "../../components/HotelSelecting";
import "../../App.css"

const Trip6: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
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

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div className="hotel-select" style={{margin: "100px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>What kind of accommodation are you looking for ?</h1>
                <p style={{margin: "40px 0 20px"}}>Hotel standing : </p>

                <HotelSelecting/>

                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained">Next</CustomButton>
            </div>
        </div>
    );
};

export default Trip6;
