import React, {FC, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import Pages from '../../components/layout/Pages';
import styles from '../../styles/components/TripDashboard.module.css';
import dayjs from 'dayjs';
import {get, post} from '../../API/api';
import {useReservation} from '../../contexts/ReservationContext';
import {useAuth} from '../../contexts/AuthContext';
import {Option} from '../../@types/Option';
import {AxiosError} from 'axios';

// Helper to detect Axios errors
function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
    return (error as AxiosError).isAxiosError !== undefined;
}

const BookingMysteryTripSubmit: FC = () => {
    const navigate = useNavigate();
    const {trip, questionnaireAnswers} = useReservation();
    const {userId} = useAuth();
    const [optionsToDisplay, setOptionsToDisplay] = useState<Option[]>([]);
    const [error, setError] = useState<string>('');

    // Fetch selected options details
    useEffect(() => {
        const ids = questionnaireAnswers.optionIds ?? [];
        if (ids.length === 0) return;
        const query = ids.map(id => `ids=${id}`).join('&');
        get<Option[]>(`/options/allById?${query}`)
            .then(opts => Array.isArray(opts) && setOptionsToDisplay(opts))
            .catch(e => console.error('Cannot fetch options', e));
    }, [questionnaireAnswers.optionIds]);

    // Prepare formatted dates for display and payload
    const formattedDeparture = questionnaireAnswers.departureDate
        ? dayjs(questionnaireAnswers.departureDate).format('DD-MM-YYYY')
        : '';
    const formattedReturn = questionnaireAnswers.returnDate
        ? dayjs(questionnaireAnswers.returnDate).format('DD-MM-YYYY')
        : '';

    const handleSubmit = async () => {
        if (!trip?.id) {
            setError('No trip selected.');
            return;
        }
        if (!userId) {
            setError('User not logged in.');
            return;
        }

        // The dates in context are already formatted as "DD-MM-YYYY"
        const payloadDeparture = questionnaireAnswers.departureDate;
        const payloadReturn = questionnaireAnswers.returnDate;

        const safeOptionIds: number[] = questionnaireAnswers.optionIds ?? [];

        const reservationPayload = {
            userId,
            itineraryId: trip.id,
            status: questionnaireAnswers.status || 'PENDING',
            departureDate: payloadDeparture,
            returnDate: payloadReturn,
            numberOfAdults: questionnaireAnswers.numberOfAdults,
            numberOfKids: questionnaireAnswers.numberOfKids,
            optionIds: safeOptionIds,
        };

        // Debug: show what we’re sending
        console.log('>>> reservationPayload:', reservationPayload);
        alert('Sending payload:\n' + JSON.stringify(reservationPayload, null, 2));

        try {
            // 1) Create reservation
            await post('/reservations', reservationPayload);

            // 2) Link each selected option
            for (const optId of safeOptionIds) {
                await post('/reservationOptions', {
                    userId,
                    itineraryId: trip.id,
                    optionId: optId,
                });
            }

            setError('');
            navigate('/dashboard');
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                console.error('Axios error response:', err.response);
                alert('Server error:\n' + JSON.stringify(err.response?.data, null, 2));
                setError(err.response?.data?.message || 'Error submitting reservation.');
            } else {
                setError('Unexpected error.');
            }
        }
    };


    if (!trip) return <p>Loading trip...</p>;

    return (
        <>
            <Pages title="Recap & Submit - Mystery Trip">
            </Pages>

            <div style={{display: 'flex', justifyContent: 'center', padding: '2rem'}}>
                <div>
                    <h1 style={{fontSize: 25, textAlign: 'center'}}>Review & Submit Your Booking</h1>
                    <div style={{width: 2, height: 30, backgroundColor: 'black', margin: 'auto'}}/>
                    <div style={{textAlign: 'center', margin: '1rem 0'}}>
                        <h2 className={styles.tripDashboardTitle}>{trip.name}</h2>
                    </div>
                    <hr/>

                    <div className="recapDivs">
                        <h3>Dates</h3>
                        <p>Departure: {formattedDeparture}</p>
                        <p>Return: {formattedReturn}</p>
                    </div>

                    <div className="recapDivs">
                        <h3>Travellers</h3>
                        <p>
                            {questionnaireAnswers.numberOfAdults} adult
                            {questionnaireAnswers.numberOfAdults > 1 ? 's' : ''}
                        </p>
                        {questionnaireAnswers.numberOfKids > 0 && (
                            <p>
                                {questionnaireAnswers.numberOfKids} kid
                                {questionnaireAnswers.numberOfKids > 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    <div className="recapDivs">
                        <h3>Customer Information</h3>
                        <p><strong>Last Name:</strong> {questionnaireAnswers.lastName}</p>
                        <p><strong>First Name:</strong> {questionnaireAnswers.firstName}</p>
                        <p><strong>Email:</strong> {questionnaireAnswers.email}</p>
                        <p><strong>Phone:</strong> {questionnaireAnswers.phoneNumber}</p>
                        <p><strong>Company:</strong> {questionnaireAnswers.companyName || 'N/A'}</p>
                        <p><strong>Address:</strong> {questionnaireAnswers.address}</p>
                        <p><strong>Details:</strong> {questionnaireAnswers.addressDetails || 'N/A'}</p>
                        <p><strong>Postal Code:</strong> {questionnaireAnswers.postalCode}</p>
                        <p><strong>City:</strong> {questionnaireAnswers.city}</p>
                        <p><strong>Country:</strong> {questionnaireAnswers.country}</p>
                    </div>

                    <div className="recapDivs">
                        <h3>Options</h3>
                        {optionsToDisplay.length > 0
                            ? optionsToDisplay.map(opt => <p key={opt.id}>{opt.name}</p>)
                            : <p>No options selected.</p>
                        }
                    </div>

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                        <CustomButton style={{width: 130}} variant="contained" onClick={handleSubmit}>
                            Submit
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingMysteryTripSubmit;