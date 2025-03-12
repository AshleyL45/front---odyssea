import {FC, JSX} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import {Trip} from "../../@types/Trip";
import TripNumbers from "../../styles/components/TripNumbers";

const Overview: ({}: {}) => JSX.Element = ({}) => {
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
            <h1 style={{marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem", fontSize: "1.8rem"}}>Tableau de bord</h1>
            <div style={{display: "flex", justifyContent: "space-between", width: "85%", margin: "auto"}}>
                <TripNumbers title={"En cours"} number={1}/>
                <TripNumbers title={"Ma sélection"} number={5}/>
                <TripNumbers title={"Historique de voyage"} number={2}/>
            </div>

            <h2 style={{marginLeft: "2rem", marginTop: "1rem"}}>En cours</h2>
            <TripDashboard trip={trip} page="Overview"/>

            <h2 style={{marginLeft: "2rem", marginTop: "1rem"}}>Dernier Voyage</h2>
            <TripDashboard trip={trip} page="Overview"/>
        </div>
    );
};

export default Overview;
