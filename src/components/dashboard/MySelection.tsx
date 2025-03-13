import {FC, JSX, useState} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import {Trip} from "../../@types/Trip";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MySelection: ({}: {}) => JSX.Element = ({}) => {
    const[sortDate, setSortDate] = useState(false);
    const[sortPrice, setSortPrice] = useState(false);
    const [sortDuration, setSortDuration] = useState(false);

    const handleSorting = (type: string) => {
        if(type === "Date de départ"){
            setSortDate(prevState => !prevState);
        } else if(type === "Prix"){
            setSortPrice(prevState => !prevState);
        } else if(type === "Durée"){
            setSortDuration(prevState => !prevState)
        }

    }

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
            <h1 style={{
                marginLeft: "8rem",
                marginTop: "1.8rem",
                marginBottom: "2rem",
                fontSize: "1.8rem"
            }}>Ma séléction</h1>

            <div style={{display: "flex", justifyContent: "space-between", width: "40%", margin: "auto"}}>
                <p onClick={() => handleSorting("Date de départ")} style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>Date de départ {sortDate ? <ExpandLessIcon/> :
                    <ExpandMoreIcon/>}</p>
                <p onClick={() => handleSorting("Prix")}
                   style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>Prix {sortPrice ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
                <p onClick={() => handleSorting("Durée")}
                   style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>Durée {sortDuration ? <ExpandLessIcon/> :
                    <ExpandMoreIcon/>}</p>
            </div>


            <TripDashboard trip={trip} page={"My selection"}/>

        </div>
    );
};

export default MySelection;
