import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import CloseIcon from '@mui/icons-material/Close';

const Trip3: FC<{}> = ({}) => {

    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
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
            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 "}}>Select 3 countries</h1>

                <div className="search-bar">
                    <input type="text" placeholder="Type here" className="search-input"
                    />
                    {/*
                        <div className="search-resutls"></div>
                    */}
                </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div className="selected-country">
                        <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}}/>
                        Pologne
                    </div>
                    <div className="selected-country">
                        <CloseIcon sx={{fontSize: "20px", cursor: "pointer"}}/>
                        Japon
                    </div>
                </div>


                <CustomButton style={{width: "130px", marginTop: "150px"}} variant="contained">Next</CustomButton>

            </div>
        </div>
    );
};

export default Trip3;
