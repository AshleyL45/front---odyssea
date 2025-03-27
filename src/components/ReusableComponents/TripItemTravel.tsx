import {FC, JSX} from 'react';
import '../../App.css'
import CustomButton from "./CustomButton";
import {Trip} from "../../@types/Trip"
import {useNavigate} from "react-router-dom";

interface TripItemTravelProps {
    trip: Trip;
    headerImage: string;
}

const TripItemTravel: FC<TripItemTravelProps> = ({trip, headerImage}) => {
    const navigate = useNavigate();

    return (
        <div style={{margin: "250px 0"}}>
            <section className="component trip-item-travel">

                <div className="trip-item-travel-photo" style={{border: "solid 1px black",
                    backgroundImage: `url(${headerImage})`, backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"}}></div>

                <div className="text-travel">
                    <p style={{marginBottom: "2rem", fontStyle: "italic"}}>{trip.themeName}</p>
                    <h2 style={{fontSize: "25px", margin: "0 0 20px"}}>{trip.name}</h2>
                    <p style={{marginBottom: "10px"}}>
                        {trip.shortDescription}
                    </p>
                    <p style={{margin: "30px 0"}}>Starting price : {trip.price}.00 €</p>
                    <a style={{textDecoration: "underline", fontSize: "18px", fontWeight: "bold", cursor: "pointer"}} onClick={() => navigate(`/trip/${trip.id}`)}>Details</a>
                </div>

            </section>

            <div className="travel-line" style={{width: "40%", height: "3px", backgroundColor: "#745E4D", borderRadius: 4, margin: "20px auto"}}></div>

        </div>
    );
};

export default TripItemTravel;
