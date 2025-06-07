import {ChangeEvent, FC, JSX, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import BookingCard from "../../components/admin/BookingCard";
import AdminBooking from "../../@types/AdminBooking";
import {
    fetchAdminBookings,
    fetchAdminUserItineraries,
} from "../../services/AdminService";
import styles from "./AdminDashboard.module.css";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import {CircularProgress} from "@mui/material";
import AdminSort from "../../components/admin/AdminSort";
import StatusFilter from "../../components/admin/StatusFilter";
import NavbarDashboard from "../../components/navbars/NavbarDashboard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type bookingType = "Standard" | "Personalized";

const AdminDashboard: ({}: {}) => JSX.Element = ({}) => {
    const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<bookingType>("Standard");
    const [value, setValue] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const filters = {
                    search: value || undefined,
                    status: statusFilter || undefined,
                    sortField: sortField || undefined,
                    sortDirection: sortDirection || undefined ,
                };

                if(activeItem === "Standard"){
                    const result = await fetchAdminBookings(filters);
                    setBookings(result.data);
                } else {
                    const result = await fetchAdminUserItineraries(filters);
                    setBookings(result.data);
                }

            } catch (e) {
                console.error("Erreur de chargement des réservations", error);
                setBookings(null);
                setError("An error occurred while loading the bookings.");
            } finally {
                setLoading(false);
            }
        }
       fetchData()
    }, [value, activeItem, statusFilter, sortField, sortDirection]);


    const handleInputValue = (event : ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleStatusFilter = (status : string) => {
        setStatusFilter(status);
    }

    const handleSortChange = (field: string, direction: "asc" | "desc") => {
        setSortField(field);
        setSortDirection(direction);
    };

    const switchType = (type: bookingType) => {
        setActiveItem(type);
        setValue(null);
        setStatusFilter(null);
        setSortField(null);
        setSortDirection(null);
    };

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <main>
            <NavbarDashboard/>
            <h1>Welcome to your dashboard, admin</h1>


            {error && <p style={{color: "red"}}>{error}</p>}

            <div className={styles.buttonContainer}>
                <button onClick={() => switchType("Standard")}
                        className={activeItem === "Standard" ? styles.active : styles.typeButton}>
                    Standard
                </button>
                <button onClick={() => switchType("Personalized")}
                        className={activeItem === "Personalized" ? styles.active : styles.typeButton}>
                    Personalized
                </button>
            </div>

            <section className={styles.filters}>
                <AdminSearchBar onChange={handleInputValue}/>
                <AdminSort type={activeItem} onSortChange={handleSortChange}/>
                <StatusFilter onStatusChange={handleStatusFilter}/>
            </section>


            {
                loading && <CircularProgress
                    sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}/>
            }


            <section className={styles.bookingSection}>
                {
                    (bookings && bookings?.length > 0) ? bookings.map((booking: AdminBooking) => (
                            <BookingCard booking={booking} type={activeItem} key={booking.bookingId}/>
                        )) :
                        <p className={styles.noDataMessage}> No bookings are available.</p>
                }
            </section>


        </main>
    );
};

export default AdminDashboard;
