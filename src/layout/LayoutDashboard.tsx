import {FC} from 'react';
import {Outlet} from "react-router";
import NavbarDashboard from "../components/navbars/NavbarDashboard";

const LayoutDashboard: FC<{}> = ({}) => {

    return (
        <div>
            <NavbarDashboard/>
            <Outlet/>
        </div>
    );
};

export default LayoutDashboard;
