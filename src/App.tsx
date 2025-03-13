import React from 'react';
import './App.css';
import NavbarDashboard from "./components/navbars/NavbarDashboard";
import NavbarReservation from "./components/navbars/NavbarReservationts";
import TripSummary from "./pages/personnalized-trip/TripSummary";
import Trip1 from "./pages/personnalized-trip/Trip1";
import Trip2 from "./pages/personnalized-trip/Trip2";
import Trip3 from "./pages/personnalized-trip/Trip3";
import Trip4 from "./pages/personnalized-trip/Trip4";
import Trip5 from "./pages/personnalized-trip/Trip5";
import Trip9 from "./pages/personnalized-trip/Trip9";
import Trip6 from "./pages/personnalized-trip/Trip6";
import Trip8 from "./pages/personnalized-trip/Trip8";
import TripRecap from "./pages/personnalized-trip/TripRecap";
import Trip7 from "./pages/personnalized-trip/Trip7";



function App() {
  return (
    <>

      <NavbarReservation/>
      <TripRecap/>

    </>
  );
}

export default App;
