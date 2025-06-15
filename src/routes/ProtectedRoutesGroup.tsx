import {Route} from 'react-router-dom';
import {ProtectedRoutes} from '../protected-routes/ProtectedRoutes';
import Dashboard from '../pages/mainPages/user/Dashboard';
import BookingDetails from '../pages/mainPages/user/BookingDetails';

const ProtectedRoutesGroup = [
    <Route key="protected" element={<ProtectedRoutes/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="bookingDetails" element={<BookingDetails/>}/>
    </Route>
];

export default ProtectedRoutesGroup;