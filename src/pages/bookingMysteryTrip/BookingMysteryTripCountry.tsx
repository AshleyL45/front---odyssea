import React, {FC, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import Pages from '../../components/layout/Pages';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from 'react-select';
import {get} from '../../API/api';
import {useReservation} from '../../contexts/ReservationContext';
import {Trip} from '../../@types/Trip';

const BookingMysteryTripCountry: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers, updateResponse, setTrip} = useReservation();
    const [countries, setCountries] = useState<{ name: string }[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        questionnaireAnswers.excludedCountries || []
    );

    useEffect(() => {
        async function fetchCountries() {
            try {
                const res = await fetch('http://localhost:8080/countries');
                if (!res.ok) throw new Error('Error when retrieving countries');
                const data = await res.json();
                const list: any[] = Array.isArray(data)
                    ? data
                    : Array.isArray((data as any).countries)
                        ? (data as any).countries
                        : [];
                setCountries(list.sort((a, b) => a.name.localeCompare(b.name)));
            } catch (err) {
                console.error(err);
            }
        }

        fetchCountries();
    }, []);

    const handleSelectCountry = (option: { value: string; label: string } | null) => {
        if (!option) return;
        const country = option.value;
        if (selectedCountries.length >= 10) {
            window.alert('Vous ne pouvez pas sélectionner plus de 10 pays.');
            return;
        }
        if (!selectedCountries.includes(country)) {
            setSelectedCountries(prev => [...prev, country]);
        }
    };

    const handleRemoveCountry = (country: string) => {
        setSelectedCountries(prev => prev.filter(c => c !== country));
    };

    const handleNext = async () => {
        updateResponse('excludedCountries', selectedCountries);

        const queryParam = selectedCountries.length
            ? encodeURIComponent(selectedCountries.join(','))
            : '';
        const url = selectedCountries.length
            ? `/api/itineraries/valid?excludedCountries=${queryParam}`
            : `/api/itineraries/valid`;

        const maybeTrip = await get<Trip>(url);
        if (!maybeTrip) {
            console.error('Erreur récupération itinéraire: trip is null');
            window.alert('Impossible de récupérer un itinéraire. Réessayez.');
            return;
        }

        setTrip(maybeTrip);
        navigate('/booking-mystery-trip/date');
    };

    const handlePrevious = () => navigate(-1);

    return (
        <>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: '100%', height: '6px', backgroundColor: 'lightgrey'}}/>
                <div
                    style={{
                        width: '30%',
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

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '1.5rem',
                    width: '90%',
                    margin: '0 auto',
                    marginTop: '2rem',
                }}
            >
                <h1 style={{fontSize: '25px', margin: '30px 0 0'}}>Exclude your destinations</h1>
                <p style={{fontSize: '1rem', lineHeight: '1.5'}}>
                    Indicate the countries you do not wish to visit to personalize your stay.
                </p>

                <label htmlFor="countrySelect" style={{fontWeight: 'bold', marginTop: '50px'}}>
                    Choose a country to exclude:
                </label>
                <p style={{fontSize: '0.9rem', color: 'grey', marginTop: '0.25rem'}}>
                    Maximum 10 countries
                </p>
                <div style={{width: '100%', maxWidth: '300px'}}>
                    <Select
                        options={countries
                            .filter(c => !selectedCountries.includes(c.name))
                            .map(c => ({value: c.name, label: c.name}))}
                        onChange={handleSelectCountry}
                        placeholder="-- Select a country --"
                        menuPlacement="bottom"
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        justifyContent: 'center',
                    }}
                >
                    {selectedCountries.map((country, idx) => (
                        <div
                            key={`${country}-${idx}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '20px',
                                padding: '0.3rem 0.8rem',
                            }}
                        >
                            <span style={{marginRight: '0.5rem'}}>{country}</span>
                            <button
                                onClick={() => handleRemoveCountry(country)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <CustomButton
                    variant="contained"
                    onClick={handleNext}
                    style={{width: '130px', marginTop: '70px'}}
                >
                    Next
                </CustomButton>
            </div>
        </>
    );
};

export default BookingMysteryTripCountry;