import {FC, JSX, useState} from 'react';
import NavbarDashboard from "../../../components/navbars/NavbarDashboard";
import SideBoard from "../../../components/navbars/SideBoard";


const Dashboard: ({}: {}) => JSX.Element = ({}) => {
    const [activePage, setActivePage] = useState<string>("Vue d'ensemble");

    return (
        <>
            <NavbarDashboard/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <SideBoard activePage={activePage} setActivePage={setActivePage} />
                <div>
                    {activePage === "Vue d'ensemble" && <p>Bienvenue sur la vue d'ensemble</p>}
                    {activePage === "Réservation" && <p>Gestion des réservations</p>}
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
