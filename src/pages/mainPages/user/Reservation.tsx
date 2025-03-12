import {FC, JSX} from 'react';
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import {Trip} from "../../../@types/Trip";


const Reservation: ({}: {}) => JSX.Element = ({}) => {
    const trip: Trip = {
        id: 1,
        itineraryName: "Séjour de rêve aux Maldives",
        description: "Venez découvrir les magnifiques îles des Maldives, avec leurs plages de sable blanc, leurs lagons turquoise et leurs complexes hôteliers de luxe. Vous aurez l'occasion de vous détendre, de faire du snorkeling, de plonger avec les tortues et de savourer des plats locaux. Ce voyage vous offrira des moments inoubliables dans l'une des destinations les plus paradisiaques du monde.",
        shortDescription: "Plages de rêve, luxe et plongée aux Maldives.",
        price: 3999.99,
        duration: 21
    }

    return (
        <div>
            <TripDashboard trip={trip} page={"Reservations"}/>
        </div>
    );
};

export default Reservation;
