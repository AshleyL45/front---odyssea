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
import {ReservationContextProvider} from "./contexts/ReservationContext";
import BookingFormDate from "./pages/bookingForm/BookingFormDate";
import BookingFormPeople from "./pages/bookingForm/BookingFormPeople";
import BookingFormBilling from "./pages/bookingForm/BookingFormBilling";
import BookingFormRecap from "./pages/bookingForm/BookingFormRecap";
import BookingFormOptions from "./pages/bookingForm/BookingFormOptions";
import {Trip} from "./@types/Trip";
import TripRecap from "./pages/personnalized-trip/TripRecap";
import BackToTopLayout from './layout/BackToTopLayout';


function App() {
    return (
        <AuthProvider>
            <DashboardContextProvider>
                <MySelectionProvider>
                    <ReservationContextProvider>
                        <Routes>
                            <Route element={<ProtectedRoutes/>}>
                                <Route path="dashboard" element={<Dashboard/>}/>
                                <Route path="/booking">
                                    <Route path="date" element={<BookingFormDate/>}/>
                                    <Route path="people" element={<BookingFormPeople/>}/>
                                    <Route path="options" element={<BookingFormOptions/>}/>
                                    <Route path="billing" element={<BookingFormBilling/>}/>
                                    <Route path="recap" element={<BookingFormRecap/>}/>
                                </Route>
                                <Route path="reservationDetails" element={<ReservationDetails/>}/>
                            </Route>
                            <Route path="/">
                                <Route element={<BackToTopLayout/>}>
                                    <Route index element={<HomePage/>}/>
                                    <Route path="trips" element={<ItineraryListPage/>}/>
                                    <Route path="trip/:tripId" element={<ItineraryDetails/>}/>
                                </Route>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="register" element={<RegisterPage/>}/>
                                <Route path="cookies" element={<CookiesPolitic/>}/>
                                <Route path="legal" element={<LegalInformation/>}/>
                                <Route path="privacy" element={<PrivacyPreferences/>}/>
                                <Route path="terms" element={<TermsOfUse/>}/>
                                <Route path="aboutUs" element={<AboutUs/>}/>
                                <Route path="contact" element={<Contact/>}/>
                                <Route path="tripRecap" element={<TripRecap/>}/>
                            </Route>
                        </Routes>
                    </ReservationContextProvider>
                </MySelectionProvider>
            </DashboardContextProvider>
        </AuthProvider>
    );
}

export default App;
