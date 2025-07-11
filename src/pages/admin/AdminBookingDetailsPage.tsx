import {JSX, useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import styles from "./AdminBookingDetailsPage.module.css";

import {AdminBookingDetails} from "../../@types/AdminBookingDetails";
import {fetchBookingDetails, fetchUserItineraryDetails} from "../../services/AdminService";

import StandardBookingDetails from "../../components/admin/booking-details/StandardBookingDetails";
import PersonalizedTripDetails from "../../components/admin/booking-details/PersonalizedTripDetails";
import {AdminUserItineraryDetails} from "../../@types/AdminUserItineraryDetails";
import {Backdrop, CircularProgress} from "@mui/material";
import NavbarDashboard from "../../components/navbars/NavbarDashboard";
import {BookingDetailsProvider} from "../../contexts/BookingDetailsContext";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Pages from "../../components/layout/Pages";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

const AdminBookingDetailsPage = (): JSX.Element => {
    const {id} = useParams();
    const bookingId = Number(id);
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") as "Standard" | "Personalized";
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<AdminBookingDetails | AdminUserItineraryDetails | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const isPersonalizedTrip = (booking: any): booking is AdminUserItineraryDetails => {
        return booking && "itineraryDays" in booking;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response =
                    type === "Personalized"
                        ? await fetchUserItineraryDetails(bookingId)
                        : await fetchBookingDetails(bookingId);

                if (response?.data) {
                    setData(response.data);
                }
            } catch (e) {
                console.error(e);
                setErrorMessage("An error occurred while fetching this booking.");
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookingId, type]);

    const getInitialStatus = (): BookingStatus => {
        if (!data) return "PENDING";
        console.log("Data is : " + JSON.stringify(data));
        if (type === "Standard" && !isPersonalizedTrip(data)) return data.booking.status as BookingStatus;
        if (type === "Personalized" && isPersonalizedTrip(data)) return data.status;
        return "PENDING";
    };

    const getInitialPrice = (): number => {
        if (!data) return 0;
        if (type === "Standard" && !isPersonalizedTrip(data)) return data.booking.totalPrice;
        if (type === "Personalized" && isPersonalizedTrip(data)) return data.startingPrice;
        return 0;
    };

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <Pages title={"Itinerary Details - Admin Panel"}>
            <NavbarDashboard/>
            <button onClick={handleGoBack} className={styles.previousPageButton}>
                <ArrowBackIosNewIcon sx={{fontSize: "12px"}}/> previous page
            </button>
            {loading && (
                <Backdrop
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            )}

            <h1 className={styles["details-title"]}>
                {data?.userFirstName} {data?.userLastName}
            </h1>

            {errorMessage && <p style={{textAlign: "center", color: "red", marginTop: "2rem"}}>{errorMessage}</p>}

            {data && (
                <BookingDetailsProvider
                    initialData={{
                        bookingId,
                        bookingType: type,
                        status: getInitialStatus(),
                        price: getInitialPrice()
                    }}
                >
                    {type === "Standard" && !isPersonalizedTrip(data) && (
                        <StandardBookingDetails data={data}/>
                    )}
                    {type === "Personalized" && isPersonalizedTrip(data) && (
                        <PersonalizedTripDetails data={data}/>
                    )}
                </BookingDetailsProvider>
            )}
        </Pages>
    );
};

export default AdminBookingDetailsPage;
