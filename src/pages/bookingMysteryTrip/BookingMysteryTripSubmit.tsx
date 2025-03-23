import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import styles from "../../styles/components/TripDashboard.module.css";
import {get, post} from "../../API/api";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import {Trip} from "../../@types/Trip";
import {AxiosError} from "axios"; // Importez AxiosError

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

// Fonction de formatage des dates pour le backend ("dd-MM-yyyy")
const formatDateForBackend = (isoString: string): string => {
    if (!isoString) return "";
    const dateObj = new Date(isoString);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
};

// Type guard pour vérifier si l'erreur est une AxiosError
function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
    return (error as AxiosError).isAxiosError !== undefined;
}

const BookingMysteryTripSubmit: FC = () => {
    const navigate = useNavigate();
    const {trip: contextTrip, questionnaireAnswers} = useReservation();
    const {userId} = useAuth();
    const [optionsToDisplay, setOptionsToDisplay] = useState<any[]>([]);
    const [error, setError] = useState("");

    // Récupération des infos de facturation depuis le localStorage
    const billingInfo: BillingInfo = JSON.parse(localStorage.getItem("billingInfo") || "{}");

    // Récupération de l'itinéraire mystère depuis le contexte ou le localStorage
    const storedTrip = localStorage.getItem("mysteryTripResult");
    const displayTrip: Trip | null = contextTrip || (storedTrip ? JSON.parse(storedTrip) : null);

    // Récupération et formatage des dates
    const storedDeparture = localStorage.getItem("departureDate") || "";
    const storedReturn = localStorage.getItem("returnDate") || "";
    const departureDateRaw =
        questionnaireAnswers.departureDate && questionnaireAnswers.departureDate.trim() !== ""
            ? questionnaireAnswers.departureDate
            : storedDeparture;
    const returnDateRaw =
        questionnaireAnswers.returnDate && questionnaireAnswers.returnDate.trim() !== ""
            ? questionnaireAnswers.returnDate
            : storedReturn;
    const departureDateDisplay = departureDateRaw ? new Date(departureDateRaw).toLocaleDateString() : "N/A";
    const returnDateDisplay = returnDateRaw ? new Date(returnDateRaw).toLocaleDateString() : "N/A";
    const departureDateFormatted = formatDateForBackend(departureDateRaw);
    const returnDateFormatted = formatDateForBackend(returnDateRaw);

    // Récupération des options sélectionnées
    useEffect(() => {
        const fetchOptionsById = async () => {
            if (!questionnaireAnswers.optionIds || questionnaireAnswers.optionIds.length === 0) {
                return;
            }
            try {
                const queryString = questionnaireAnswers.optionIds
                    .map((id: number) => `ids=${id}`)
                    .join("&");
                const options = await get(`/options/allById?${queryString}`);
                if (options) {
                    setOptionsToDisplay(options);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchOptionsById();
    }, [questionnaireAnswers.optionIds]);

    const handleNext = async () => {
        // Vérification que displayTrip existe et que son id n'est pas 0
        if (!displayTrip || displayTrip.id === 0) {
            setError("Error: Trip not selected. Please go back and choose a valid trip.");
            return;
        }

        // Vérification que userId est valide
        if (!userId || userId === 0) {
            setError("Error: User not logged in. Please log in to proceed.");
            return;
        }

        // Vérification que les dates sont valides
        if (!departureDateFormatted || !returnDateFormatted) {
            setError("Error: Invalid dates. Please select valid departure and return dates.");
            return;
        }

        // Construction des données de réservation
        const reservationData = {
            ...questionnaireAnswers,
            userId: userId,
            billingInfo,
            tripId: displayTrip.id,
            departureDate: departureDateFormatted,
            returnDate: returnDateFormatted,
        };

        console.log("Reservation Data:", reservationData);

        try {
            const postInfo = await post("/reservations", reservationData);
            console.log("Reservation ID récupéré :", postInfo.id);
            setError("");
            navigate("/dashboard");
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                // Si l'erreur est une AxiosError, affichez le message d'erreur du backend
                console.error("Cannot send reservation:", err);
                setError(err.response?.data?.message || "Une erreur est survenue lors de l'envoi de votre réservation.");
            } else {
                // Si l'erreur est inattendue, affichez un message générique
                console.error("Unexpected error:", err);
                setError("Une erreur inattendue est survenue.");
            }
        }
    };

    if (!displayTrip) {
        return <p>Loading trip details...</p>;
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div>
                <h1 style={{fontSize: "25px", margin: "10px 0", textAlign: "center"}}>Summary of your trip</h1>
                <div style={{width: 2, height: 30, backgroundColor: "black", margin: "auto"}}></div>
                <h2 className={styles.tripDashboardTitle}>{displayTrip.name}</h2>
                <hr/>
                <div>
                    <div className="recapDivs">
                        <h3>Dates</h3>
                        <p>Departure: {departureDateDisplay}</p>
                        <p>Return: {returnDateDisplay}</p>
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
                        <p><strong>Last Name:</strong> {billingInfo.lastName}</p>
                        <p><strong>First Name:</strong> {billingInfo.firstName}</p>
                        <p><strong>Email:</strong> {billingInfo.email}</p>
                        <p><strong>Phone Number:</strong> {billingInfo.phoneNumber}</p>
                        <p><strong>Company Name:</strong> {billingInfo.companyName || "N/A"}</p>
                        <p><strong>Address:</strong> {billingInfo.address}</p>
                        <p><strong>Address Details:</strong> {billingInfo.addressDetails || "N/A"}</p>
                        <p><strong>Postal Code:</strong> {billingInfo.postalCode}</p>
                        <p><strong>City:</strong> {billingInfo.city}</p>
                        <p><strong>Country:</strong> {billingInfo.country}</p>
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