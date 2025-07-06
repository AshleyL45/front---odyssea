import React, {FC} from 'react';
import {Outlet} from "react-router";
import Navbar from "../components/navbars/Navbar";
import Footer from "../components/ReusableComponents/Footer";

const LayoutMain: FC<{}> = ({}) => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default LayoutMain;