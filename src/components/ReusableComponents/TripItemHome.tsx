import {FC} from 'react';
import CustomButton from "./CustomButton";
import "../../App.css"
import {Link} from "react-router-dom";

interface TripItemHomeProps {
    id: number;
    name: string;
    description: string;
    headerImage1: string;
    headerImage2: string;
}

const TripItemHome: React.FC<TripItemHomeProps> = ({id, name, description, headerImage1, headerImage2, ...rest}) => {

    return (
        <div style={{margin: "250px 0"}}>

            <section className="component trip-item-home" {...rest}>
            <div className="text-home">
                    <h2 style={{fontSize:"25px", margin: "20px 0"}}>{name}</h2>
                    <p style={{marginBottom: "10px"}}>{description}</p>
                    <Link to={`/trip/${id}`}>
                        <CustomButton variant="contained">Learn More</CustomButton>
                    </Link>
                </div>

                <div className="trip-item-home-photo">
                    <div style={{border: "solid 2px black", backgroundImage: `url(${headerImage1})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"}}></div>
                    <div style={{borderTop: "none", border: "solid 2px black", backgroundImage: `url(${headerImage2})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"}}></div>
                </div>
            </section>

        </div>
    );
};

export default TripItemHome;
