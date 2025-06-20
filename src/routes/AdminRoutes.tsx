import React from 'react';
import {Route} from 'react-router-dom';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminBookingDetailsPage from '../pages/admin/AdminBookingDetailsPage';

export function adminRoutes() {
    return [
        <Route path="admin" element={<AdminDashboard/>} key="admin-dashboard"/>,
        <Route path="admin/bookings/:id" element={<AdminBookingDetailsPage/>} key="admin-booking-details"/>,
    ];
}
