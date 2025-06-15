import {FC, JSX, useEffect, useState} from 'react';
import Overview from "../../../components/dashboard/Overview";
import Booking from "../../mainPages/user/Booking";
import History from "../../../components/dashboard/History";
import Settings from "../../../components/dashboard/Settings";
import MySelection from "../../../components/dashboard/MySelection";
import PersonalInformation from "../../../components/dashboard/PersonalInformation";
import SideBoard from "../../../components/navbars/SideBoard";
import NavbarDashboard from "../../../components/navbars/NavbarDashboard";
import Pages from "../../../components/layout/Pages"
import PersonalizedTrips from "../../../components/dashboard/PersonalizedTrips";

const Dashboard: ({}: {}) => JSX.Element = ({}) => {
    const [activePage, setActivePage] = useState<string>("Overview");


    return (
        <>
            <Pages title="Dashboard - Odyssea">
            </Pages>
            <NavbarDashboard/>

            <div className="dashboard">
                <SideBoard activePage={activePage} setActivePage={setActivePage}/>

                <div style={{width: "100%"}}>

                    {activePage === "Overview" && <Overview/>}
                    {activePage === "My bookings" && <Booking/>}
                    {activePage === "Travel History" && <History/>}
                    {activePage === "My selection" && <MySelection/>}
                    {activePage === "Personal information" && <PersonalInformation/>}
                    {activePage === "Settings" && <Settings/>}
                    {activePage === "My personalized trips" && <PersonalizedTrips/>}
                </div>

            </div>

        </>
    );
};

export default Dashboard;
