import {FC, JSX} from 'react';
import "../../App.css"

const TripNumbers: ({title, number}: { title: string; number: number }) => JSX.Element = ({title, number}) => {
    return (
        <div className="trip-number" style={{backgroundColor: "#F8F1E5", borderRadius: 16, border: "1px solid black", display:"grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr"}}>
            <h2 style={{justifySelf:"start", alignSelf:"start", padding: "20px 32px", fontSize: "1.5rem", lineHeight: 1.4}}>{title}</h2>
            <p style={{justifySelf: "end", alignSelf: "end", padding: "2px 32px", fontSize: "4rem"}}>{number}</p>
        </div>
    );
};

export default TripNumbers;
