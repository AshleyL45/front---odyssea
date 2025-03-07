import {FC} from 'react';
import CustomButton from "./CustomButton";
import "../../App.css"

const TripItemHome: FC<{}> = ({}) => {

    return (
        <div style={{margin: "300px 0"}}>

            <section className="component trip-item-home">
            <div className="text-home">
                    <h2 style={{fontSize:"25px", margin: "20px 0"}}>Nom du voyage - Thème</h2>
                    <p style={{marginBottom: "10px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <CustomButton variant="contained">En Savoir Plus</CustomButton>
                </div>

                <div className="trip-item-home-photo">
                    <div style={{border: "solid 2px black", backgroundColor: "#F8F1E5"}}></div>
                    <div style={{border: "solid 2px black", backgroundColor: "#F8F1E5"}}></div>
                </div>
            </section>

        </div>
    );
};

export default TripItemHome;
