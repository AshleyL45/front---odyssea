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

import Date from "./pages/personnalized-trip/1Date";
import TripSummary from "./pages/personnalized-trip/TripSummary";
import Trip3 from "./pages/personnalized-trip/4Country";
import Trip4 from "./pages/personnalized-trip/5City";
import Trip6 from "./pages/personnalized-trip/6Standing";
import Trip7 from "./pages/personnalized-trip/8Option";
import Trip8 from "./pages/personnalized-trip/7Activity";
import Trip9 from "./pages/personnalized-trip/Trip9";
import TripRecap from "./pages/personnalized-trip/TripRecap";
import ItineraryDetails from "./pages/mainPages/ItineraryDetails";
import LayoutReservation from "./layout/LayoutReservation";
import LayoutDefault from "./layout/LayoutDefault";
import {PersonalizedTripContextProvider} from "./contexts/PersonalizedTripContext";
import TravelerSelection from "./pages/personnalized-trip/2Traveler";
import CityFrom from "./pages/personnalized-trip/3CityFrom";


function App() {
    return (
        <>
            <AuthProvider>
                <PersonalizedTripContextProvider>
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
                            <Route path="date" element={<Date/>}/>
                            <Route path="departure" element={<CityFrom/>}/>
                            <Route path="country-selection" element={<Trip3/>}/>
                            <Route path="city-selection" element={<Trip4/>}/>
                            <Route path="traveler-selection" element={<TravelerSelection/>}/>
                            <Route path="standing-selection" element={<Trip6/>}/>
                            <Route path="option-selection" element={<Trip7/>}/>
                            <Route path="activity-selection" element={<Trip8/>}/>
                            <Route path="message-section" element={<Trip9/>}/>
                            <Route path="recap" element={<TripRecap/>}/>
                        </Route>
                    </Routes>
                </PersonalizedTripContextProvider>
            </AuthProvider>
        </>
    );
}

export default App;
