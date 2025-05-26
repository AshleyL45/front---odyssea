import {FC, JSX} from 'react';
import {Day} from "../../@types/ItineraryDetailsResponse";

const TripDetailsReverse: ({day, image}: { day: Day, image: string }) => JSX.Element = ({day, image}) => {
    return (
        <div style={{margin: "150px 0"}} id={day.dayNumber.toString()}>

            <section className="component trip-details-reverse" style={{justifyContent: "end"}}>

                <div className="text-details-reverse">
                    <h3 style={{fontSize: "25px", marginBottom: "30px"}}>Day {day.dayNumber} - {day.activityName}</h3>
                    <p style={{marginBottom: "10px", lineHeight: 1.5}}>
                        {day.descriptionPerDay}
                    </p>

                    <div style={{margin: "1.5rem auto"}}>
                        <p><span style={{fontWeight: "bold"}}>Hotel : </span>{day.hotelName}</p>
                        <p>{day.hotelDescription}</p>
                    </div>

                        <p><span style={{fontWeight: "bold"}}>Activity of the day : </span>{day.activityDescription}</p>
                    </div>

                    <div className="trip-details-reverse-photo" style={{
                        border: "solid 1px black",
                        backgroundImage: `url(${image})`,
                        backgroundPosition: "center",
                        zIndex: 3
                    }}></div>
            </section>

            <div className="travel-line" style={{
                width: "40%",
                height: "3px",
                backgroundColor: "#745E4D",
                borderRadius: 4,
                margin: "20px auto"
            }}></div>

        </div>
    );
};

export default TripDetailsReverse;
