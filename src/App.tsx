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

function App() {
  return (
    <>
        <AuthProvider>

            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="dashboard" element={<Dashboard/>}></Route>
                    <Route path="reservation" element={<Reservation/>}></Route>
                    <Route path="reservationDetails" element={<ReservationDetails/>}></Route>
                </Route>
                <Route index={true} path="login" element={<LoginPage/>}></Route>
                <Route path="register" element={<RegisterPage/>}></Route>
                <Route path="trips" element={<ItineraryListPage/>}></Route>
                <Route path="cookies" element={<CookiesPolitic/>}></Route>
                <Route path="legal" element={<LegalInformation/>}></Route>
                <Route path="privacy" element={<PrivacyPreferences/>}></Route>
                <Route path="terms" element={<TermsOfUse/>}></Route>
                <Route path="aboutUs" element={<AboutUs/>}></Route>
                <Route path="contact" element={<Contact/>}></Route>
            </Routes>

        </AuthProvider>
        {/*<Dashboard/>*/}



    </>
  );
}

export default App;
