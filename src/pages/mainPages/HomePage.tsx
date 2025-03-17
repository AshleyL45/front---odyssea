import {FC, JSX} from 'react';
import Navbar from "../../components/navbars/Navbar";

const HomePage: ({}: {}) => JSX.Element = ({}) => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Home page</h1>
        </div>
    );
};

export default HomePage;
