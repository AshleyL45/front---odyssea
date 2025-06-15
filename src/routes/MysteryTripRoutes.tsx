import {Route} from 'react-router-dom';
import LayoutBooking from '../layout/LayoutBooking';
import BookingMysteryTripCountry from '../pages/bookingMysteryTrip/BookingMysteryTripCountry';
import BookingMysteryTripDate from '../pages/bookingMysteryTrip/BookingMysteryTripDate';
import BookingMysteryTripTravellers from '../pages/bookingMysteryTrip/BookingMysteryTripTravellers';
import BookingMysteryTripSubmit from '../pages/bookingMysteryTrip/BookingMysteryTripSubmit';
import BookingMysteryTripResult from '../pages/bookingMysteryTrip/BookingMysteryTripResult';
import BookingMysteryTripBilling from '../pages/bookingMysteryTrip/BookingMysteryTripBilling';

const MysteryTripRoutes = [
    <Route key="mystery-layout" path="/booking-mystery-trip" element={<LayoutBooking/>}>
        <Route path="country" element={<BookingMysteryTripCountry/>}/>
        <Route path="date" element={<BookingMysteryTripDate/>}/>
        <Route path="traveller" element={<BookingMysteryTripTravellers/>}/>
        <Route path="submit" element={<BookingMysteryTripSubmit/>}/>
        <Route path="result" element={<BookingMysteryTripResult/>}/>
        <Route path="billing" element={<BookingMysteryTripBilling/>}/>
    </Route>
];

export default MysteryTripRoutes;