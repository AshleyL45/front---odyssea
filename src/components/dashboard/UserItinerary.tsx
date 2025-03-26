import {FC, JSX} from 'react';
import {useParams} from "react-router-dom";
import styles from "../../styles/components/TripDashboard.module.css"
import {Reservation} from "../../@types/Reservation";

interface UserItinerary {
    id: number;
    userId: number;
    startDate: string;
    endDate: string;
    startingPrice: number;
    totalDuration: number;
    departureCity: string;
    itineraryName: string | null;
    numberOfAdults: number;
    numberOfKids: number;
}

type UserItineraryProps = {
    userItinerary: UserItinerary
}

const UserItinerary: FC<UserItineraryProps> = ({userItinerary}) => {

    return (
        <div className={styles.tripDashboardContainer} style={{minHeight: 210}}>
            {userItinerary.itineraryName === null || userItinerary.itineraryName ==="null" ? <h2>Itinerary n° {userItinerary.id}</h2> : <h2>{userItinerary.itineraryName}</h2> }
            <p>Departure city : {userItinerary.departureCity.toUpperCase()}</p>
            <p>Start date : {userItinerary.startDate}</p>
            <p>End date : {userItinerary.endDate}</p>
            <p style={{marginTop: "1.5rem"}}>Starting price : {userItinerary.startingPrice} €</p>

        </div>
    );
};

export default UserItinerary;
