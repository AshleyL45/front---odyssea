import {JSX} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import {useUserDashboard} from "../../contexts/DashboardContext";
import {formatDate} from "../../utils/FormatDate";

const History: ({}: {}) => JSX.Element = ({}) => {
   const {pastTrips} = useUserDashboard();


    return (
        <div className="container-history">
            <h1 style={{fontFamily: "Literata, serif", fontSize: "1.7rem", fontWeight: 400}}>Travel History</h1>
            <section>
                {
                    pastTrips && pastTrips.length > 0 ? pastTrips.map((booking) => (
                        <>
                            <p style={{marginLeft: "5rem"}}>{formatDate(booking.purchaseDate)}</p>
                            <TripDashboard booking={booking} page="Travel History" type={"Pre-designed trip"}/>
                        </>
                    )) : (
                        <p style={{margin: "10px 15%"}}>There are no past reservations. Once you have done a trip, your past reservations you will be here.</p>
                    )
                }
            </section>

        </div>
    );
};

export default History;
