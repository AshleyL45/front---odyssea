import {FC, JSX, useEffect, useState} from 'react';
import {ItineraryDay} from "../../@types/PersonalizeTrip";


const RecapOneDay: ({day}: { day: ItineraryDay }) => JSX.Element = ({day}) => {

    const [itineraryPerDay, setItineraryPerDay] = useState(day);



    if (!itineraryPerDay) {
        return <p>An error occurred. Please try again.</p>;
    }

    return (
        <div style={{marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
            <h3>Day {day.dayNumber}: {day.cityName}, {day.countryName}</h3>
            <p>Date: {day.date}</p>


            {day.flightItineraryDTO && (
                <div>
                    <h4>Flight</h4>
                    <p>
                        Flight: {day.flightItineraryDTO.totalPrice}, {day.flightItineraryDTO.currency}
                    </p>
                </div>
            )}


            {day.hotel && (
                <div>
                    <h4>Hotel</h4>
                    <p>
                        {day.hotel.name}, {day.hotel.starRating} stars
                    </p>
                    <p>{day.hotel.description}</p>
                </div>
            )}


            {day.activity ? (
                <div>
                    <h4>Activity</h4>
                    <p>
                        {day.activity.name} ({day.activity.duration}h)
                    </p>
                    <p>{day.activity.description}</p>
                    <p>Price: {day.activity.price} EUR</p>
                </div>
            ) : (
                <p>Free evening to relax and explore the surroundings.</p>
            )}
        </div>
    );
};

export default RecapOneDay;