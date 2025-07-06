import {JSX, useEffect} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import TripNumbers from "../../styles/components/TripNumbers";
import {useMySelectionContext} from "../../contexts/MySelectionContext";
import {useUserDashboard} from "../../contexts/DashboardContext";
import {Backdrop, CircularProgress} from "@mui/material";
import {useLocation} from "react-router-dom";

const Overview: ({}: {}) => JSX.Element = ({}) => {
    const {userBookings, lastDoneBooking, pastTrips, firstCurrentBooking, loading} = useUserDashboard();
    const {favorites} = useMySelectionContext();
    const { pathname } = useLocation();

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <div className="container-overview">
            <h2 style={{margin: "1rem", fontFamily: "Literata, serif", fontSize: "1.7rem", fontWeight: 400}}>Overview</h2>

            {
                loading && <Backdrop
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }

            <div className="container-trip-number">
                <TripNumbers title={"Current"} number={userBookings.length}/>
                <TripNumbers title={"My selection"} number={favorites.length}/>
                <TripNumbers title={"Travel history"} number={pastTrips.length}/>
            </div>

            <h2 className="sub-title">Current trip</h2>
            {
                firstCurrentBooking ? (
                    <TripDashboard page={"Overview"} booking={firstCurrentBooking}/>
                ): <p style={{marginLeft: "8rem"}}>No current trips.</p>
            }



            {
                lastDoneBooking && (
                    <>
                        <h2 className="sub-title">Last Trip</h2>
                        <TripDashboard booking={lastDoneBooking} page="Overview"/>
                    </>
                )
            }


        </div>
    );
};

export default Overview;
