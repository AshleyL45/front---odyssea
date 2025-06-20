import Dashboard from "../src/pages/mainPages/user/Dashboard";
import { DashboardContextProvider } from "./contexts/DashboardContext";

export const DashboardRoute = () => {
    return (
        <DashboardContextProvider>
            <Dashboard />
        </DashboardContextProvider>
    );
};
