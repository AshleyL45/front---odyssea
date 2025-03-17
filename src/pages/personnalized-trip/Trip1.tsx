import {FC, JSX} from 'react';
import Calender from "../../components/Calender";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Trip1: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "10%",
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
            <div className="container-calender">
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "20px 0 50px"}}>Select the departure date of your 12-day stay : </p>
                <Calender />
                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained">Next</CustomButton>
            </div>
        </div>
    );
};

export default Trip1;
