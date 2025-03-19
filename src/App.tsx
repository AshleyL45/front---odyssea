import React from 'react';
import './App.css';
import LoginPage from "./pages/auth/LoginPage";
import {Routes, Route} from 'react-router-dom';
import RegisterPage from "./pages/auth/RegisterPage";
import {AuthProvider} from "./contexts/AuthContext";
import {ProtectedRoutes} from "./protected-routes/ProtectedRoutes";
import ItineraryListPage from "./pages/mainPages/ItineraryListPage";
import CookiesPolitic from "./pages/legals/CookiesPolitic";
import LegalInformation from "./pages/legals/LegalInformation";
import PrivacyPreferences from "./pages/legals/PrivacyPreferences";
import TermsOfUse from "./pages/legals/TermsOfUse";
import Dashboard from "./pages/mainPages/user/Dashboard";
import AboutUs from "./pages/mainPages/company/AboutUs";
import Contact from "./pages/mainPages/company/Contact";
import ReservationDetails from "./pages/mainPages/user/ReservationDetails";
import Reservation from "./pages/mainPages/user/Reservation";
import HomePage from "./pages/mainPages/HomePage";
import ItineraryDetails from "./pages/mainPages/ItineraryDetails";
import {MySelectionProvider} from "./contexts/MySelectionContext";
import {DashboardContextProvider} from "./contexts/DashboardContext";

import TripRecap from "./pages/personnalized-trip/TripRecap";

function App() {
  return (
    <>
        <AuthProvider>
            <DashboardContextProvider>
                <MySelectionProvider>
                    <Routes>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path="dashboard" element={<Dashboard/>}></Route>
                            <Route path="reservation" element={<Reservation/>}></Route>
                            <Route path="reservationDetails" element={<ReservationDetails/>}></Route>
                        </Route>
                        <Route path="/">
                            <Route index element={<HomePage/>}></Route>
                            <Route path="login" element={<LoginPage/>}></Route>
                            <Route path="register" element={<RegisterPage/>}></Route>
                            <Route path="trips" element={<ItineraryListPage/>}></Route>
                            <Route path="trip/tripId" element={<ItineraryDetails/>}></Route>
                            <Route path="cookies" element={<CookiesPolitic/>}></Route>
                            <Route path="legal" element={<LegalInformation/>}></Route>
                            <Route path="privacy" element={<PrivacyPreferences/>}></Route>
                            <Route path="terms" element={<TermsOfUse/>}></Route>
                            <Route path="aboutUs" element={<AboutUs/>}></Route>
                            <Route path="contact" element={<Contact/>}></Route>

                            <Route path="tripRecap" element={<TripRecap/>}></Route>
                        </Route>
                    </Routes>
                </MySelectionProvider>
            </DashboardContextProvider>
        </AuthProvider>




    </>
  );
}

export default App;
