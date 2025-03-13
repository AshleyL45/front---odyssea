import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import CitySelecting from "../../components/CitySelecting";
import "../../App.css"

const Trip4: FC<{}> = ({}) => {

    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "40%",
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

            <div className="container-city-selecting">

                <h1 style={{fontSize: "25px", margin: "30px 0", textAlign: "center"}}>Select your preferred cities :</h1>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    margin: "40px auto",
                    justifyContent: "center"
                }}>
                    <div className="city-selecting">
                        <h3 style={{margin: "10px 0", textAlign: "start"}}>Pologne</h3>
                        <div>
                            <CitySelecting/>
                            <p style={{color: "grey"}}>2 cities max.</p>
                        </div>
                    </div>
                    <div className="city-selecting">
                        <h3 style={{margin: "10px 0", textAlign: "start"}}>Brésil</h3>
                        <div>
                            <CitySelecting/>
                            <p style={{color: "grey"}}>2 cities max.</p>
                        </div>
                    </div>
                    <div className="city-selecting">
                        <h3 style={{margin: "10px 0", textAlign: "start"}}>Japon</h3>
                        <div>
                            <CitySelecting/>
                            <p style={{color: "grey"}}>2 cities max.</p>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "center", margin: "auto"}}>
                    <CustomButton style={{width: "130px", marginTop: "120px"}} variant="contained">Next</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default Trip4;
