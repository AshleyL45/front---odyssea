import {JSX} from 'react';
import UserItinerary from "./UserItinerary";
import {useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {useUserDashboard} from "../../contexts/DashboardContext";


const PersonalizedTrips: ({}: {}) => JSX.Element = ({}) => {
    const {personalizedTrips, loading} = useUserDashboard();
    const navigate = useNavigate();

    return (
        <div>
            <div style={{position: "relative"}}>

                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    minHeight: "80vh"
                }}>

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

                    <div>
                        <h1 style={{
                            marginLeft: "8rem",
                            marginTop: "1.8rem",
                            marginBottom: "2rem",
                            fontSize: "1.8rem"
                        }}>My personalized trips</h1>
                    </div>

                    <div>
                        {
                            personalizedTrips && personalizedTrips.length > 0 ? personalizedTrips.map((personalizedTrip) =>
                                <UserItinerary userItinerary={personalizedTrip}/>
                            ) : (
                                <p>You haven't booked a personalized trip. <span onClick={() => navigate("/personalized-trip/summary") }>Get your personalized trip</span></p>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PersonalizedTrips;
