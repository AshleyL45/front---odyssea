import {FC, JSX, useState} from 'react';
import SideBoard from "../../../components/SideBoard";
import NavbarDashboard from "../../../components/NavbarDashboard";
import Overview from "../../../components/dashboard/Overview";
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import {Trip} from "../../../@types/Trip";
import Reservation from "./Reservation";

const Dashboard: ({}: {}) => JSX.Element = ({}) => {
    const [activePage, setActivePage] = useState<string>("Vue d'ensemble");


    return (
        <>
            <NavbarDashboard/>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <SideBoard activePage={activePage} setActivePage={setActivePage} />
                <div>

                    {activePage === "Vue d'ensemble" && <Overview/>}
                    {activePage === "Réservation" && <Reservation/>}
                    {activePage === "Historique de voyage" && <p>Historique des voyages</p>}
                    {activePage === "Ma sélection" && <p>Votre sélection</p>}
                    {activePage === "Informations personnelles" && <p>Vos informations personnelles</p>}
                    {activePage === "Paramètres" && <p>Paramètres du compte</p>}
                </div>
            </div>

        </>
    );
};

export default Dashboard;
