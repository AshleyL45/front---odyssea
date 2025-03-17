import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css"

const Trip2: ({}: {}) => JSX.Element = ({}) => {

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
            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{padding: "20px", width: "85%", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>Which city are you leaving from ?</h1>
                <p style={{margin: "20px 0"}}>
                    Write down the country to display the cities.
                </p>

                <div className="search-bar">
                <input type="text" placeholder="Type here" className="search-input" required
                    />
                    {/*
                        <div className="search-resutls"></div>
                    */}
                </div>

                <CustomButton style={{width: "130px", marginTop: "150px"}} variant="contained">Next</CustomButton>

            </div>
        </div>
    );
};

export default Trip2;
