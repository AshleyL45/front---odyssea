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

            <section style={{display: "flex", justifyContent: "space-around", alignItems: "start", gap: 50, padding: 40}}>
                <aside className="map-wrapper">
                    <InteractiveMapPersItinerary/>
                </aside>

                <div className="recap-trip">
                    <ul style={{listStyle: "none"}}>
                        {itineraryDays?.map((day: any) => (
                            <li key={day.dayNumber}>
                                <RecapOneDay day={day} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default AdminUserItineraryRecap;
