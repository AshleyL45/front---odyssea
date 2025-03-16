import {FC, JSX, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import TripDashboard from "../ReusableComponents/TripDashboard";
import {get} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";

const History: ({}: {}) => JSX.Element = ({}) => {
    const [userReservations, setUserReservations] = useState<Trip[]>([]);
    const {userId} = useAuth();

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


    return (
        <div>
            <h1 style={{
                marginLeft: "8rem",
                marginTop: "1.8rem",
                marginBottom: "2rem",
                fontSize: "1.8rem"
            }}>Historique</h1>
            <div>
                {
                    userReservations && userReservations.length > 0 && userReservations.map((userReservation) => (
                        <>
                            <p style={{marginLeft: "8rem"}}>{userReservation.purchaseDate}</p>
                            <TripDashboard trip={userReservation} page="Travel History" type={"Pre-designed trip"}/>
                        </>
                    ))
                }
            </div>

        </div>
    );
};

export default History;
