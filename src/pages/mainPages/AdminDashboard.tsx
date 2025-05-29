import {ChangeEvent, FC, JSX, useEffect, useState} from 'react';
import BookingCard from "../../components/admin/BookingCard";
import AdminBooking from "../../@types/AdminBooking";
import {
    fetchAdminBookings,
    fetchAdminUserItineraries,
    searchBookings,
    searchUserItineraries
} from "../../services/AdminService";
import styles from "./AdminDashboard.module.css";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import {CircularProgress} from "@mui/material";

const AdminDashboard: ({}: {}) => JSX.Element = ({}) => {
    const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<string | null>("Standard");
    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let result;
                if (value && value.length > 3) {
                    result = (activeItem === "Standard")
                        ? await searchBookings(value)
                        : await searchUserItineraries(value);
                } else {
                    result = (activeItem === "Standard")
                        ? await fetchAdminBookings()
                        : await fetchAdminUserItineraries();
                }

                setBookings(result?.data);
            } catch (e) {
                console.error("Erreur de chargement des réservations", error);
                setBookings(null);
                setError("An error occurred while loading the bookings.");
            } finally {
                setLoading(false);
            }
        }
       fetchData()
    }, [value, activeItem]);


    const handleInputValue = (event : ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        console.log(event.target.value);
    }



    return (
        <div>
            <h1>Welcome to your dashboard, admin</h1>

            {error && <p style={{color: "red"}}>{error}</p>}

            <div className={styles.buttonContainer}>
                <button onClick={() => setActiveItem("Standard")} className={activeItem === "Standard" ? styles.active : styles.typeButton}>
                    Standard
                </button>
                <button onClick={() => setActiveItem("Personalized")}
                        className={activeItem === "Personalized" ? styles.active : styles.typeButton}>
                    Personalized
                </button>
            </div>

            <AdminSearchBar onChange={handleInputValue}/>

            {
                loading && <CircularProgress sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}/>
            }


            <section className={styles.bookingSection}>
                {
                    (bookings && bookings?.length > 0) ? bookings.map((booking: AdminBooking) => (
                            <BookingCard booking={booking} key={booking.bookingId}/>
                        )) :
                        <p className={styles.noDataMessage}> No bookings are available.</p>
                }
            </section>


        </div>
    );
};

export default AdminDashboard;
