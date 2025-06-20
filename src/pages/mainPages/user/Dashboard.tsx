import {useState} from 'react';
import Overview from "../../../components/dashboard/Overview";
import MyBookings from "../../../components/dashboard/MyBookings";
import History from "../../../components/dashboard/History";
import Settings from "../../../components/dashboard/Settings";
import MySelection from "../../../components/dashboard/MySelection";
import PersonalInformation from "../../../components/dashboard/PersonalInformation";
import SideBoard from "../../../components/navbars/SideBoard";
import NavbarDashboard from "../../../components/navbars/NavbarDashboard";
import Pages from "../../../components/layout/Pages"
import PersonalizedTrips from "../../../components/dashboard/PersonalizedTrips";
import styles from "./UserDashboard.module.css"

const Dashboard = ({}) => {
    const [activePage, setActivePage] = useState<string>("Overview");


    return (
        <Pages title="Dashboard - Odyssea">

            <NavbarDashboard/>

            <main className={styles.dashboard} role="presentation">
                <SideBoard activePage={activePage} setActivePage={setActivePage}/>

                <section style={{width: "100%"}}>

                    {activePage === "Overview" && <Overview/>}
                    {activePage === "My bookings" && <MyBookings/>}
                    {activePage === "Travel History" && <History/>}
                    {activePage === "My selection" && <MySelection/>}
                    {activePage === "My personalized trips" && <PersonalizedTrips/>}
                    {activePage === "Personal information" && <PersonalInformation/>}
                    {activePage === "Settings" && <Settings/>}

                </section>

            </main>
        </Pages>
    );
};

export default Dashboard;
