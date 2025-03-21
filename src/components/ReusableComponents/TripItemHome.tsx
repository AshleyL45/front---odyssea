import {FC} from 'react';
import CustomButton from "./CustomButton";
import "../../App.css"
import {Link} from "react-router-dom";

interface TripItemHomeProps {
    id: number;
    name: string;
    description: string;
}

const TripItemHome: React.FC<TripItemHomeProps> = ({id, name, description, ...rest}) => {

    return (
        <div style={{margin: "300px 0"}}>

            <section className="component trip-item-home" {...rest}>
            <div className="text-home">
                    <h2 style={{fontSize:"25px", margin: "20px 0"}}>{name}</h2>
                    <p style={{marginBottom: "10px"}}>{description}</p>
                    <Link to={`/trip/${id}`}>
                        <CustomButton variant="contained">En Savoir Plus</CustomButton>
                    </Link>
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
