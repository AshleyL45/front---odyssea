import React from 'react';
import {Routes} from 'react-router-dom';

import {AuthProvider} from './contexts/AuthContext';
import {MySelectionProvider} from './contexts/MySelectionContext';
import {BookingContextProvider} from './contexts/BookingContext';
import {PersonalizedTripContextProvider} from './contexts/PersonalizedTripContext';

import {protectedRoutes} from './routes/ProtectedRoutes';
import {mainRoutes} from './routes/MainRoutes';
import {personalizedTripRoutes} from './routes/PersonalizedTripRoutes';
import './font.css';

function App() {
    return (
        <AuthProvider>
            <MySelectionProvider>
                    <BookingContextProvider>
                        <PersonalizedTripContextProvider>
                            <Routes>
                                {protectedRoutes()}
                                {mainRoutes()}
                                {personalizedTripRoutes()}
                            </Routes>
                        </PersonalizedTripContextProvider>
                    </BookingContextProvider>
            </MySelectionProvider>
        </AuthProvider>
    );
}

export default App;
