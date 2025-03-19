import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "../../App.css"
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import RecapFirstDay from "../../components/recapTrip/RecapFirstDay";
import RecapActivityDay from "../../components/recapTrip/RecapActivityDay";
import RecapTransfertDay from "../../components/recapTrip/RecapTransfertDay";

const TripRecap: FC = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{width: "100%", height: "6px", backgroundColor: "#2C3E50", position: "relative", top: "-5px"}}></div>
            </div>

            <a href="#"
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{width: "80%", margin: "auto"}}>

                <h1 style={{fontSize: "25px", margin: "50px 0 30px", textAlign: "center"}}>Summary of your trip</h1>

                <form style={{display: "flex", flexDirection: "column"}}>
                <label style={{textAlign: "center", margin: "20px 0"}}>Your trip name :</label>
                    <input className="input-user-trip" type="text" id="name-user-trip" name="name-user-trip" required placeholder="Enter the name ..."/>
                </form>

                <div className="recap-trip">
                    <div className="container-map">
                        <img
                            src="https://www.cartographie-georeflet.com/wp-content/uploads/2022/12/carte-de-france-administrative-vintage-des-departements-1.jpg"
                            alt="france map"
                            className="map"
                            />
                    </div>

                    <div>
                        <div className="country-step">
                            <h2>Pologne</h2>

                            <RecapFirstDay/>
                            <RecapActivityDay/>
                            <RecapTransfertDay/>

                        </div>

                        <div className="country-step">
                            <h2>Japon</h2>

                            <RecapFirstDay/>
                            <RecapActivityDay/>
                            <RecapTransfertDay/>

                        </div>

                        <div className="country-step">
                            <h2>Islande</h2>

                            <RecapFirstDay/>
                            <RecapActivityDay/>
                            <RecapTransfertDay/>

                        </div>
                    </div>
                </div>
            </div>

            <div className="line-recap"></div>

            <div className="submit" style={{textAlign:"center", margin: "100px auto 50px"}}>
                <p>
                    Your exceptional journey is within reach. Because every detail matters, we invite you to review your
                    itinerary one last time. From your carefully selected accommodations to the exclusive experiences
                    tailored just for you, everything has been designed to offer you a seamless escape without
                    compromise. Once your booking is confirmed, our team will ensure that every element is perfectly
                    orchestrated, delivering an experience that meets your highest expectations. All that’s left is to
                    confirm… and let yourself be carried away into an unforgettable journey.
                </p>
                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained">Submit</CustomButton>
            </div>
        </div>
    );
};

export default TripRecap;