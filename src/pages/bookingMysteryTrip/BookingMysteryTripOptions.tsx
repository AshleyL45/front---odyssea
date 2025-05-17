import React, {FC, useState, useEffect} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OptionsSelecting from "../../components/OptionsSelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {get} from "../../API/api";
import {Option} from "../../@types/Option";
import {useReservation} from "../../contexts/ReservationContext";
import {useNavigate} from "react-router-dom";
import Pages from "../../components/layout/Pages";

const BookingFormOptions: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers, updateResponse} = useReservation();

    const [options, setOptions] = useState<Option[]>([]);
    const [optionIds, setOptionIds] = useState<number[]>(questionnaireAnswers.optionIds || []);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const getOptions = await get("/options/all");
                if (Array.isArray(getOptions)) {
                    setOptions(getOptions);
                }
            } catch (e) {
                console.error("Cannot get options", e);
            }
        };
        fetchOptions();
    }, []);

    const handleOptionsChange = (selectedOptions: number[]) => {
        setOptionIds(selectedOptions);
    };

    const handleNext = () => {
        updateResponse("optionIds", optionIds);
        navigate("/booking-mystery-trip/billing");
    };

    const handlePrevious = () => navigate(-1);

    return (
        <div>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}/>
                <div
                    style={{
                        width: "60%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px",
                    }}
                />
            </div>

            <p
                onClick={handlePrevious}
                style={{
                    display: 'flex',
                    alignItems: "center",
                    fontSize: "16px",
                    margin: "10px 40px",
                    cursor: "pointer"
                }}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/> previous step
            </p>

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>
                    Would you like to add any options to your itinerary?
                </h1>

                <OptionsSelecting
                    options={options}
                    onOptionsChange={handleOptionsChange}
                />

                <div style={{marginTop: "2rem"}}>
                    <CustomButton
                        style={{width: "130px"}}
                        variant="contained"
                        onClick={handleNext}
                    >
                        Next
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default BookingFormOptions;
