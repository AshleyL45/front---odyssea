import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import Pages from '../../components/layout/Pages';
import {get} from '../../API/api';
import {useBooking} from '../../contexts/BookingContext';
import {useAuth} from '../../contexts/AuthContext';
import {Trip} from '../../@types/Trip';
import {Country} from '../../@types/Country';
import {useCountries} from '../../hooks/mysteryTrip/useCountries';
import CountrySelect from '../../components/mysteryTrip/CountrySelect';
import CountryChips from '../../components/mysteryTrip/CountryChips';
import styles from './MysteryTripCountry.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Utilise le type Country pour dériver CountryOption
export type CountryOption = {
    value: Country['name'];
    label: Country['name'];
};

const BookingMysteryTripCountry: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers, updateResponse, setTrip} = useBooking();
    const {token} = useAuth();
    const countries = useCountries();

    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        questionnaireAnswers.excludedCountries || []
    );

    const handleSelect = (country: string) => {
        if (selectedCountries.length >= 10) {
            window.alert('You can exclude up to 10 countries.');
            return;
        }
        if (!selectedCountries.includes(country)) {
            setSelectedCountries(prev => [...prev, country]);
        }
    };

    const handleRemove = (country: string) => {
        setSelectedCountries(prev => prev.filter(c => c !== country));
    };

    const handleNext = async () => {
        updateResponse('excludedCountries', selectedCountries);
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const queryParam =
            selectedCountries.length > 0
                ? `?excludedCountries=${encodeURIComponent(selectedCountries.join(','))}`
                : '';

        try {
            const trips: Trip[] | null = await get<Trip[]>(
                `/api/itineraries/valid${queryParam}`,
                {headers}
            );
            if (!trips || trips.length === 0) {
                window.alert('Unable to retrieve an itinerary.');
                return;
            }
            setTrip(trips[0]);
            navigate('/booking-mystery-trip/date');
        } catch (err) {
            console.error(err);
            window.alert('An error has occurred while loading routes.');
        }
    };

    const handlePrevious = () => navigate(-1);

    const countryOptions: CountryOption[] = countries
        .filter(c => !selectedCountries.includes(c.name))
        .map(c => ({value: c.name, label: c.name}));

    return (
        <>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <header>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBackground}/>
                    <div className={styles.progressFill}/>
                </div>
                <a
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
                </a>
            </header>

            <main aria-labelledby="page-title">
                <div className={styles.mainContainer}>
                    <h1 id="page-title" className={styles.title}>
                        Exclude your destinations
                    </h1>
                    <h2 className={styles.subtitle} aria-live="polite">
                        Indicate the countries you do not wish to visit to personalize your stay.
                    </h2>

                    <label htmlFor="countrySelect" className={styles.label}>
                        Choose a country to exclude:
                    </label>
                    <p className={styles.helperText} id="helper-text">
                        Maximum 10 countries
                    </p>

                    <div className={styles.selectWrapper}>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleNext();
                            }}
                            aria-describedby="helper-text"
                        >
                            <CountrySelect
                                options={countryOptions}
                                onSelect={handleSelect}
                            />
                        </form>
                    </div>

                    <CountryChips countries={selectedCountries} onRemove={handleRemove}/>

                    <CustomButton
                        variant="contained"
                        onClick={handleNext}
                        className={styles.nextButton}
                        aria-label="Next step"
                    >
                        Next
                    </CustomButton>
                </div>
            </main>
        </>
    );
};

export default BookingMysteryTripCountry;
