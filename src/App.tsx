import {Route, Routes} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import {MySelectionProvider} from './contexts/MySelectionContext';
import {DashboardContextProvider} from './contexts/DashboardContext';
import {BookingContextProvider} from './contexts/BookingContext';
import {PersonalizedTripContextProvider} from './contexts/PersonalizedTripContext';

import MainRoutes from './routes/MainRoutes';
import BookingRoutes from './routes/BookingRoutes';
import MysteryTripRoutes from './routes/MysteryTripRoutes';
import PersonalizedTripRoutes from './routes/PersonalizedTripRoutes';
import ProtectedRoutesGroup from './routes/ProtectedRoutesGroup';
import {ProtectedRoutes} from "./protected-routes/ProtectedRoutes";

function App() {
    return (
        <AuthProvider>
            <DashboardContextProvider>
                <MySelectionProvider>
                    <BookingContextProvider>
                        <PersonalizedTripContextProvider>
                            <Routes>
                                <Route element={<ProtectedRoutes/>}>
                                    {ProtectedRoutesGroup}
                                    {BookingRoutes}
                                    {MysteryTripRoutes}
                                </Route>
                                {PersonalizedTripRoutes}
                                {MainRoutes}
                            </Routes>
                        </PersonalizedTripContextProvider>
                    </BookingContextProvider>
                </MySelectionProvider>
            </DashboardContextProvider>
        </AuthProvider>
    );
}

export default App;