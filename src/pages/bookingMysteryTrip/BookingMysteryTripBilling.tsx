import React, {FC, useState} from 'react';
import NavbarReservation from "../../components/navbars/NavbarReservationts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import {useReservation} from "../../contexts/ReservationContext";
import {useNavigate} from "react-router-dom";
import "../../App.css";

const BookingMysteryTripBilling: FC = () => {
    const {email, firstName, lastName} = useAuth();
    const {trip} = useReservation(); // On récupère le trip depuis le contexte
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        const inputs = document.querySelectorAll("input");

        inputs.forEach((input) => {
            if (input.required && !input.value.trim()) {
                newErrors.push(`The field ${input.placeholder.slice(0, -1)} is required.`);
            }
        });

        const checkbox = document.getElementById("validationCheckbox") as HTMLInputElement;
        if (!checkbox || !checkbox.checked) {
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
        if (validateForm()) {
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
            navigate("/booking-mystery-trip/result");
        }
    };

    return (
        <div>
            {trip ? <NavbarReservation/> : <div style={{height: "50px"}}></div>}

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div
                    style={{
                        width: "80%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px"
                    }}
                ></div>
            </div>

            <p style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </p>

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Your billing information</h1>
                <p>This information is required to finalize your reservation.</p>

                <h3 style={{marginTop: "2rem"}}>Contact Details</h3>
                <div style={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    gridTemplateColumns: "1fr 1fr",
                    width: "50%",
                    gap: 25,
                    margin: "auto"
                }}>
                    <input type="text"
                           placeholder="Last Name*"
                           defaultValue={lastName?.toString()}
                           className="inputBooking"
                           required/>
                    <input type="text"
                           placeholder="First Name*"
                           defaultValue={firstName?.toString()}
                           className="inputBooking"
                           required/>
                    <input type="email"
                           placeholder="Email*"
                           defaultValue={email?.toString()}
                           className="inputBooking"
                           required/>
                    <input type="text"
                           placeholder="Phone Number*"
                           className="inputBooking"
                           required/>
                </div>

                <h3>Address</h3>
                <div style={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "50%",
                    gap: 25,
                    margin: "auto"
                }}>
                    <input type="text" placeholder="Company Name" className="inputBooking"/>
                    <input type="text" placeholder="Address*" className="inputBooking" required/>
                    <input type="text" placeholder="Address details" className="inputBooking"/>
                    <input type="text" placeholder="Postal code*" className="inputBooking" required/>
                    <input type="text" placeholder="City*" className="inputBooking" required/>
                    <input type="text" placeholder="Country*" className="inputBooking" required/>
                </div>

                <div style={{marginTop: "2rem"}}>
                    <input type="checkbox" id="validationCheckbox" style={{marginRight: "0.5rem"}}/>
                    <label htmlFor="validationCheckbox" className="inputBooking">
                        By validating this form, I agree to be contacted by a Travel Designer to finalize my reservation
                        and receive personalized support.
                    </label>
                </div>

                {errors.length > 0 && (
                    <div style={{color: "red", margin: "10px 0"}}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx} style={{listStyleType: "none"}}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div style={{display: "block", marginTop: "2rem"}}>
                    <CustomButton style={{width: "130px"}} variant="contained" onClick={handleNextClick}>
                        Next
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default BookingMysteryTripBilling;
