import {FC, JSX, useEffect, useState} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import {Trip} from "../../@types/Trip";
import TripNumbers from "../../styles/components/TripNumbers";
import {get} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useFavorites} from "../../contexts/MySelectionContext";

const Overview: ({}: {}) => JSX.Element = ({}) => {
    const {userId} = useAuth();
    const [userReservations, setUserReservations] = useState<Trip[]>([]);
    const navigate = useNavigate();
    //const {favorites} = useFavorites();
    //TODO : Faire requête API pour avoir le dernier voyage, le voyage en cours et le nombre de voyage (en cours, de "ma séléction" et dans l'historique)
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const reservations = await get(`/reservations/${userId}`);

                if (reservations) {
                    setUserReservations(reservations);
                }
            } catch (e) {
                console.error("Error while fetching reservations : ", e);
            }
        }
        fetchReservations();

    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Avoir la dernière réservation en cours
    const firstOngoingReservation: Trip | undefined = userReservations.find((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "En attente" && reservationDate < today;
    });

    // Avoir la dernière réservation confirmée et passée
    const lastDoneReservation : Trip | undefined = userReservations.find((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "En attente" && reservationDate > today;
    });

    //Avoir le nombre de favoris
    // Avoir le nombre de voyages en attente ou en cours
    const currentTrips = userReservations.filter((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "En attente" && reservationDate < today
    })
    // Avoir le nombre de voyages passée
    const pastTrips = userReservations.filter((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "Confirmé" && reservationDate > today
    })


    return (
        <div>
            <h1 style={{marginLeft: "8rem", marginTop: "1.8rem", marginBottom: "2rem", fontSize: "1.8rem"}}>Overview</h1>
            <div style={{display: "flex", justifyContent: "space-around", width: "85%", margin: "auto"}}>
                <TripNumbers title={"Current"} number={currentTrips.length}/>
                {/*<TripNumbers title={"My selection"} number={favorites.length}/>*/}
                <TripNumbers title={"Travel history"} number={pastTrips.length}/>
            </div>

            <h2 style={{marginLeft: "8rem", marginTop: "1rem", fontSize: "1.4rem"}}>Current trip</h2>
            {
                firstOngoingReservation ? (
                    <TripDashboard trip={firstOngoingReservation} page="Overview"/>
                ) : <p style={{marginLeft: "8rem"}}>Aucune réservation en cours.</p>
            }


            <h2 style={{marginLeft: "8rem", marginTop: "1rem", fontSize: "1.4rem"}}>Last Trip</h2>
            {
                lastDoneReservation ? (
                    <TripDashboard trip={lastDoneReservation} page="Overview"/>
                ) : <p style={{marginLeft: "8rem"}}>No trips booked yet. <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => navigate("/trips")}>Discover</span> our handpicked itineraries and plan
                    your dream getaway!</p>
            }


        </div>
    );
};

export default Overview;
