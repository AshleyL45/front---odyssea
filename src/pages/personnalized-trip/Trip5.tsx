import {FC,JSX, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Trip5: ({}: {}) => JSX.Element = ({}) => {

    const [count1, setCount1] = useState(2);
    const [count2, setCount2] = useState(0);

    return (
        <div>
            <div style={{margin: "30px 0"}} className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "50%",
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

                <h1 style={{fontSize: "25px", margin: "30px 0"}}>How many travellers are you ?</h1>

                <div className="container-user-select" style={{display: "flex", justifyContent: "center", margin: "50px 0"}}>
                    <div style={{margin: "40px 60px"}}>
                        <h2>Adults</h2>
                        <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                            <RemoveIcon onClick={() => setCount1(Math.max(0, count1 - 1))}/>
                            <p style={{border: "solid 2px black", padding: "2px 30px"}}>{count1}</p>
                            <AddIcon onClick={() => setCount1(count1 + 1)}/>
                        </div>
                    </div>
                    <div style={{margin: "40px 60px"}}>
                        <h2>Children (-18yo)</h2>
                        <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                            <RemoveIcon onClick={() => setCount2(Math.max(0, count2 - 1))}/>
                            <p style={{border: "solid 2px black", padding: "2px 30px"}}>{count2}</p>
                            <AddIcon onClick={() => setCount2(count2 + 1)}/>
                        </div>
                    </div>
                </div>

                <CustomButton style={{width: "130px", marginTop: "30px"}} variant="contained">Next</CustomButton>

            </div>
        </div>
    );
};

export default Trip5;
