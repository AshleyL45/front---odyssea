import {FC} from 'react';
import {JSX} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import "../../App.css"

const TripSummary: ({}: {}) => JSX.Element = ({}) => {

    const navigate = useNavigate();

    return (
        <div className="container-summary">

            <div className="text-summary">
                <h1 style={{fontSize: "30px", margin: "50px 0"}}>Create the itinerary of your dreams, customized and
                    unlimited</h1>
                <p style={{margin: "40px 0"}}>
                    Welcome to the workshop of your tailor-made trip, where each adventure is designed according to your
                    desires and expectations. Here, every detail counts: adjust your itinerary, add unforgettable stages
                    your itinerary, add unforgettable stages and shape a unique journey that's just like you.<br/><br/>

                    Whether you're dreaming of a secret getaway to little-known places, or a carefully orchestrated
                    journey through several cultures, we offer you the opportunity to create a personalized itinerary,
                    designed especially for you. Our trips are exclusively designed to last 13 days, allowing you to
                    explore up to 3 countries.<br/><br/>

                    Give free rein to your imagination and create an exceptional trip, just like you. From grandiose
                    landscapes to immersive experiences, every moment will be carefully planned to turn your dream into
                    reality. Because a trip is a once-in-a-lifetime experience, make it an unforgettable one.
                </p>

                <CustomButton variant="contained"
                              onClick={() => navigate("/personalized-trip/date")}
                >Start</CustomButton>
            </div>


        </div>
    );
};

export default TripSummary;