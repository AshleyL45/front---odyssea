import React, {FC, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import Pages from '../../components/layout/Pages';
import styles from '../../styles/components/TripDashboard.module.css';
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
        const fetchOptions = async () => {
            const ids = questionnaireAnswers.optionIds;
            if (!ids || ids.length === 0) return;
            try {
                const query = ids.map(id => `ids=${id}`).join('&');
                const opts = await get(`/options/allById?${query}`);
                if (opts) setOptionsToDisplay(opts);
            } catch (e) {
                console.error('Cannot fetch options', e);
            }
        };
        fetchOptions();
    }, [questionnaireAnswers.optionIds]);

    const handleSubmit = async () => {
        if (!trip || !trip.id) {
            setError('No trip selected.');
            return;
        }
        if (!userId) {
            setError('User not logged in.');
            return;
        }

        try {
            // 1) Create reservation
            await post('/reservations', {
                userId,
                itineraryId: trip.id,
                status: questionnaireAnswers.status || 'PENDING',
                departureDate: questionnaireAnswers.departureDate,
                returnDate: questionnaireAnswers.returnDate,
                numberOfAdults: questionnaireAnswers.numberOfAdults,
                numberOfKids: questionnaireAnswers.numberOfKids,
                lastName: questionnaireAnswers.lastName,
                firstName: questionnaireAnswers.firstName,
                email: questionnaireAnswers.email,
                phoneNumber: questionnaireAnswers.phoneNumber,
                companyName: questionnaireAnswers.companyName,
                address: questionnaireAnswers.address,
                addressDetails: questionnaireAnswers.addressDetails,
                postalCode: questionnaireAnswers.postalCode,
                city: questionnaireAnswers.city,
                country: questionnaireAnswers.country,
            });

            // 2) Link each selected option via reservationOptions endpoint
            const selectedIds = questionnaireAnswers.optionIds || [];
            for (const optId of selectedIds) {
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
                        <p>Departure: {questionnaireAnswers.departureDate}</p>
                        <p>Return: {questionnaireAnswers.returnDate}</p>
                    </div>

                    <div className="recapDivs">
                        <h3>Travellers</h3>
                        <p>{questionnaireAnswers.numberOfAdults} adult{questionnaireAnswers.numberOfAdults > 1 ? 's' : ''}</p>
                        {questionnaireAnswers.numberOfKids > 0 && (
                            <p>{questionnaireAnswers.numberOfKids} kid{questionnaireAnswers.numberOfKids > 1 ? 's' : ''}</p>
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
