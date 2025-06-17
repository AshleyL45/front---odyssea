import {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AdminBooking from "../../@types/AdminBooking";
import styles from "./AdminDashboard.module.css";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import {CircularProgress} from "@mui/material";
import AdminSort from "../../components/admin/AdminSort";
import StatusFilter from "../../components/admin/StatusFilter";
import NavbarDashboard from "../../components/navbars/NavbarDashboard";
import {useAdminDashboard} from "../../hooks/UseAdminDashboard";
import BookingCard from "../../components/admin/BookingCard";
import {useAuth} from "../../contexts/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

type bookingType = "Standard" | "Personalized";

const AdminDashboard = ({}) => {
    const [activeItem, setActiveItem] = useState<bookingType>("Standard");
    const [value, setValue] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
    const {logout} = useAuth();

    const {bookings, error, loading} = useAdminDashboard(value, statusFilter, activeItem, sortField, sortDirection);


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



    return (
        <>
            <NavbarDashboard/>
            <main style={{position: "relative"}}>
                <button style={{cursor: "pointer"}}>
                    <LogoutIcon className="logout-icon" onClick={logout} sx={{position: "absolute", right: "2rem", }}/>
                </button>

                <h1 className={styles.adminDashboardTitle}>Welcome to your dashboard, admin</h1>



                {error && <p style={{color: "red", marginLeft: "3rem"}}>{error}</p>}

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


                {
                    (bookings && bookings?.length > 0) ? (
                        <>
                            <section className={styles.bookingSection}>
                                {
                                    bookings.map((booking: AdminBooking) => (
                                        <BookingCard booking={booking} type={activeItem} key={booking.bookingId}/>
                                    ))
                                }
                            </section>
                        </>
                    ) : (!loading && bookings && bookings?.length <= 0) &&
                        <p className={styles.noDataMessage}> No bookings are available.</p>
                }
            </main>
        </>
    );
};

export default AdminDashboard;
