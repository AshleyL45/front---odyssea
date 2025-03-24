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
import MysteryTrip from "./pages/mainPages/MysteryTrip";
import BookingMysteryTripCountry from "./pages/bookingMysteryTrip/BookingMysteryTripCountry";
import BookingMysteryTripDate from "./pages/bookingMysteryTrip/BookingMysteryTripDate";
import BookingMysteryTripTravellers from "./pages/bookingMysteryTrip/BookingMysteryTripTravellers";
import BookingMysteryTripResult from "./pages/bookingMysteryTrip/BookingMysteryTripResult";
import BookingMysteryTripSubmit from "./pages/bookingMysteryTrip/BookingMysteryTripSubmit";
import BookingMysteryTripBilling from "./pages/bookingMysteryTrip/BookingMysteryTripBilling";
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

                                <Route path="reservationDetails" element={<ReservationDetails/>}></Route>
                                <Route path="/booking-mystery-trip">
                                    <Route path="billing" element={<BookingMysteryTripBilling/>}></Route>
                                    <Route path="country" element={<BookingMysteryTripCountry/>}></Route>
                                    <Route path="date" element={<BookingMysteryTripDate/>}></Route>
                                    <Route path="traveller" element={<BookingMysteryTripTravellers/>}></Route>
                                    <Route path="result" element={<BookingMysteryTripResult/>}></Route>
                                    <Route path="submit" element={<BookingMysteryTripSubmit/>}></Route>
                                </Route>
                                <Route path="reservationDetails" element={<ReservationDetails/>}/>
                            </Route>

                            <Route path="/">
                            {/*<Route index element={<HomePage/>}></Route>*/}
                              <Route path={"homePage"} element={<HomePage/>}></Route>
                                <Route path="login" element={<LoginPage/>}></Route>
                                <Route path="register" element={<RegisterPage/>}></Route>
                                <Route path="trips" element={<ItineraryListPage/>}></Route>
                                <Route path="trip/:tripId" element={<ItineraryDetails/>}></Route>
                                <Route path="cookies" element={<CookiesPolitic/>}></Route>
                                <Route path="legal" element={<LegalInformation/>}></Route>
                                <Route path="privacy" element={<PrivacyPreferences/>}></Route>
                                <Route path="terms" element={<TermsOfUse/>}></Route>
                                <Route path="aboutUs" element={<AboutUs/>}></Route>
                                <Route path="contact" element={<Contact/>}></Route>
                                <Route path="tripRecap" element={<TripRecap/>}></Route>
                                <Route path="mystery-trip" element={<MysteryTrip/>}></Route>

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
