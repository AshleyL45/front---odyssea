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
//import TripRecap from "./pages/personnalized-trip/TripRecap";
import TripSummary from './pages/personnalized-trip/TripSummary';
import LayoutReservation from './layout/LayoutReservation';
import DateSelect1 from './pages/personnalized-trip/DateSelect1';
import TravelerSelect2 from "./pages/personnalized-trip/TravelerSelect2";
import CityFrom3 from "./pages/personnalized-trip/CityFrom3";
import CountrySelect4 from "./pages/personnalized-trip/CountrySelect4";
import CitySelect5 from "./pages/personnalized-trip/CitySelect5";
import StandingSelect6 from "./pages/personnalized-trip/StandingSelect6";
import OptionSelect8 from "./pages/personnalized-trip/OptionSelect8";
import ActivitySelect7 from "./pages/personnalized-trip/ActivitySelect7";
import Trip9 from "./pages/personnalized-trip/Trip9";
import TripPersRecap from "./pages/personnalized-trip/TripPersRecap";
import {PersonalizedTripContextProvider} from "./contexts/PersonalizedTripContext";

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
                        <PersonalizedTripContextProvider>
                         <Routes>
                            <Route element={<ProtectedRoutes/>}>
                                <Route path="dashboard" element={<Dashboard/>}></Route>
                                {/*A mettre avec le layoutReservation*/}
                                <Route path="/booking" element={<LayoutReservation/>}>
                                    <Route path="date" element={<BookingFormDate/>}></Route>
                                    <Route path="people" element={<BookingFormPeople/>}></Route>
                                    <Route path="options" element={<BookingFormOptions/>}></Route>
                                    <Route path="billing" element={<BookingFormBilling/>}></Route>
                                    <Route path="recap" element={<BookingFormRecap/>}></Route>
                                </Route>
                                <Route path="reservationDetails" element={<ReservationDetails/>}></Route>

                                <Route path="/booking-mystery-trip" >
                                    <Route element={<LayoutReservation/>} >
                                        <Route path="billing" element={<BookingMysteryTripBilling/>}></Route>
                                        <Route path="country" element={<BookingMysteryTripCountry/>}></Route>
                                        <Route path="date" element={<BookingMysteryTripDate/>}></Route>
                                        <Route path="traveller" element={<BookingMysteryTripTravellers/>}></Route>
                                        <Route path="submit" element={<BookingMysteryTripSubmit/>}></Route>
                                    </Route>
                                    <Route path="result" element={<BookingMysteryTripResult/>}></Route>
                                </Route>

                            </Route>


                             <Route path="/">
                                <Route element={<BackToTopLayout/>}>
                                    <Route index element={<HomePage/>}/>
                                    <Route path="trips" element={<ItineraryListPage/>}/>
                                    <Route path="trip/:tripId" element={<ItineraryDetails/>}/>
                                </Route>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="register" element={<RegisterPage/>}/>
                                 <Route path="mystery-trip" element={<MysteryTrip/>}></Route>
                                <Route path="cookies" element={<CookiesPolitic/>}/>
                                <Route path="legal" element={<LegalInformation/>}/>
                                <Route path="privacy" element={<PrivacyPreferences/>}/>
                                <Route path="terms" element={<TermsOfUse/>}/>
                                <Route path="aboutUs" element={<AboutUs/>}/>
                                <Route path="contact" element={<Contact/>}/>
                                <Route path="tripRecap" element={<TripRecap/>}/>
                             </Route>

                            <Route path="/personalized-trip" element={<LayoutReservation/>}>
                                <Route path="summary" element={<TripSummary/>}/>
                                <Route element={<ProtectedRoutes/>}>
                                    <Route path="date" element={<DateSelect1/>}/>
                                    <Route path="traveler-selection" element={<TravelerSelect2/>}/>
                                    <Route path="departure" element={<CityFrom3/>}/>
                                    <Route path="country-selection" element={<CountrySelect4/>}/>
                                    <Route path="city-selection" element={<CitySelect5/>}/>
                                    <Route path="standing-selection" element={<StandingSelect6/>}/>
                                    <Route path="activity-selection" element={<ActivitySelect7/>}/>
                                    <Route path="option-selection" element={<OptionSelect8/>}/>
                                    <Route path="message-section" element={<Trip9/>}/>
                                    <Route path="recap" element={<TripPersRecap/>}/>
                                </Route>
                            </Route>

                            </Routes>
                        </PersonalizedTripContextProvider>
                    </ReservationContextProvider>
                </MySelectionProvider>
            </DashboardContextProvider>
        </AuthProvider>
    );
}

export default App;
