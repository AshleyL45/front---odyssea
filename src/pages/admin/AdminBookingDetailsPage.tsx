import {JSX, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import styles from "./AdminBookingDetailsPage.module.css";

import {AdminBookingDetails} from "../../@types/AdminBookingDetails";
import {fetchBookingDetails, fetchUserItineraryDetails} from "../../services/AdminService";

import StandardBookingDetails from "../../components/admin/booking-details/StandardBookingDetails";
import PersonalizedTripDetails from "../../components/admin/booking-details/PersonalizedTripDetails";
import {AdminUserItineraryDetails} from "../../@types/AdminUserItineraryDetails";
import {Backdrop, CircularProgress} from "@mui/material";



const AdminBookingDetailsPage = (): JSX.Element => {
    const {id} = useParams();
    const bookingId = Number(id);
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const [loading, setLoading] = useState(false);


    const [data, setData] = useState<AdminBookingDetails |AdminUserItineraryDetails | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
                    console.log("Details:\n" + JSON.stringify(response.data, null, 2));

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

    return (
        <>
            {
                loading && (
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
                )
            }

            <div>
                <h1 className={styles["details-title"]}>
                    {data?.userFirstName} {data?.userLastName}
                </h1>

                {errorMessage && <p>{errorMessage}</p>}

                {type === "Standard" && data && !isPersonalizedTrip(data) && (
                    <StandardBookingDetails data={data} bookingId={bookingId}/>
                )}

                {type === "Personalized" && data && isPersonalizedTrip(data) && (
                    <PersonalizedTripDetails data={data}/>
                )}
            </div>
        </>
    );
};

export default AdminBookingDetailsPage;
