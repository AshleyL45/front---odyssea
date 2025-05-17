import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import {useReservation} from "../../contexts/ReservationContext";
import Pages from "../../components/layout/Pages";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles/BookingFormBilling.module.css";



const BookingMysteryTripBilling: FC = () => {
    const navigate = useNavigate();
    const {email: authEmail, firstName: authFirstName, lastName: authLastName} = useAuth();
    const {questionnaireAnswers, updateResponse} = useReservation();

    // Initialize local state from context (or auth where appropriate)
    const [lastName, setLastName] = useState<string>(questionnaireAnswers.lastName || authLastName || "");
    const [firstName, setFirstName] = useState<string>(questionnaireAnswers.firstName || authFirstName || "");
    const [email, setEmail] = useState<string>(questionnaireAnswers.email || authEmail || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(questionnaireAnswers.phoneNumber || "");
    const [companyName, setCompanyName] = useState<string>(questionnaireAnswers.companyName || "");
    const [address, setAddress] = useState<string>(questionnaireAnswers.address || "");
    const [addressDetails, setAddressDetails] = useState<string>(questionnaireAnswers.addressDetails || "");
    const [postalCode, setPostalCode] = useState<string>(questionnaireAnswers.postalCode || "");
    const [city, setCity] = useState<string>(questionnaireAnswers.city || "");
    const [country, setCountry] = useState<string>(questionnaireAnswers.country || "");
    const [agreed, setAgreed] = useState<boolean>(questionnaireAnswers.agreedToTerms || false);
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        if (!lastName.trim()) newErrors.push("The field Last Name is required.");
        if (!firstName.trim()) newErrors.push("The field First Name is required.");
        if (!email.trim()) newErrors.push("The field Email is required.");
        if (!phoneNumber.trim()) newErrors.push("The field Phone Number is required.");
        if (!address.trim()) newErrors.push("The field Address is required.");
        if (!postalCode.trim()) newErrors.push("The field Postal code is required.");
        if (!city.trim()) newErrors.push("The field City is required.");
        if (!country.trim()) newErrors.push("The field Country is required.");
        if (!agreed) newErrors.push("You must agree to the terms and conditions.");

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleNextClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Persist into context
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

        navigate("/booking-mystery-trip/result");
    };

    return (
        <div>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}></div>
            </div>
            <p className={styles.previousStep} onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/> previous step
            </p>
            <div className={styles.optionSelect}>
                <h1>Your billing information</h1>
                <p>This information is required to finalize your reservation.</p>

                <h3>Contact Details</h3>
                <div className={styles.formGrid}>
                    <input
                        type="text"
                        placeholder="Last Name*"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name*"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email*"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number*"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                </div>

                <h3>Address</h3>
                <div className={styles.formGridAddress}>
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        className={styles.inputBooking}
                    />
                    <input
                        type="text"
                        placeholder="Address*"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address details"
                        value={addressDetails}
                        onChange={e => setAddressDetails(e.target.value)}
                        className={styles.inputBooking}
                    />
                    <input
                        type="text"
                        placeholder="Postal code*"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City*"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country*"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className={styles.inputBooking}
                        required
                    />
                </div>

                <div className={styles.terms}>
                    <input
                        type="checkbox"
                        id="validationCheckbox"
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                        className={styles.validationCheckbox}
                    />
                    <label htmlFor="validationCheckbox" className={styles.validationLabel}>
                        By validating this form, I agree to be contacted by a Travel Designer to finalize my reservation
                        and receive personalized support.
                    </label>
                </div>

                {errors.length > 0 && (
                    <div className={styles.errorContainer}>
                        <ul className={styles.errorList}>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={styles.buttonContainer}>
                    <CustomButton
                        className={styles.customButton}
                        variant="contained"
                        onClick={handleNextClick}
                    >
                        Next
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default BookingMysteryTripBilling;
