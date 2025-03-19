import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import CountrySelecting from "../../components/CountrySelecting";

const Trip3: FC<{}> = ({}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "30%",
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

            <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 "}}>Select 3 countries</h1>

                <CountrySelecting/>


                <CustomButton style={{width: "130px", marginTop: "150px"}} variant="contained"
                              onClick={() => navigate("/personalized-trip/city-selection")}
                >Next</CustomButton>

            </div>
        </div>
    );
};

export default Trip3;
