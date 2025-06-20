import {FC, useEffect, useState} from 'react';
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css"

interface ItineraryNameInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    itineraryName: string | null;
}

const ItineraryNameInput = ({onChange, itineraryName} : ItineraryNameInputProps) => {

    return (
        <>

            <form style={{display: "flex", flexDirection: "column"}}>
                <label style={{textAlign: "center", margin: "20px 0"}}>Your trip name :</label>
                <input
                    className="input-user-trip"
                    type="text"
                    id="name-user-trip"
                    name="name-user-trip"
                    required
                    placeholder="Enter the name ..."
                    value={itineraryName ? itineraryName : ""}
                    onChange={onChange}
                />
            </form>

        </>
    );
};

export default ItineraryNameInput;
