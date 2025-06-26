import {JSX, useMemo, useState} from 'react';
import UserItinerary from "./UserItinerary";
import {useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {useUserDashboard} from "../../contexts/DashboardContext";
import BookingFilters from "./BookingFilters";


const PersonalizedTrips: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const {personalizedTrips, error} = useUserDashboard();

    // Gestion des filtres
    const filteredBookings = useMemo(() => {
        if (activeFilter === "All") return personalizedTrips;
        return personalizedTrips.filter(
            (booking) =>
                booking.status?.toLowerCase() === activeFilter.toLowerCase()
        );
    }, [activeFilter, personalizedTrips]);

    const filters = ["All", "Pending", "Confirmed", "Cancelled"];

    return (
        <section>
            <div style={{position: "relative"}}>

                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    minHeight: "80vh"
                }}>

                    <h2 style={{
                        marginLeft: "2rem",
                        marginTop: "2rem",
                        fontSize: "1.7rem",
                        textAlign: "left",
                        fontFamily: "Literata, serif",
                        fontWeight: 400
                    }}>My personalized trips</h2>

                    <BookingFilters
                        filters={filters}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />

                    <section style={{height: "100vh"}}>
                        {
                            error ?  <p style={{color: "red", marginLeft: "3rem"}}>An error occurred while fetching your bookings.</p> : (
                                <>
                                {
                                    filteredBookings && filteredBookings.length > 0 ? filteredBookings.map((personalizedTrip) =>
                                        <UserItinerary userItinerary={personalizedTrip} key={personalizedTrip.id}/>
                                    ) : (
                                            <p style={{marginLeft: "4rem"}}>You don't have a personalized trip with this filter.</p>
                                        )
                                }
                                </>

                            )
                        }
                    </section>

                </div>
            </div>

        </section>
    );
};

export default PersonalizedTrips;
