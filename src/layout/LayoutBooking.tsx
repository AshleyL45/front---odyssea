import {FC} from 'react';
import {Outlet} from "react-router";
import NavbarBooking from "../components/navbars/NavbarBookings";

const LayoutBooking: FC<{}> = ({}) => {

    return (
        <div>
            <NavbarBooking/>
            <Outlet/>
        </div>
    );
};

export default LayoutBooking;
