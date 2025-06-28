import React from 'react';
import {Route} from 'react-router-dom';

import LayoutBooking from '../layout/LayoutBooking';
import TripSummary from '../pages/personnalized-trip/TripSummary';
import DateSelect1 from '../pages/personnalized-trip/DateSelect1';
import TravelerSelect2 from '../pages/personnalized-trip/TravelerSelect2';
import CityFrom3 from '../pages/personnalized-trip/CityFrom3';
import CountrySelect4 from '../pages/personnalized-trip/CountrySelect4';
import CitySelect5 from '../pages/personnalized-trip/CitySelect5';
import StandingSelect6 from '../pages/personnalized-trip/StandingSelect6';
import ActivitySelect7 from '../pages/personnalized-trip/ActivitySelect7';
import OptionSelect8 from '../pages/personnalized-trip/OptionSelect8';
import Trip9 from '../pages/personnalized-trip/Trip9';
import TripPersRecap from '../pages/personnalized-trip/TripPersRecap';
import PersonalizedTripDetailsPage from '../pages/personnalized-trip/PersonalizedTripDetailsPage';
import {ProtectedRoutes} from '../protected-routes/ProtectedRoutes';
import BackToTopLayout from "../layout/BackToTopLayout";

export function personalizedTripRoutes() {
    return [
        <Route path="personalized-trip" element={<LayoutBooking/>} key="pers-layout">
            <Route path="summary" element={<TripSummary/>}/>
            <Route element={<ProtectedRoutes allowedRoles="USER"/>}>
                <Route path="date" element={<DateSelect1/>}/>
                <Route path="traveler-selection" element={<TravelerSelect2/>}/>
                <Route path="departure" element={<CityFrom3/>}/>
                <Route path="country-selection" element={<CountrySelect4/>}/>
                <Route path="city-selection" element={<CitySelect5/>}/>
                <Route path="standing-selection" element={<StandingSelect6/>}/>
                <Route path="activity-selection" element={<ActivitySelect7/>}/>
                <Route path="option-selection" element={<OptionSelect8/>}/>
                <Route path="message-section" element={<Trip9/>}/>
                <Route element={<BackToTopLayout/>} key="main-layout">
                    <Route path="recap" element={<TripPersRecap/>}/>
                    <Route path="details/:id" element={<PersonalizedTripDetailsPage/>}/>
                </Route>

            </Route>
        </Route>,
    ];
}
