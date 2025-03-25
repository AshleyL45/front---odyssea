import React, {FC, JSX, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OptionsSelecting from "../../components/OptionsSelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import "../../App.css"
import {useNavigate} from "react-router-dom";
import styles from "../../styles/BookingFormBilling.module.css";
import Pages from "../../components/layout/Pages";


const BookingFormBilling: ({}: {}) => JSX.Element = ({}) => {

    const {email, firstName, lastName} = useAuth();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors: string[] = [];

        const inputs = document.querySelectorAll("input");

        inputs.forEach((input) => {
            if (input.required && !input.value.trim()) {

                newErrors.push(`The field ${input.placeholder.slice(0, -1)} is required.`);
            }
        });

        const checkbox = document.getElementById("validationCheckbox") as HTMLInputElement;
        if (!checkbox.checked) {
            newErrors.push("You must agree to the terms and conditions.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const handleNextClick = (e: React.MouseEvent) => {
        e.preventDefault();

        const isFormValid = validateForm();

        if (isFormValid) {
            const billingInfo = {
                lastName: (document.querySelector("input[placeholder='Last Name*']") as HTMLInputElement)?.value,
                firstName: (document.querySelector("input[placeholder='First Name*']") as HTMLInputElement)?.value,
                email: (document.querySelector("input[placeholder='Email*']") as HTMLInputElement)?.value,
                phoneNumber: (document.querySelector("input[placeholder='Phone Number*']") as HTMLInputElement)?.value,
                companyName: (document.querySelector("input[placeholder='Company Name']") as HTMLInputElement)?.value,
                address: (document.querySelector("input[placeholder='Address*']") as HTMLInputElement)?.value,
                addressDetails: (document.querySelector("input[placeholder='Address details']") as HTMLInputElement)?.value,
                postalCode: (document.querySelector("input[placeholder='Postal code*']") as HTMLInputElement)?.value,
                city: (document.querySelector("input[placeholder='City*']") as HTMLInputElement)?.value,
                country: (document.querySelector("input[placeholder='Country*']") as HTMLInputElement)?.value,
            };

            localStorage.setItem("billingInfo", JSON.stringify(billingInfo));

            navigate("/booking/recap");
        }
    };

    return (
        <div>
            <Pages title="Booking Form">
            </Pages>

            {/* Barre de progression */}
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}></div>
            </div>

            {/* Lien "previous step" */}
            <p className={styles.previousStep} onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </p>

            {/* Conteneur principal */}
            <div className={styles.optionSelect}>
                <h1>Your billing information</h1>
                <p>This information is required to finalize your reservation.</p>

                <h3>Contact Details</h3>
                <div className={styles.formGrid}>
                    <input type="text" placeholder="Last Name*" defaultValue={lastName?.toString()}
                           className={styles.inputBooking} required/>
                    <input type="text" placeholder="First Name*" defaultValue={firstName?.toString()}
                           className={styles.inputBooking} required/>
                    <input type="email" placeholder="Email*" defaultValue={email?.toString()}
                           className={styles.inputBooking} required/>
                    <input type="text" placeholder="Phone Number*" className={styles.inputBooking} required/>
                </div>

                <h3>Address</h3>
                <div className={styles.formGridAddress}>
                    <input type="text" placeholder="Company Name" className={styles.inputBooking}/>
                    <input type="text" placeholder="Address*" className={styles.inputBooking} required/>
                    <input type="text" placeholder="Address details" className={styles.inputBooking}/>
                    <input type="text" placeholder="Postal code*" className={styles.inputBooking} required/>
                    <input type="text" placeholder="City*" className={styles.inputBooking} required/>
                    <input type="text" placeholder="Country*" className={styles.inputBooking} required/>
                </div>

                {/* Case à cocher */}
                <div className={styles.terms}>
                    <input type="checkbox" id="validationCheckbox" className={styles.validationCheckbox}/>
                    <label htmlFor="validationCheckbox" className={styles.validationLabel}>
                        By validating this form, I agree to be contacted by a Travel Designer to finalize my reservation
                        and
                        receive personalized support.
                    </label>
                </div>


                {/* Messages d'erreur */}
                {errors.length > 0 && (
                    <div className={styles.errorContainer}>
                        <ul className={styles.errorList}>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Bouton "Next" */}
                <div className={styles.buttonContainer}>
                    <CustomButton className={styles.customButton} variant="contained" onClick={handleNextClick}>
                        Next
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default BookingFormBilling;
