import React from 'react';
import {Route} from 'react-router-dom';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminBookingDetailsPage from '../pages/admin/AdminBookingDetailsPage';
import BackToTopLayout from "../layout/BackToTopLayout";

export function adminRoutes() {
    return [
        <Route path="admin" element={<AdminDashboard/>} key="admin-dashboard"/>,
        <Route element={<BackToTopLayout/>} key="main-layout">
            <Route path="admin/bookings/:id" element={<AdminBookingDetailsPage/>} key="admin-booking-details"/>
        </Route>
    ];
}
