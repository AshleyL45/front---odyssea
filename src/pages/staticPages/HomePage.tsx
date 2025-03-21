import {FC, JSX} from 'react';
import TripItemHome from "../../components/ReusableComponents/TripItemHome";

const HomePage: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <h2>Discover the world</h2>
            <TripItemHome></TripItemHome>
        </div>
    );
};

export default HomePage;
