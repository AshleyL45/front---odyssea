import {FC} from 'react';
import {Outlet} from "react-router";
import NavbarReservation from "../components/navbars/NavbarReservationts";

const LayoutReservation: FC<{}> = ({}) => {

    return (
        <div>
            <NavbarReservation/>
            <Outlet/>
        </div>
    );
};

export default LayoutReservation;
