import {FC, JSX, useEffect} from 'react';
import styles from "../../styles/components/TripDashboard.module.css"
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../utils/FormatDate";

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
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User itinerary id : " + userItinerary.id + " itinerary name " + userItinerary.itineraryName);
    }, []);
    return (
        <div className={styles.tripDashboardContainer} style={{minHeight: 210}}>
            {userItinerary.itineraryName === null || userItinerary.itineraryName.length === 0 ?
                <h2>Itinerary n° {userItinerary.id}</h2> : <h2>{userItinerary.itineraryName}</h2>}
            <hr/>

            <ul className={styles.tripInfo}>
                <li>Departure city : {userItinerary.departureCity}</li>
                <li>Start date : {formatDate(userItinerary.startDate)}</li>
                <li>End date : {formatDate(userItinerary.endDate)}</li>
            </ul>

            <div className={styles.mainInfo}>
                <p style={{marginTop: "1.5rem"}}>Starting price : {userItinerary.startingPrice} €</p>

                <button className={styles.detailsButton}
                        onClick={() => navigate(`/personalized-trip/details/${userItinerary.id}`)}>Details
                </button>
            </div>


        </div>
    );
};

export default UserItinerary;
