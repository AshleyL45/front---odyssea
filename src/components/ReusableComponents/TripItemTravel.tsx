import {FC} from 'react';
import '../../App.css'
import CustomButton from "./CustomButton";

const TripItemTravel: FC<{}> = ({}) => {
    return (
        <div style={{margin: "250px 0"}}>
            <section className="component trip-item-travel">

                <div className="trip-item-travel-photo" style={{border: "solid 1px black", backgroundColor: "#F8F1E5"}}></div>

                <div className="text-travel">
                    <h2 style={{fontSize: "25px", margin: "0 0 20px"}}>Nom du voyage - Thème</h2>
                    <p style={{marginBottom: "10px"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                    </p>
                    <p style={{margin: "30px 0"}}>Date du séjour | Prix €</p>
                    <a style={{textDecoration: "underline", fontSize: "18px", fontWeight: "bold"}}>Détails</a>
                </div>

            </section>

            <div className="travel-line" style={{width: "40%", height: "3px", backgroundColor: "#745E4D", borderRadius: 4, margin: "20px auto"}}></div>

        </div>
    );
};

export default TripItemTravel;
