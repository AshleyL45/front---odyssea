import React from 'react';
import {Route} from 'react-router-dom';

import LayoutBooking from '../layout/LayoutBooking';
import BookingMysteryTripCountry from '../pages/bookingMysteryTrip/BookingMysteryTripCountry';
import BookingMysteryTripDate from '../pages/bookingMysteryTrip/BookingMysteryTripDate';
import BookingMysteryTripTravellers from '../pages/bookingMysteryTrip/BookingMysteryTripTravellers';
import BookingMysteryTripOptions from '../pages/bookingMysteryTrip/BookingMysteryTripOptions';
import BookingMysteryTripSubmit from '../pages/bookingMysteryTrip/BookingMysteryTripSubmit';
import BookingMysteryTripBilling from '../pages/bookingMysteryTrip/BookingMysteryTripBilling';
import BookingMysteryTripResult from '../pages/bookingMysteryTrip/BookingMysteryTripResult';

export function mysteryTripRoutes() {
    return [
        <Route path="booking-mystery-trip" element={<LayoutBooking/>} key="mystery-layout">
            <Route path="country" element={<BookingMysteryTripCountry/>}/>
            <Route path="date" element={<BookingMysteryTripDate/>}/>
            <Route path="traveller" element={<BookingMysteryTripTravellers/>}/>
            <Route path="option" element={<BookingMysteryTripOptions/>}/>
            <Route path="submit" element={<BookingMysteryTripSubmit/>}/>
            <Route path="billing" element={<BookingMysteryTripBilling/>}/>
            <Route path="booking-mystery-trip/result" element={<BookingMysteryTripResult/>} key="mystery-result"/>,        </Route>
    ];
}
