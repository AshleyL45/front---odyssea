import {FC, JSX, useEffect, useState} from 'react';
import UserItinerary from "./UserItinerary";
import {get} from "../../API/api";
import {Trip} from "../../@types/Trip";
import {useAuth} from "../../contexts/AuthContext";

interface UserItineraryType {
    id: number;
    userId: number;
    startDate: string;
    endDate: string;
    startingPrice: number;
    totalDuration: number;
    departureCity: string;
    itineraryName: string | null;
    numberOfAdults: number;
    numberOfKids: number;
}

const PersonalizedTrips: ({}: {}) => JSX.Element = ({}) => {
    const [personalizedTrips, setPersonnalizedTrips] = useState<UserItineraryType[]>([]);
    const {userId} = useAuth()

    useEffect(() => {
        const fetchUserItineraries = async () => {
            try {
                const userItineraries = await get(`/userItinerary/all/${userId}`);

                if (userItineraries) {
                    setPersonnalizedTrips(userItineraries)
                }
            } catch (e) {
                console.error("Error while fetching reservations : ", e);
            }
        };
        fetchUserItineraries();
    }, []);

    return (
        <div>
            <div style={{position: "relative"}}>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    minHeight: "80vh"
                }}>
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
                            personalizedTrips && personalizedTrips.length > 0 && personalizedTrips.map((personalizedTrip) =>
                                <UserItinerary userItinerary={personalizedTrip}/>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PersonalizedTrips;
