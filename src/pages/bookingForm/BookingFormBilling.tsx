import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OptionsSelecting from "../../components/OptionsSelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";


const BookingFormBilling: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "70%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Your billing information</h1>
                <p>This information is required to finalize your reservation.</p>

                <h3>Contact Details</h3>
                <input type="text" placeholder="Last Name"/>
                <input type="text" placeholder="First Name"/>
                <input type="email" placeholder="Email"/>
                <input type="text" placeholder="Phone Number"/>

                <h3>Address</h3>
                <input type="text" placeholder="Company Name"/>
                <input type="text" placeholder="Address"/>
                <input type="text" placeholder="Address details"/>
                <input type="text" placeholder="Postal code"/>
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="Country"/>

                <input type={"checkbox"}/> <label>By validating this form, I agree to be contacted by a Travel Designer
                to finalize my reservation and receive personalized support.</label>


                <div style={{display: "block"}}>
                    <CustomButton style={{width: "130px"}} variant="contained">Next</CustomButton>
                </div>

            </div>

        </div>
    );
};

export default BookingFormBilling;
