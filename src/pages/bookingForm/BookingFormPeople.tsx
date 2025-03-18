import {FC, JSX, useState} from 'react';
import ReservationCalendar from "../../components/ReservationCalendar";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";


const BookingFormPeople: ({}: {}) => JSX.Element = ({}) => {
    const navigate = useNavigate();

    const [count1, setCount1] = useState(2);
    const [count2, setCount2] = useState(0);

    return (
        <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>

            <h1 style={{fontSize: "25px", margin: "30px 0"}}>How many travellers are you ?</h1>

            <div className="container-user-select"
                 style={{display: "flex", justifyContent: "center", margin: "50px 0"}}>
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
    );
};

export default BookingFormPeople;
