import {JSX, useState} from 'react';
import {ItineraryDay} from "../../@types/PersonalizeTrip";

const RecapOneDay: ({day}: { day: ItineraryDay }) => JSX.Element = ({day}) => {
    const [itineraryPerDay, setItineraryPerDay] = useState(day);

    if (!itineraryPerDay) {
        return <p>An error occurred. Please try again.</p>;
    }

    return (
        <div style={{marginBottom: '20px', border: '1px solid #ccc', padding: '25px', borderRadius: '5px'}}>
            <h3>Day {day.dayNumber}: {day.cityName}, {day.countryName}</h3>
            <p>Date: {day.date}</p>
            {day.flightItineraryDTO && day.dayOff ? (
                <>
                    <div style={{marginTop: "2rem"}}>
                        <h4>Flight</h4>
                        <p>Duration: {day.flightItineraryDTO.duration}</p>
                        <p>
                            One way flight: Departure {day.flightItineraryDTO.segments[0].departure.iataCode},
                            at {day.flightItineraryDTO.segments[0].departure.at}
                        </p>
                        <p>
                            Arrival {day.flightItineraryDTO.segments[0].arrival.iataCode},
                            at {day.flightItineraryDTO.segments[0].arrival.at}
                        </p>
                        <p>Aircraft: {day.flightItineraryDTO.segments[0].aircraftName}</p>
                    </div>
                </>
            ) : !day.flightItineraryDTO && day.dayOff ? (
                <div style={{marginTop: "2rem"}}>
                    <h4>Flight</h4>
                    <p>To be discussed with your Travel Designer.</p>
                </div>
            ) : null
            }


            {day.hotel && (
                <div style={{marginTop: "2rem"}}>
                    <h4>Hotel : </h4>
                    <p>
                        {day.hotel.name}, {day.hotel.starRating} stars
                    </p>
                    <p>{day.hotel.description}</p>
                </div>
            )}


            {day.activity ? (
                <div style={{marginTop: "2rem"}}>
                    <h4>Activity of the day :</h4>
                    <p>
                        {day.activity.name}
                    </p>
                    <p>{day.activity.description}</p>
                </div>
            ) : (
                <p style={{marginTop: "2rem"}}>Free evening to relax and explore the surroundings.</p>
            )}
        </div>
    );
};

export default RecapOneDay;