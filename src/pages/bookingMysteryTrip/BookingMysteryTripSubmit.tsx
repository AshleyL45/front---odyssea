import React, {FC, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import Pages from '../../components/layout/Pages';
import dayjs from 'dayjs';
import {get, post} from '../../API/api';
import {useBooking} from '../../contexts/BookingContext';
import {Option} from '../../@types/Option';
import {useAuth} from '../../contexts/AuthContext';
import styles from '../../styles/BookingMysteryTrip/BookingMysteryTrip.module.css';

interface BookingResponse {
    success: boolean;
    message: string;
}

const BookingMysteryTripSubmit: FC = () => {
    const navigate = useNavigate();
    const {trip, questionnaireAnswers, updateResponse} = useBooking();
    const [optionsToDisplay, setOptionsToDisplay] = useState<Option[]>([]);
    const [error, setError] = useState<string>('');
    const {userId: authUserId} = useAuth();

    useEffect(() => {
        const ids = questionnaireAnswers.optionIds ?? [];
        console.log('IDS DU CONTEXTE →', ids);

        if (ids.length === 0) {
            setOptionsToDisplay([]);
            return;
        }

        get<any>('/options/all')
            .then((optList) => {
                console.log('RAW OPTIONS FROM API →', optList);
                // suivant ce que tu verras dans la console, adapte :
                // - si optList.data est ton tableau :
                const list: Option[] = Array.isArray(optList)
                    ? optList
                    : Array.isArray(optList.data)
                        ? optList.data
                        : [];

                setOptionsToDisplay(list.filter((opt) => ids.includes(opt.id)));
            })
            .catch(() => console.error('Unable to retrieve options.'));
    }, [questionnaireAnswers.optionIds]);


    const formattedDeparture = questionnaireAnswers.departureDate
        ? dayjs(questionnaireAnswers.departureDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
        : '';
    const formattedReturn = questionnaireAnswers.returnDate
        ? dayjs(questionnaireAnswers.returnDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
        : '';

    const handleSubmit = async () => {
        if (!trip) return;
        setError('');

        try {
            // Étape 1 : Itinéraire, type et date de départ
            await post('/book/step1', {
                itineraryId: trip.id,
                type: 'Mystery', // ou 'Standard' selon ton flow
                date: dayjs(questionnaireAnswers.departureDate, 'DD-MM-YYYY').format('DD/MM/YYYY'),
            });

            // Étape 2 : Nombre de voyageurs
            await post('/book/step2', {
                numberAdults: questionnaireAnswers.numberOfAdults,
                numberKids: questionnaireAnswers.numberOfKids,
            });

            // Étape 3 : Options
            await post('/book/step3', {
                options: questionnaireAnswers.optionIds ?? [],
            });

            // (Facultatif) Étape 4 si tu veux override l’itinéraire
            // await post('/book/step4', { itineraryId: nouveauItineraire });

            // Étape 5 : Finalize
            await post('/book/finalize', {});

            // Redirection
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Reservation error:', err);
            const msg = err?.response?.data?.message;
            setError(msg ?? 'An error occurred during booking.');
        }
    };


    if (!trip) return <p>Loading...</p>;

    return (
        <>
            <Pages title="Summary and booking - Mystery Trip">
            </Pages>

            <main>
            <div style={{display: 'flex', justifyContent: 'center', padding: '2rem 1rem'}}>
                <div style={{width: '100%', maxWidth: '700px'}}>
                    <h1 style={{fontSize: 25, textAlign: 'center'}}>Summary</h1>
                    <div style={{width: 2, height: 30, backgroundColor: 'black', margin: 'auto'}}/>

                    <div style={{textAlign: 'center', margin: '1rem 0'}}>
                        <h2 className={styles.tripDashboardTitle}>{trip.name}</h2>
                    </div>

                    <hr/>

                    <section className="recapDivs">
                        <h3>Dates:</h3>
                        <p>Departure: {formattedDeparture}</p>
                        <p>Return: {formattedReturn}</p>
                    </section>

                    <section className="recapDivs">
                        <h3>Travellers:</h3>
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
                    </section>

                    <section className="recapDivs">
                        <h3>Customer information:</h3>
                        <p>Lastname: {questionnaireAnswers.lastName}</p>
                        <p>Firstname: {questionnaireAnswers.firstName}</p>
                        <p>Email: {questionnaireAnswers.email}</p>
                        <p>Phone: {questionnaireAnswers.phoneNumber}</p>
                        <p>Adress: {questionnaireAnswers.address}</p>
                        <p>Complement: {questionnaireAnswers.addressDetails || 'N/A'}</p>
                        <p>Postal Code: {questionnaireAnswers.postalCode}</p>
                        <p>City: {questionnaireAnswers.city}</p>
                        <p>Country: {questionnaireAnswers.country}</p>
                    </section>

                    <section className="recapDivs">
                        <h3>Options:</h3>
                        {optionsToDisplay.length > 0 ? (
                            optionsToDisplay.map((opt) => <p key={opt.id}>• {opt.name}</p>)
                        ) : (
                            <p>No option selected.</p>
                        )}
                    </section>

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                        <CustomButton
                            style={{width: 130}}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            BOOK
                        </CustomButton>
                    </div>
                </div>
            </div>
            </main>
        </>
    );
};

export default BookingMysteryTripSubmit;