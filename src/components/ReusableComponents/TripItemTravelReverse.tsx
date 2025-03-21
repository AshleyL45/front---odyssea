import {FC, JSX} from 'react';
import "../../App.css"
import {Trip} from "../../@types/Trip";
import {useNavigate} from "react-router-dom";


const TripItemTravelReverse: ({trip}: { trip: Trip }) => JSX.Element = ({trip}) => {
    const navigate = useNavigate();
    return (
        <div style={{margin: "250px 0"}}>
            <section className="component trip-item-travel-reverse">

                <div className="text-travel">
                    <h2 style={{fontSize: "25px", margin: "0 0 20px"}}>{trip.name}</h2>
                    <p style={{marginBottom: "10px"}}>
                        {trip.shortDescription}
                    </p>
                    <p style={{margin: "30px 0"}}>Starting price : {trip.price}.00 €</p>
                    <a style={{textDecoration: "underline", fontSize: "18px", fontWeight: "bold", cursor: "pointer"}}
                       onClick={() => navigate(`/trip/${trip.id}`)}>Détails</a>
                </div>

                <div className="trip-item-travel-photo" style={{
                    border: "solid 1px black",
                    backgroundColor: "#F8F1E5"
                }}></div>

            </section>

            <div className="travel-line" style={{width: "40%", height: "3px", backgroundColor: "#745E4D", borderRadius: 4, margin: "20px auto"}}></div>

        </div>
    );
};

export default TripItemTravelReverse;
