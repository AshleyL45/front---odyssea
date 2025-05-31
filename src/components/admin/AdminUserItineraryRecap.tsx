import {FC} from 'react';
import InteractiveMapPersItinerary from "../interactiveMaps/InteractiveMapPersItinerary";
import RecapOneDay from "../recapTrip/RecapOneDay";
import {ItineraryDay} from "../../@types/PersonalizeTrip";

interface AdminUserItineraryRecapProps {
    itineraryDays: ItineraryDay[];
}
const AdminUserItineraryRecap = ({itineraryDays} : AdminUserItineraryRecapProps) => {

    return (
        <>
            <h2 style={{textAlign: "center", margin: "20px 0", fontSize: "1.5rem"}}>Detailed program</h2>

            <div style={{display: "flex", justifyContent: "space-around", alignItems: "start", gap: 50, padding: 40}}>
                <div className="map-wrapper">
                    <InteractiveMapPersItinerary/>
                </div>
                <div className="recap-trip">
                    <div>
                        {itineraryDays?.map((day: any) => (
                            <RecapOneDay key={day.dayNumber} day={day}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUserItineraryRecap;
