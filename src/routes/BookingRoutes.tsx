import React from 'react';
import {Route} from 'react-router-dom';

import LayoutBooking from '../layout/LayoutBooking';
import BookingFormDate from '../pages/bookingForm/BookingFormDate';
import BookingFormPeople from '../pages/bookingForm/BookingFormPeople';
import BookingFormOptions from '../pages/bookingForm/BookingFormOptions';
import BookingFormBilling from '../pages/bookingForm/BookingFormBilling';
import BookingFormRecap from '../pages/bookingForm/BookingFormRecap';
import BookingDetails from '../pages/mainPages/user/BookingDetails';

export function bookingRoutes() {
    return [
        <Route path="booking" element={<LayoutBooking/>} key="booking-layout">
            <Route path="date" element={<BookingFormDate/>}/>
            <Route path="people" element={<BookingFormPeople/>}/>
            <Route path="options" element={<BookingFormOptions/>}/>
            <Route path="billing" element={<BookingFormBilling/>}/>
            <Route path="recap" element={<BookingFormRecap/>}/>
        </Route>,
        <Route path="reservationDetails" element={<BookingDetails/>} key="reservation-details"/>,
    ];
}
