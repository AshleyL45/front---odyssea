import {FC, JSX, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import TripDashboard from "../ReusableComponents/TripDashboard";
import {get} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";
import {useDashboard} from "../../contexts/DashboardContext";

const History: ({}: {}) => JSX.Element = ({}) => {
   const{userBookings} = useDashboard();

    return (
        <div className="container-history">
            <h1 style={{fontSize: "1.8rem"}}>Travel History</h1>
            <div>
                {
                    userBookings && userBookings.length > 0 ? userBookings.map((userBooking) => (
                        <>
                            <p style={{marginLeft: "5rem"}}>{userBooking.purchaseDate}</p>
                            <TripDashboard trip={userBooking} page="Travel History" type={"Pre-designed trip"}/>
                        </>
                    )) : (
                        <p style={{margin: "10px 15%"}}>There are no past bookings. Once you have done a trip, your past bookings you will be here.</p>
                    )
                }
            </div>

        </div>
    );
};

export default History;
