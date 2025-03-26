import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import NavbarReservation from "../../components/navbars/NavbarReservationts";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import Pages from "../../components/layout/Pages";

const BookingMysteryTripCountry: FC = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState<any[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:8080/countries");
                if (!response.ok) {
                    throw new Error("Error when retrieving countries");
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Unable to retrieve list of countries:", error);
            }
        };
        fetchCountries();
    }, []);

    const handleSelectCountry = (event: ChangeEvent<HTMLSelectElement>) => {
        const newCountry = event.target.value;
        if (newCountry && !selectedCountries.includes(newCountry) && selectedCountries.length < 10) {
            setSelectedCountries((prev) => [...prev, newCountry]);
        }
        event.target.value = "";
    };

    const handleRemoveCountry = (country: string) => {
        setSelectedCountries((prev) => prev.filter(c => c !== country));
    };

    const handleNext = () => {
        localStorage.setItem("excludedCountries", JSON.stringify(selectedCountries));
        navigate("/booking-mystery-trip/date");
    };

    return (
        <>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "30%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20rem",
                marginTop: "2rem"
            }}>
        <span style={{fontSize: "2rem", fontWeight: "bold", textDecoration: "underline"}}>
          1. Countries
        </span>
                <span style={{fontSize: "2rem", fontWeight: "bold"}}>
          2. Dates
        </span>
                <span style={{fontSize: "2rem", fontWeight: "bold"}}>
          3. Travellers
        </span>
            </div>

            <div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-start", marginTop: "3rem"}}>
                <div style={{width: "40%", display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <h2 style={{fontSize: "2rem"}}>Exclude your destinations</h2>
                    <p style={{fontSize: "1rem", lineHeight: "1.5"}}>
                        Indicate the countries you do not wish to visit to personalize your stay.
                    </p>
                    <div>
                        <CustomButton style={{color: "white", backgroundColor: "#2C3E50"}} onClick={handleNext}>
                            Next
                        </CustomButton>
                    </div>
                </div>

                {/* Colonne de droite */}
                <div style={{width: "40%", display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <label htmlFor="countrySelect" style={{fontWeight: "bold"}}>
                        Choose a country to exclude:
                    </label>
                    <select
                        id="countrySelect"
                        onChange={handleSelectCountry}
                        style={{padding: "0.5rem", fontSize: "1rem"}}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            -- Select a country --
                        </option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>

                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "1rem",
                    }}>
                        {selectedCountries.map((country, index) => (
                            <div
                                key={`${country}-${index}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "20px",
                                    padding: "0.3rem 0.8rem",
                                }}
                            >
                                <span style={{marginRight: "0.5rem"}}>{country}</span>
                                <button
                                    onClick={() => handleRemoveCountry(country)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingMysteryTripCountry;
