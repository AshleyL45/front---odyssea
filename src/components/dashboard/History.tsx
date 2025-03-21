import {FC, JSX, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import TripDashboard from "../ReusableComponents/TripDashboard";
import {get} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";
import {useDashboard} from "../../contexts/DashboardContext";

const History: ({}: {}) => JSX.Element = ({}) => {
   const{userReservations} = useDashboard();

    return (
        <div>
            <h1 style={{
                marginLeft: "8rem",
                marginTop: "1.8rem",
                marginBottom: "2rem",
                fontSize: "1.8rem"
            }}>Travel History</h1>
            <div>
                {
                    userReservations && userReservations.length > 0 ? userReservations.map((userReservation) => (
                        <>
                            <p style={{marginLeft: "8rem"}}>{userReservation.purchaseDate}</p>
                            <TripDashboard trip={userReservation} page="Travel History" type={"Pre-designed trip"}/>
                        </>
                    )) : (
                        <p style={{marginLeft: "8rem"}}>There are no past reservations. Once you have done a trip, your past reservations you will be here.</p>
                    )
                }
            </div>

        </div>
    );
};

export default History;
