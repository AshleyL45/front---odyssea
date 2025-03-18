import {FC, JSX, useEffect, useState} from 'react';
import RemoveIcon from "@mui/icons-material/Remove";
import {useReservation} from "../../contexts/ReservationContext";
import {Trip} from "../../@types/Trip";
import styles from "../../styles/components/TripDashboard.module.css";
import {get, post} from "../../API/api";
import {Option} from "../../@types/Option";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";


const BookingFormRecap: ({trip}: { trip: Trip }) => React.JSX.Element = ({trip}) => {

    const {questionnaireAnswers} = useReservation();
    const [optionsToDisplay, setOptionsToDisplay] = useState<Option[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptionsById = async () => {
            if (!questionnaireAnswers.optionIds || questionnaireAnswers.optionIds.length === 0) {
                return; // Si aucun ID, on ne fait pas la requête
            }

            try {
                // Transformer les options en paramètre de requête
                const queryString = questionnaireAnswers.optionIds.map(id => `ids=${id}`).join("&");
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
        try{
            const postInfo = await post("/reservations", questionnaireAnswers);
            console.log(postInfo)
            if(postInfo){
                navigate("/dashboard");
            }
        } catch (e) {
            console.error("Cannot send reservation : ", e);
        }

    }


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div>
                <h1 style={{fontSize: "25px", margin: "10px 0", textAlign: "center"}}>Summary of your trip</h1>
                <div style={{width: 2, height: 30, backgroundColor: "black", margin: "auto"}}></div>

                <div style={{textAlign: "center", display: "flex", justifyContent: "center"}}>
                    <h2 className={styles.tripDashboardTitle}>{trip.name}</h2>
                </div>
                <hr/>

                <div>
                    <div className="recapDivs">
                        <h3>Dates</h3>
                        <p>{questionnaireAnswers.departureDate}</p>
                        <p>{questionnaireAnswers.returnDate}</p>
                    </div>

                    <div className="recapDivs">
                        <h3>Travellers</h3>
                        {questionnaireAnswers.numberOfAdults === 1 ? (
                            <p>{questionnaireAnswers.numberOfAdults} adult</p>
                        ) : (
                            <p>{questionnaireAnswers.numberOfAdults} adults</p>
                        )}

                        {
                            questionnaireAnswers.numberOfKids !== 0 && (
                                <p>{questionnaireAnswers.numberOfKids} kids (below 18 years old)</p>
                            )
                        }


                    </div>

                    <div className="recapDivs">
                        <h3>Customer Information</h3>
                    </div>

                    <div className="recapDivs">
                        <h3>Options</h3>
                        {optionsToDisplay && optionsToDisplay.length > 0 ? optionsToDisplay.map(option => (
                            <p>{option.name}</p>
                        )) : (<p>No options were chosen.</p>)}
                    </div>

                </div>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <CustomButton style={{width: "130px"}} variant="contained"
                                  onClick={handleNext}>Submit</CustomButton>
                </div>

            </div>


        </div>
    );
};

export default BookingFormRecap;
