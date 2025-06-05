import React, {FC, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import Pages from '../../components/layout/Pages';
import dayjs from 'dayjs';
import {get, post} from '../../API/api';
import {useReservation} from '../../contexts/ReservationContext';
import {Option} from '../../@types/Option';
import {useAuth} from "../../contexts/AuthContext";
import styles from "../../styles/BookingMysteryTrip/BookingMysteryTrip.module.css";

const BookingMysteryTripSubmit: FC = () => {
    const navigate = useNavigate();
    const {trip, questionnaireAnswers, updateResponse} = useReservation();
    const [optionsToDisplay, setOptionsToDisplay] = useState<Option[]>([]);
    const [error, setError] = useState<string>('');
    const {userId: authUserId} = useAuth();


    let pageUserId = 0;
    const rawToken = localStorage.getItem('token');
    if (rawToken) {
        try {
            const base64Payload = rawToken.split('.')[1];
            const decodedJson = JSON.parse(window.atob(base64Payload)) as Record<string, any>;
            const subValue = decodedJson.sub;
            const subAsNumber = typeof subValue === 'string' ? parseInt(subValue, 10) : subValue;
            pageUserId = decodedJson.id ?? subAsNumber ?? 0;
        } catch (e) {
            console.error('Impossible de décoder le token :', e);
        }
    }

    useEffect(() => {
        const ids = questionnaireAnswers.optionIds ?? [];
        if (ids.length === 0) return;

        get<{ success: boolean; message: string; data: Option[] }>('/options/all')
            .then(resp => {
                const allOpts = resp?.data ?? [];
                setOptionsToDisplay(allOpts.filter(opt => ids.includes(opt.id)));
            })
            .catch(e => console.error('Impossible de récupérer les options :', e));
    }, [questionnaireAnswers.optionIds]);

    const formattedDeparture = questionnaireAnswers.departureDate
        ? dayjs(questionnaireAnswers.departureDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
        : '';
    const formattedReturn = questionnaireAnswers.returnDate
        ? dayjs(questionnaireAnswers.returnDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
        : '';


    const handleSubmit = async () => {
        updateResponse('userId', authUserId);

        const reservationPayload = {
            userId: authUserId,
            itineraryId: trip!.id,
            status: 'En attente',
            departureDate: questionnaireAnswers.departureDate,
            returnDate: questionnaireAnswers.returnDate,
            numberOfAdults: questionnaireAnswers.numberOfAdults,
            numberOfKids: questionnaireAnswers.numberOfKids,
            optionIds: questionnaireAnswers.optionIds ?? [],
            purchaseDate: dayjs().format('DD-MM-YYYY'),
        };

        try {
            await post('/reservations', reservationPayload);
            await Promise.all(
                reservationPayload.optionIds.map(optId =>
                    post('/reservationOptions', {
                        userId: authUserId,
                        itineraryId: trip!.id,
                        optionId: optId,
                    })
                )
            );
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Erreur lors de la soumission :', err);

            if (err?.message) {
                setError(err.message);
            } else {
                setError('Une erreur est survenue lors de la soumission.');
            }
        }
    };

    if (!trip)
        return <p>Route loading...</p>;

    return (
        <>
            <Pages title="Récap & Soumission – Mystery Trip">
            </Pages>

            <div style={{display: 'flex', justifyContent: 'center', padding: '2rem 1rem'}}>
                <div style={{width: '100%', maxWidth: '700px'}}>
                    <h1 style={{fontSize: 25, textAlign: 'center'}}>Summary and booking</h1>
                    <div style={{width: 2, height: 30, backgroundColor: 'black', margin: 'auto'}}/>

                    {/* Nom de l’itinéraire */}
                    <div style={{textAlign: 'center', margin: '1rem 0'}}>
                        <h2 className={styles.tripDashboardTitle}>{trip.name}</h2>
                    </div>

                    <hr/>

                    <div className="recapDivs">
                        <h3>Dates:</h3>
                        <p>Departure: {formattedDeparture}</p>
                        <p>Return: {formattedReturn}</p>
                    </div>

                    <div className="recapDivs">
                        <h3>Travellers</h3>
                        <p>
                            {questionnaireAnswers.numberOfAdults} adults
                            {questionnaireAnswers.numberOfAdults > 1 ? 's' : ''}
                        </p>
                        {questionnaireAnswers.numberOfKids > 0 && (
                            <p>
                                {questionnaireAnswers.numberOfKids} kids
                                {questionnaireAnswers.numberOfKids > 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    <div className="recapDivs">
                        <h3>Customer Informations</h3>
                        <p>Lastname: {questionnaireAnswers.lastName}</p>
                        <p>Firstname: {questionnaireAnswers.firstName}</p>
                        <p>Email: {questionnaireAnswers.email}</p>
                        <p>Telephone: {questionnaireAnswers.phoneNumber}</p>
                        <p>Adress: {questionnaireAnswers.address}</p>
                        <p>Complement : {questionnaireAnswers.addressDetails || 'N/A'}</p>
                        <p>Postal Code: {questionnaireAnswers.postalCode}</p>
                        <p>City: {questionnaireAnswers.city}</p>
                        <p>Country: {questionnaireAnswers.country}</p>
                    </div>

                    <div className="recapDivs">
                        <h3>Options</h3>
                        {optionsToDisplay.length > 0 ? (
                            optionsToDisplay.map(opt => <p key={opt.id}>• {opt.name}</p>)
                        ) : (
                            <p>No option selected.</p>
                        )}
                    </div>

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                        <CustomButton style={{width: 130}} variant="contained" onClick={handleSubmit}>
                            SUBMIT
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingMysteryTripSubmit;
