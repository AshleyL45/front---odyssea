import {FC, JSX, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../components/ReusableComponents/CustomButton";


const Trip9: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "90%",
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

            <div style={{
                padding: "20px 40px",
                width: "70%",
                margin: "auto",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <h1 style={{fontSize: "25px", margin: "30px 0 "}}>Do you have any additional information to share with us ?</h1>

                <p style={{color: "grey"}}>Message (optional) :</p>
                <textarea style={{width: "280px", height: "300px", margin: "10px 0"}}></textarea>

                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained">Next</CustomButton>

            </div>
        </div>
    );
};

export default Trip9;
