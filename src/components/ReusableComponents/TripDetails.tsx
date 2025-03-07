import {FC} from 'react';
import "../../App.css"

const TripDetails: FC<{}> = ({}) => {
    return (
        <div style={{margin: "300px 0"}}>

            <section className="component trip-details">
                <div className="trip-details-photo"
                     style={{border: "solid 1px black", backgroundColor: "#F8F1E5"}}></div>

                <div className="text-details">
                    <h3 style={{fontSize: "25px", marginBottom: "30px"}}>Jour 1 - [ Endroit ou Activité ]</h3>
                    <p style={{marginBottom: "10px"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
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

export default TripDetails;
