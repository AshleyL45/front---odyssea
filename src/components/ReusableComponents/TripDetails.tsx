import {FC, JSX} from 'react';
import "../../App.css"
import {Day} from "../../@types/ItineraryDetailsResponse";

const TripDetails: ({day, image}: { day: Day, image: string }) => JSX.Element = ({day, image}) => {
    return (
        <div style={{margin: "150px 0"}} id={day.dayNumber.toString()}>

            <section className="component trip-details">
                <div className="trip-details-photo"
                     style={{border: "solid 1px black", backgroundImage: `url(${image})`, backgroundPosition: "center"}}></div>

                <div className="text-details">
                    <h3 style={{fontSize: "25px", marginBottom: "30px"}}>Day {day.dayNumber} - {day.activityName}</h3>
                    <p style={{marginBottom: "10px"}}>
                        {day.descriptionPerDay}
                    </p>

                    <div style={{margin: "1.5rem auto"}}>
                        <p><span style={{fontWeight: "bold"}}>Hotel : </span>{day.hotelName}</p>
                        <p>{day.hotelDescription}</p>
                    </div>


                    <p><span style={{fontWeight: "bold"}}>Activity of the day : </span>{day.activityDescription}</p>
                </div>
            </section>

            <div className="travel-line" style={{
                width: "40%",
                height: "3px",
                backgroundImage: `url(${image})`,
                borderRadius: 4,
                margin: "20px auto"
            }}></div>

        </div>
    );
};

export default TripDetails;
