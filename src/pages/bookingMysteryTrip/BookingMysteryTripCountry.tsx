import React, {FC, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from "../../components/ReusableComponents/CustomButton";
import Pages from "../../components/layout/Pages";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from 'react-select';

const BookingMysteryTripCountry: FC = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState<any[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:8080/countries");
                if (!response.ok) throw new Error("Error when retrieving countries");
                const data = await response.json();
                // Préparer et trier la liste de pays
                const countryList: any[] = Array.isArray(data)
                    ? data
                    : Array.isArray((data as any).countries)
                        ? (data as any).countries
                        : [];
                const sorted = [...countryList].sort((a, b) => a.name.localeCompare(b.name));
                setCountries(sorted);
            } catch (error) {
                console.error("Unable to retrieve list of countries:", error);
            }
        };
        fetchCountries();
    }, []);

    const handleSelectCountry = (option: { value: string; label: string } | null) => {
        const newCountry = option?.value;
        if (!newCountry) return;

        if (selectedCountries.length >= 10) {
            window.alert("Vous ne pouvez pas sélectionner plus de 10 pays.");
            return;
        }

        if (!selectedCountries.includes(newCountry)) {
            setSelectedCountries(prev => [...prev, newCountry]);
        }
    };

    const handleRemoveCountry = (country: string) => {
        setSelectedCountries(prev => prev.filter(c => c !== country));
    };

    const handleNext = () => {
        localStorage.setItem(
            "excludedCountries",
            JSON.stringify(selectedCountries)
        );
        navigate("/booking-mystery-trip/date");
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
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    margin: '10px 40px',
                    cursor: 'pointer'
                }}
                onClick={handlePrevious}
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

                    {/*Permet d'enlever els pays de la liste quand ils sont sélectionnés*/}
                    <Select
                        options={countries
                            .filter(c => !selectedCountries.includes(c.name))
                            .map(c => ({value: c.name, label: c.name}))
                        }
                        onChange={handleSelectCountry}
                        placeholder="-- Select a country --"
                        menuPlacement="bottom"
                    />
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center'}}>
                    {selectedCountries.map((country, index) => (
                        <div
                            key={`${country}-${index}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '20px',
                                padding: '0.3rem 0.8rem'
                            }}
                        >
                            <span style={{marginRight: '0.5rem'}}>{country}</span>
                            <button
                                onClick={() => handleRemoveCountry(country)}
                                style={{background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>

                <CustomButton
                    variant="contained"
                    onClick={handleNext}
                    style={{width: '130px', marginTop: '70px', alignSelf: 'center'}}
                >
                    Next
                </CustomButton>
            </div>
        </>
    );
};

export default BookingMysteryTripCountry;
