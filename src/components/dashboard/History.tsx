import {FC, JSX} from 'react';
import {Trip} from "../../@types/Trip";
import TripDashboard from "../ReusableComponents/TripDashboard";

const History: ({}: {}) => JSX.Element = ({}) => {

    const trip: Trip = {
        id: 333,
        name: "Séjour de rêve aux Maldives",
        description: "Venez découvrir les magnifiques îles des Maldives, avec leurs plages de sable blanc, leurs lagons turquoise et leurs complexes hôteliers de luxe. Vous aurez l'occasion de vous détendre, de faire du snorkeling, de plonger avec les tortues et de savourer des plats locaux. Ce voyage vous offrira des moments inoubliables dans l'une des destinations les plus paradisiaques du monde.",
        shortDescription: "Plages de rêve, luxe et plongée aux Maldives.",
        price: 3999.99,
        duration: 21
    }

    return (
        <div>
            <h1 style={{marginLeft: "8rem", marginTop: "1.8rem", marginBottom: "2rem", fontSize: "1.8rem"}}>Historique</h1>
            <div>
                {/*TODO Faire un map pour les voyages*/}
                <p style={{marginLeft: "8rem"}}>05/09/2024</p>
                <TripDashboard trip={trip} page="Travel History"/>
            </div>

        </div>
    );
};

export default History;
