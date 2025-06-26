import React from 'react';
import {Route} from 'react-router-dom';

import BackToTopLayout from '../layout/BackToTopLayout';
import HomePage from '../pages/mainPages/HomePage';
import ItineraryListPage from '../pages/mainPages/ItineraryListPage';
import ItineraryDetails from '../pages/mainPages/ItineraryDetails';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import MysteryTrip from '../pages/mainPages/MysteryTrip';
import CookiesPolitic from '../pages/legals/CookiesPolitic';
import LegalInformation from '../pages/legals/LegalInformation';
import PrivacyPreferences from '../pages/legals/PrivacyPreferences';
import TermsOfUse from '../pages/legals/TermsOfUse';
import AboutUs from '../pages/mainPages/company/AboutUs';
import Contact from '../pages/mainPages/company/Contact';
import TripRecap from '../pages/personnalized-trip/TripRecap';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import LayoutMain from "../layout/LayoutMain";

export function mainRoutes() {
    return [
        <Route path="/" element={<LayoutMain/>}>
            <Route path="/" element={<BackToTopLayout/>} key="main-layout">
                <Route index element={<HomePage/>}/>
                <Route path="trips" element={<ItineraryListPage/>}/>
                <Route path="trip/:tripId" element={<ItineraryDetails/>}/>
            </Route>,
            <Route path="mystery-trip" element={<MysteryTrip/>} key="mystery-trip"/>,
            <Route path="cookies" element={<CookiesPolitic/>} key="cookies"/>,
            <Route path="legal" element={<LegalInformation/>} key="legal"/>,
            <Route path="privacy" element={<PrivacyPreferences/>} key="privacy"/>,
            <Route path="terms" element={<TermsOfUse/>} key="terms"/>,
            <Route path="aboutUs" element={<AboutUs/>} key="aboutUs"/>,
            <Route path="contact" element={<Contact/>} key="contact"/>,
            <Route path="tripRecap" element={<TripRecap/>} key="tripRecap"/>,
            <Route
                path="unauthorized"
                element={<UnauthorizedPage/>}
                key="unauthorized"
            />
        </Route>,
        <Route path="login" element={<LoginPage/>} key="login"/>,
        <Route path="register" element={<RegisterPage/>} key="register"/>
    ];
}
