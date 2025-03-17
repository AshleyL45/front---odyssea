import React from "react";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import {ProtectedRoutes} from "./protected-routes/ProtectedRoutes";

import HomePage from "./pages/mainPages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ItineraryListPage from "./pages/mainPages/ItineraryListPage";
import Dashboard from "./pages/mainPages/user/Dashboard";
import ReservationDetails from "./pages/mainPages/user/ReservationDetails";
import Reservation from "./pages/mainPages/user/Reservation";
import AboutUs from "./pages/mainPages/company/AboutUs";
import Contact from "./pages/mainPages/company/Contact";

import Trip1 from "./pages/personnalized-trip/Trip1";
import TripSummary from "./pages/personnalized-trip/TripSummary";
import Trip2 from "./pages/personnalized-trip/Trip2";
import Trip3 from "./pages/personnalized-trip/Trip3";
import Trip4 from "./pages/personnalized-trip/Trip4";
import Trip5 from "./pages/personnalized-trip/Trip5";
import Trip6 from "./pages/personnalized-trip/Trip6";
import Trip7 from "./pages/personnalized-trip/Trip7";
import Trip8 from "./pages/personnalized-trip/Trip8";
import Trip9 from "./pages/personnalized-trip/Trip9";
import TripRecap from "./pages/personnalized-trip/TripRecap";
import ItineraryDetails from "./pages/mainPages/ItineraryDetails";
import LayoutReservation from "./layout/LayoutReservation";
import LayoutDefault from "./layout/LayoutDefault";


function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    {/* Routes protégées */}
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="reservation" element={<Reservation/>}/>
                        <Route path="reservationDetails" element={<ReservationDetails/>}/>
                    </Route>

                    {/* Routes publiques */}
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>

                    <Route element={<LayoutDefault/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="aboutUs" element={<AboutUs/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="trips" element={<ItineraryListPage/>}/>
                        <Route path="itinerary-details" element={<ItineraryDetails/>}/>
                    </Route>

                    {/* Routes personnalisées */}
                    <Route path="/personalized-trip" element={<LayoutReservation/>}>
                        <Route path="summary" element={<TripSummary/>}/>
                        <Route path="date" element={<Trip1/>}/>
                        <Route path="departure" element={<Trip2/>}/>
                        <Route path="country-selection" element={<Trip3/>}/>
                        <Route path="city-selection" element={<Trip4/>}/>
                        <Route path="traveler-selection" element={<Trip5/>}/>
                        <Route path="standing-selection" element={<Trip6/>}/>
                        <Route path="option-selection" element={<Trip7/>}/>
                        <Route path="activity-selection" element={<Trip8/>}/>
                        <Route path="message-section" element={<Trip9/>}/>
                        <Route path="recap" element={<TripRecap/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
