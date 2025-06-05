import React, {FC, useState, useEffect} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import OptionsSelecting from "../../components/persTrip/OptionsSelecting";
import {get} from '../../API/api';
import {Option} from '../../@types/Option';
import {useReservation} from '../../contexts/ReservationContext';
import {useNavigate} from 'react-router-dom';
import Pages from '../../components/layout/Pages';



const BookingFormOptions: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers, updateResponse} = useReservation();

    const [allOptions, setAllOptions] = useState<Option[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>(questionnaireAnswers.optionIds || []);

    useEffect(() => {
        get<{ success: boolean; message: string; data: Option[] }>('/options/all')
            .then(resp => {
                if (resp?.data) setAllOptions(resp.data);
            })
            .catch(console.error);
    }, []);

    const handleOptionsChange = (ids: number[]) => {
        setSelectedIds(ids);
        updateResponse('optionIds', ids);
    };

    const handlePrevious = () => navigate(-1);
    const handleNext = () => {
        // ensure context is updated
        updateResponse('optionIds', selectedIds);
        navigate('/booking-mystery-trip/billing');
    };

    return (
        <div>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: '100%', height: '6px', backgroundColor: 'lightgrey'}}/>
                <div
                    style={{
                        width: '60%',
                        height: '6px',
                        borderRadius: '0 5px 5px 0',
                        backgroundColor: '#2C3E50',
                        position: 'relative',
                        top: '-6px',
                    }}
                />
            </div>

            <p
                onClick={handlePrevious}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    margin: '10px 40px',
                    cursor: 'pointer',
                }}
            >
                <ArrowBackIcon sx={{fontSize: '15px'}}/> previous step
            </p>

            <div className="option-select" style={{textAlign: "center", width: "95%", margin: 'auto'}}>
                <h1 style={{fontSize: "25px", margin: "40px 0 10px"}}>Would you like to add any options to your
                    itinerary?</h1>
                <p style={{color: "grey"}}>Optional</p>
                <OptionsSelecting/>
                <div style={{display: "block"}}>
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
