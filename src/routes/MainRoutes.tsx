// src/routes/MainRoutes.tsx
import {Route} from 'react-router-dom';
import HomePage from '../pages/mainPages/HomePage';
import ItineraryListPage from '../pages/mainPages/ItineraryListPage';
import ItineraryDetails from '../pages/mainPages/ItineraryDetails';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CookiesPolitic from '../pages/legals/CookiesPolitic';
import LegalInformation from '../pages/legals/LegalInformation';
import PrivacyPreferences from '../pages/legals/PrivacyPreferences';
import TermsOfUse from '../pages/legals/TermsOfUse';
import AboutUs from '../pages/mainPages/company/AboutUs';
import Contact from '../pages/mainPages/company/Contact';
import MysteryTrip from '../pages/mainPages/MysteryTrip';
import TripRecap from '../pages/personnalized-trip/TripRecap';
import BackToTopLayout from '../layout/BackToTopLayout';

const MainRoutes = [
    <Route>
        <Route key="main" path="/" element={<BackToTopLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="trips" element={<ItineraryListPage/>}/>
            <Route path="trip/:tripId" element={<ItineraryDetails/>}/>
        </Route>

        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="mystery-trip" element={<MysteryTrip/>}/>
        <Route path="cookies" element={<CookiesPolitic/>}/>
        <Route path="legal" element={<LegalInformation/>}/>
        <Route path="privacy" element={<PrivacyPreferences/>}/>
        <Route path="terms" element={<TermsOfUse/>}/>
        <Route path="aboutUs" element={<AboutUs/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="tripRecap" element={<TripRecap/>}/>
    </Route>
];

export default MainRoutes;