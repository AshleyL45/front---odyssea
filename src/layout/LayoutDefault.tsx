import {FC} from "react";
import {Outlet, useLocation} from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/navbars/Navbar";
import NavbarReservation from "../components/navbars/NavbarReservationts";


const LayoutDefault: FC = () => {
    const location = useLocation();

    // Sélectionne le bon Navbar en fonction de l'URL
    const getNavbar = () => {
        if (location.pathname.startsWith("/personalized-trip")) {
            return <NavbarReservation/>;
        }
        return <Navbar/>;
    };

    return (
        <>
            {getNavbar()}
            <Outlet/>
            <Footer/>
        </>
    );
};

export default LayoutDefault;
