import InteractiveMapPersItinerary from "../interactiveMaps/InteractiveMapPersItinerary";
import RecapOneDay from "../recapTrip/RecapOneDay";
import {ItineraryDay} from "../../@types/PersonalizeTrip";
import styles from "./AdminUserItineraryDetails.module.css"

interface AdminUserItineraryRecapProps {
    itineraryDays: ItineraryDay[];
}
const AdminUserItineraryRecap = ({itineraryDays} : AdminUserItineraryRecapProps) => {

    return (
        <>
            <h2 style={{textAlign: "center", margin: "20px 0", fontSize: "1.7rem", fontFamily: "Literata, serif", fontWeight: 400}}>Detailed program</h2>

            <section className={styles.sectionRecap} style={{display: "flex", justifyContent: "space-around", alignItems: "start", gap: 50, padding: 40}}>
                <aside  className={styles.mapWrapperRecap}>
                    <InteractiveMapPersItinerary/>
                </aside>

                <div className={styles.recapTrip}>
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
