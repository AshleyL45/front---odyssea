import {FC, JSX, useEffect, useState} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {useFavorites} from "../../contexts/MySelectionContext";
import {Trip} from "../../@types/Trip";

const MySelection: ({}: {}) => JSX.Element = ({}) => {
    const[sortPrice, setSortPrice] = useState(false);
    const [sortDuration, setSortDuration] = useState(false);
    const {favorites} = useFavorites();
    const [sortedFavorites, setSortedFavorites] = useState<Trip[]>([]);

    useEffect(() => {
        setSortedFavorites([...favorites]);
    }, [favorites]);

    const handleSorting = (type: string) => {
        let sorted = [...favorites];

        switch (type){
            case "Prix":
                setSortDuration(false)
                sorted.sort((a, b) => {
                    return sortPrice ? a.price - b.price : b.price - a.price;
                });
                setSortPrice((prev) => !prev);
                break;
            case "Durée":
                setSortPrice(false)
                sorted.sort((a, b) => {
                    return sortDuration ? a.totalDuration - b.totalDuration : b.totalDuration - a.totalDuration;
                });
                setSortDuration((prev) => !prev);
                break;

            default:
                break;
        }
        setSortedFavorites(sorted);
        console.log(JSON.stringify(sorted))
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
                <p onClick={() => handleSorting("Prix")}
                   style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>Prix {sortPrice ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
                <p onClick={() => handleSorting("Durée")}
                   style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>Durée {sortDuration ? <ExpandLessIcon/> :
                    <ExpandMoreIcon/>}</p>
            </div>

            {sortedFavorites && sortedFavorites.length > 0 ? (
                sortedFavorites.map((favorite) => (
                    <TripDashboard key={favorite.id} trip={favorite} page={"My selection"}/>
                ))
            ) : (
                <p style={{textAlign: "center", marginTop: "2rem"}}>Aucun favori à afficher.</p>
            )}

        </div>
    );
};

export default MySelection;
