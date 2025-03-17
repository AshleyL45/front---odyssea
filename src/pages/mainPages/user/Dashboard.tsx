import {FC, JSX, useState} from 'react';
import Overview from "../../../components/dashboard/Overview";
import Reservation from "./Reservation";
import History from "../../../components/dashboard/History";
import Settings from "../../../components/dashboard/Settings";
import MySelection from "../../../components/dashboard/MySelection";
import PersonalInformation from "../../../components/dashboard/PersonalInformation";
import SideBoard from "../../../components/navbars/SideBoard";
import NavbarDashboard from "../../../components/navbars/NavbarDashboard";

const Dashboard: ({}: {}) => JSX.Element = ({}) => {
    const [activePage, setActivePage] = useState<string>("Vue d'ensemble");



    return (
        <>
            <NavbarDashboard/>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <SideBoard activePage={activePage} setActivePage={setActivePage} />
                <div style={{width: "100%"}}>

                    {activePage === "Vue d'ensemble" && <Overview/>}
                    {activePage === "Réservation" && <Reservation/>}
                    {activePage === "Historique de voyage" && <History/>}
                    {activePage === "Ma sélection" && <MySelection/>}
                    {activePage === "Informations personnelles" && <PersonalInformation/>}
                    {activePage === "Paramètres" && <Settings/>}
                </div>
            </div>

        </>
    );
};

export default Dashboard;
