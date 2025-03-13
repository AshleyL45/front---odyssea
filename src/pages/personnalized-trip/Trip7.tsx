import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Trip7: FC<{}> = ({}) => {
    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "70%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                étape précédente
            </a>

        </div>
    );
};

export default Trip7;
