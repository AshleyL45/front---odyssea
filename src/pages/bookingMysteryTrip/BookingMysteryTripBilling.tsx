import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useBooking} from "../../contexts/BookingContext";
import Pages from "../../components/layout/Pages";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import styles from "../../styles/BookingMysteryTrip/BookingMysteryTrip.module.css";
import {useUsernames} from "../../hooks/UseUsernames";

const BookingMysteryTripBilling: FC = () => {
    const navigate = useNavigate();
    const { firstName: authFirstName, lastName: authLastName } = useUsernames();
    const [firstName, setFirstName] = useState(authFirstName || "");
    const [lastName, setLastName] = useState(authLastName || "");

    useEffect(() => {
        if (authFirstName) setFirstName(authFirstName);
        if (authLastName) setLastName(authLastName);
    }, [authFirstName, authLastName]);

    const {questionnaireAnswers, updateResponse} = useBooking();

    const [email, setEmail] = useState(
        questionnaireAnswers.email || ""
    );
    const [phoneNumber, setPhoneNumber] = useState(
        questionnaireAnswers.phoneNumber || ""
    );
    const [companyName, setCompanyName] = useState(
        questionnaireAnswers.companyName || ""
    );
    const [address, setAddress] = useState(
        questionnaireAnswers.address || ""
    );
    const [addressDetails, setAddressDetails] = useState(
        questionnaireAnswers.addressDetails || ""
    );
    const [postalCode, setPostalCode] = useState(
        questionnaireAnswers.postalCode || ""
    );
    const [city, setCity] = useState(questionnaireAnswers.city || "");
    const [country, setCountry] = useState(
        questionnaireAnswers.country || ""
    );
    const [agreed, setAgreed] = useState(
        questionnaireAnswers.agreedToTerms || false
    );
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        if (!lastName?.trim()) newErrors.push("Last Name is required.");
        if (!firstName?.trim()) newErrors.push("First Name is required.");
        if (!email.trim()) newErrors.push("Email is required.");
        if (!phoneNumber.trim()) newErrors.push("Phone Number is required.");
        if (!address.trim()) newErrors.push("Address is required.");
        if (!postalCode.trim()) newErrors.push("Postal Code is required.");
        if (!city.trim()) newErrors.push("City is required.");
        if (!country.trim()) newErrors.push("Country is required.");
        if (!agreed) newErrors.push("You must agree to the terms.");

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleNextClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Mémorisation dans le contexte
        updateResponse("lastName", lastName);
        updateResponse("firstName", firstName);
        updateResponse("email", email);
        updateResponse("phoneNumber", phoneNumber);
        updateResponse("companyName", companyName);
        updateResponse("address", address);
        updateResponse("addressDetails", addressDetails);
        updateResponse("postalCode", postalCode);
        updateResponse("city", city);
        updateResponse("country", country);
        updateResponse("agreedToTerms", agreed);

        // Passage à l’étape suivante
        navigate("/booking-mystery-trip/result");
    };

    return (
        <>
            <Pages title="Booking – Mystery Trip">
            </Pages>
            <header>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar}/>
                </div>

                <a className={styles.previousStep} style={{background: 'none', stroke: 'none'}}
                   onClick={() => navigate(-1)}>
                    <ArrowBackIcon fontSize="small"/>
                    Previous step
                </a>
            </header>
            <main>
                <div className={styles.optionSelect}>
                    <h1>Your billing information</h1>
                    <h2 style={{fontWeight: 'lighter'}}>Please fill in to finalize your reservation.</h2>

                    <h3>Contact Details</h3>
                    <div className={styles.formGrid}>
                        <input
                            type="text"
                            placeholder="Last Name*"
                            value={lastName}
                            className={styles.inputBooking}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="First Name*"
                            value={firstName}
                            className={styles.inputBooking}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.inputBooking}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number*"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={styles.inputBooking}
                        />
                    </div>

                    <h3>Address</h3>
                    <div className={styles.formGridAddress}>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className={styles.inputBooking}
                        />
                        <input
                            type="text"
                            placeholder="Address*"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={styles.inputBooking}
                        />
                        <input
                            type="text"
                            placeholder="Address details"
                            value={addressDetails}
                            onChange={(e) => setAddressDetails(e.target.value)}
                            className={styles.inputBooking}
                        />
                        <input
                            type="text"
                            placeholder="Postal code*"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className={styles.inputBooking}
                        />
                        <input
                            type="text"
                            placeholder="City*"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={styles.inputBooking}
                        />
                        <input
                            type="text"
                            placeholder="Country*"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className={styles.inputBooking}
                        />
                    </div>

                    <div className={styles.terms}>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            I agree to be contacted by a Travel Designer.
                        </label>
                    </div>

                    {errors.length > 0 && (
                        <div className={styles.errorContainer}>
                            <ul className={styles.errorList}>
                                {errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.buttonContainer}>
                        <CustomButton variant="contained" onClick={handleNextClick}>
                            Next
                        </CustomButton>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BookingMysteryTripBilling;