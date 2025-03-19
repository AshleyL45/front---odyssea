import {FC, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css"
import {useNavigate} from "react-router-dom";
import {get} from "../../API/api";
import CityFromSelecting from "../../components/CityFromSelecting";


const Trip2: FC<{}> = ({}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "20%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>
            <a href="#" style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor:"pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{padding: "20px", width: "85%", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>Which city are you leaving from ?</h1>
                {/*<p style={{margin: "20px 0"}}>
                    Write down the country to display the cities.
                </p>*/}

                <div className="search-bar">
                    {/*
                        <div className="search-resutls"></div>
                    */}
                </div>

                <CityFromSelecting/>

                <CustomButton style={{width: "130px", marginTop: "150px"}} variant="contained"
                              onClick={() => navigate("/personalized-trip/country-selection")}
                >Next</CustomButton>

            </div>
        </div>
    );
};

export default Trip2;
