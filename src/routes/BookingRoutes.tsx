import {Route} from 'react-router-dom';
import LayoutBooking from '../layout/LayoutBooking';
import BookingFormDate from '../pages/bookingForm/BookingFormDate';
import BookingFormPeople from '../pages/bookingForm/BookingFormPeople';
import BookingFormOptions from '../pages/bookingForm/BookingFormOptions';
import BookingFormBilling from '../pages/bookingForm/BookingFormBilling';
import BookingFormRecap from '../pages/bookingForm/BookingFormRecap';

const BookingRoutes = [
    <Route key="booking-layout" path="/booking" element={<LayoutBooking/>}>
        <Route path="date" element={<BookingFormDate/>}/>
        <Route path="people" element={<BookingFormPeople/>}/>
        <Route path="options" element={<BookingFormOptions/>}/>
        <Route path="billing" element={<BookingFormBilling/>}/>
        <Route path="recap" element={<BookingFormRecap/>}/>
    </Route>
];

export default BookingRoutes;