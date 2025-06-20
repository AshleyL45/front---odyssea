import React from 'react';
import {Route} from 'react-router-dom';
import {ProtectedRoutes} from '../protected-routes/ProtectedRoutes';
import {DashboardRoute} from '../DashboardRoute';

import {bookingRoutes} from './BookingRoutes';
import {mysteryTripRoutes} from './MysteryTripRoutes';
import {adminRoutes} from './AdminRoutes';
import {personalizedTripRoutes} from './PersonalizedTripRoutes';

export function protectedRoutes() {
    return [
        <Route element={<ProtectedRoutes allowedRoles="USER"/>} key="protected-user">
            <Route path="dashboard" element={<DashboardRoute/>}/>
            {bookingRoutes()}
            {mysteryTripRoutes()}
            {personalizedTripRoutes()}
        </Route>,

        <Route element={<ProtectedRoutes allowedRoles="ADMIN"/>} key="protected-admin">
            {adminRoutes()}
        </Route>,
    ];
}
