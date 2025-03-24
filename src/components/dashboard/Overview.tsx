import {FC, JSX, useEffect, useState} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import {Trip} from "../../@types/Trip";
import TripNumbers from "../../styles/components/TripNumbers";
import {get} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useFavorites} from "../../contexts/MySelectionContext";
import {useDashboard} from "../../contexts/DashboardContext";

const Overview: ({}: {}) => JSX.Element = ({}) => {
    const {userReservations, lastDoneReservation, pastTrips} = useDashboard();
    const navigate = useNavigate();
    const {favorites} = useFavorites();
    console.log(userReservations)

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    return (
        <div className="container-overview">
            <h1>Overview</h1>

            <div className="container-trip-number">
                <TripNumbers title={"Current"} number={userReservations.length}/>
                <TripNumbers title={"My selection"} number={favorites.length}/>
                <TripNumbers title={"Travel history"} number={pastTrips.length}/>
            </div>

            <h2 className="sub-title">Current trip</h2>
            {
                userReservations ? userReservations.map((trip) => (
                    <TripDashboard trip={trip} page="Overview"/>
                    )
                ) : <p style={{marginLeft: "8rem"}}>No current trips.</p>
            }


            <h2 className="sub-title">Last Trip</h2>
            {
                lastDoneReservation ? (
                    <TripDashboard trip={lastDoneReservation} page="Overview"/>
                ) : <p style={{marginLeft: "8rem", marginBottom: "2rem"}}>No trips done and booked yet. </p>
            }


        </div>
    );
};

export default Overview;
