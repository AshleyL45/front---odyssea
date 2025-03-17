import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ActivitySelecting from "../../components/ActivitySelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css"

const Trip8: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "80%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a style={{
                display: 'flex',
                alignItems: "center",
                fontSize: "16px",
                margin: "10px 40px",
                textAlign: "center"
            }} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>What to do in : Pologne ?</h1>
                <p style={{color: "grey"}}>Select your preferred activities (2 per city)</p>

                <ActivitySelecting/>

                <CustomButton style={{width: "130px", marginTop: "120px"}} variant="contained">Next</CustomButton>

            </div>

        </div>
    );
};

export default Trip8;
