import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import styles from "../../styles/components/TripDashboard.module.css";
import {get, post} from "../../API/api";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import {Trip} from "../../@types/Trip";
import {AxiosError} from "axios";

interface BillingInfo {
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    companyName?: string;
    address: string;
    addressDetails?: string;
    postalCode: string;
    city: string;
    country: string;
}

const formatDateForBackend = (isoString: string): string => {
    if (!isoString) return "";
    const dateObj = new Date(isoString);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
};

function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
    return (error as AxiosError).isAxiosError !== undefined;
}

const BookingMysteryTripSubmit: FC = () => {
    const navigate = useNavigate();
    const {trip, questionnaireAnswers} = useReservation();
    const {userId} = useAuth();
    const [optionsToDisplay, setOptionsToDisplay] = useState<any[]>([]);
    const [error, setError] = useState("");

    const billing: BillingInfo = JSON.parse(localStorage.getItem("billingInfo") || "{}");
    const depDate: string = localStorage.getItem("departureDate") || "";
    const retDate: string = localStorage.getItem("returnDate") || "";
    const departureDateFormatted = formatDateForBackend(depDate);
    const returnDateFormatted = formatDateForBackend(retDate);

    let validTrip: Trip | null = trip;
    if (!validTrip || validTrip.id === 0) {
        const storedTrip = localStorage.getItem("validTrip");
        if (storedTrip) {
            validTrip = JSON.parse(storedTrip);
            console.log("Fallback validTrip from localStorage:", validTrip);
        }
    }
    if (!validTrip || validTrip.id === 0) {
        setError("Error: No valid trip found. Please go back and select a valid trip.");
    }

    useEffect(() => {
        const fetchOptionsById = async () => {
            if (!questionnaireAnswers.optionIds || questionnaireAnswers.optionIds.length === 0) return;
            try {
                const queryString = questionnaireAnswers.optionIds
                    .map((id: number) => `ids=${id}`)
                    .join("&");
                const options = await get(`/options/allById?${queryString}`);
                if (options) setOptionsToDisplay(options);
            } catch (e) {
                console.error(e);
            }
        };
        fetchOptionsById();
    }, [questionnaireAnswers.optionIds]);

    const handleNext = async () => {
        if (!validTrip || validTrip.id === 0) {
            setError("Error: Trip not selected or invalid. Please go back and choose a valid trip.");
            return;
        }
        if (!userId || userId === 0) {
            setError("Error: User not logged in. Please log in to proceed.");
            return;
        }
        if (!departureDateFormatted || !returnDateFormatted) {
            setError("Error: Invalid dates. Please select valid departure and return dates.");
            return;
        }

        const reservationData = {
            ...questionnaireAnswers,
            userId: userId,
            billingInfo: billing,
            itineraryId: validTrip.id,
            departureDate: departureDateFormatted,
            returnDate: returnDateFormatted,
        };

        console.log("Reservation Data:", reservationData);

        try {
            const postInfo = await post("/reservations", reservationData);
            console.log("Reservation ID retrieved:", postInfo.id);
            setError("");
            navigate("/dashboard");
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                console.error("Cannot send reservation:", err);
                setError(err.response?.data?.message || "An error has occurred while sending your reservation.");
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error has occurred.");
            }
        }
    };

    if (!validTrip) {
        return <p>Loading trip details...</p>;
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div>
                <h1 style={{fontSize: "25px", margin: "10px 0", textAlign: "center"}}>Summary of your trip</h1>
                <div style={{width: 2, height: 30, backgroundColor: "black", margin: "auto"}}></div>
                <h2 className={styles.tripDashboardTitle}>{validTrip.name}</h2>
                <hr/>
                <div>
                    <div className="recapDivs">
                        <h3>Dates</h3>
                        <p>Departure: {depDate ? new Date(depDate).toLocaleDateString() : "N/A"}</p>
                        <p>Return: {retDate ? new Date(retDate).toLocaleDateString() : "N/A"}</p>
                    </div>
                    <div className="recapDivs">
                        <h3>Travellers</h3>
                        {questionnaireAnswers.numberOfAdults === 1 ? (
                            <p>{questionnaireAnswers.numberOfAdults} adult</p>
                        ) : (
                            <p>{questionnaireAnswers.numberOfAdults} adults</p>
                        )}
                        {questionnaireAnswers.numberOfKids !== 0 && (
                            <p>{questionnaireAnswers.numberOfKids} kids (below 18 years old)</p>
                        )}
                    </div>
                    <div className="recapDivs">
                        <h3>Customer Information</h3>
                        <p><strong>Last Name:</strong> {billing.lastName}</p>
                        <p><strong>First Name:</strong> {billing.firstName}</p>
                        <p><strong>Email:</strong> {billing.email}</p>
                        <p><strong>Phone Number:</strong> {billing.phoneNumber}</p>
                        <p><strong>Company Name:</strong> {billing.companyName || "N/A"}</p>
                        <p><strong>Address:</strong> {billing.address}</p>
                        <p><strong>Address Details:</strong> {billing.addressDetails || "N/A"}</p>
                        <p><strong>Postal Code:</strong> {billing.postalCode}</p>
                        <p><strong>City:</strong> {billing.city}</p>
                        <p><strong>Country:</strong> {billing.country}</p>
                    </div>
                    <div className="recapDivs">
                        <h3>Options</h3>
                        {optionsToDisplay && optionsToDisplay.length > 0 ? (
                            optionsToDisplay.map((option) => (
                                <p key={option.id}>{option.name}</p>
                            ))
                        ) : (
                            <p>No options were chosen.</p>
                        )}
                    </div>
                </div>
                {error !== "" && <p style={{color: "red"}}>{error}</p>}
                <div style={{display: "flex", justifyContent: "center"}}>
                    <CustomButton style={{width: "130px"}} variant="contained" onClick={handleNext}>
                        Submit
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default BookingMysteryTripSubmit;
