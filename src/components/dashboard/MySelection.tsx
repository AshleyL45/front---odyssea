import {FC, JSX, useEffect, useState} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {useMySelectionContext} from "../../contexts/MySelectionContext";
import {Trip} from "../../@types/Trip";
import {useNavigate} from "react-router-dom";
import "../../App.css"

const MySelection: ({}: {}) => JSX.Element = ({}) => {
    const[sortPrice, setSortPrice] = useState(false);
    const {favorites} = useMySelectionContext();
    const [sortedFavorites, setSortedFavorites] = useState<Trip[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSortedFavorites([...favorites]);
    }, [favorites]);

    const handleSorting = () => {
        let sorted = [...favorites];

        sorted.sort((a, b) => {
            return sortPrice ? a.price - b.price : b.price - a.price;
        });
        setSortPrice((prev) => !prev);

        setSortedFavorites(sorted);
        console.log(JSON.stringify(sorted))
    }

    return (
        <div className="container-myselection">
            <h1 style={{ fontFamily: "Literata, serif", fontSize: "1.7rem", fontWeight: 400}}>My selection</h1>

            <div style={{display: "flex", justifyContent: "center", width: "40%", margin: "auto"}}>
                <p onClick={() => handleSorting()}
                   style={{display: "flex", alignItems: "center", justifyContent: "center"}}>Price {sortPrice ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
            </div>

            {sortedFavorites && sortedFavorites.length > 0 ? (
                sortedFavorites.map((favorite) => (
                    <TripDashboard key={favorite.id} trip={favorite} page={"My selection"}/>
                ))
            ) : (
                <p style={{textAlign: "center", marginTop: "2rem"}}>You don't have any favorites. View our <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => navigate("/trips")}>trips</span>.</p>
            )}

        </div>
    );
};

export default MySelection;
