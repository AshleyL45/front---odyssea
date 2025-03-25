import {FC, JSX, useState} from 'react';
import SideBoard from "../../../components/navbars/SideBoard";
import NavbarDashboard from "../../../components/navbars/NavbarDashboard";
import Pages from "../../../components/layout/Pages"

const Dashboard: ({}: {}) => JSX.Element = ({}) => {
    const [activePage, setActivePage] = useState<string>("Overview");

    return (
        <>
            <Pages title="Dashboard - Odyssea">
            </Pages>
            <NavbarDashboard/>

            <div className="dashboard">
                <SideBoard activePage={activePage} setActivePage={setActivePage} />
                {/*
                <div style={{width: "100%"}}>

                    {activePage === "Overview" && <Overview/>}
                    {activePage === "My bookings" && <Reservation/>}
                    {activePage === "Travel History" && <History/>}
                    {activePage === "My selection" && <MySelection/>}
                    {activePage === "Personal information" && <PersonalInformation/>}
                    {activePage === "Settings" && <Settings/>}
                </div>
                */}
            </div>

        </>
    );
};

export default Dashboard;
