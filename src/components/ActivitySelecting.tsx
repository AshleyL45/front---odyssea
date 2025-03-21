import {FC, useState, useEffect} from 'react';
import {get} from "../API/api";
import {Activity} from "../@types/PersonalizeTrip";
import "../App.css";

interface ActivitySelectingProps {
    countryName: string; // Nom du pays
    selectedCities: any[]; // Villes sélectionnées pour ce pays
    onSelectionChange: (count: number) => void; // Callback pour mettre à jour le nombre d'activités sélectionnées
}

const ActivitySelecting: FC<ActivitySelectingProps> = ({countryName, selectedCities, onSelectionChange}) => {
    const [activities, setActivities] = useState<{ [key: string]: Activity[] }>({});
    const [selected, setSelected] = useState<{ [key: string]: number[] }>({});

    // Récupérer les activités pour chaque ville
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await get(`/activities/top5`);
                if (response && Array.isArray(response)) {
                    const activitiesByCity: { [key: string]: Activity[] } = {};
                    selectedCities.forEach((city, index) => {
                        activitiesByCity[`city${index + 1}`] = response.filter((activity: Activity) => activity.cityId === city.id);
                    });
                    setActivities(activitiesByCity);
                }
            } catch (error) {
                console.error("Failed to fetch activities", error);
            }
        };
        fetchActivities();
    }, [selectedCities]);

    // Mettre à jour le nombre total d'activités sélectionnées
    useEffect(() => {
        const totalSelected = Object.values(selected).reduce((acc, curr) => acc + curr.length, 0);
        onSelectionChange(totalSelected);
    }, [selected, onSelectionChange]);

    // Gérer la sélection des activités
    const handleSelect = (city: string, index: number) => {
        setSelected((prev) => {
            const currentSelection = prev[city] || [];

            if (currentSelection.includes(index)) {
                return {...prev, [city]: currentSelection.filter((i) => i !== index)};
            }

            if (currentSelection.length < 2) {
                return {...prev, [city]: [...currentSelection, index]};
            }

            return prev;
        });
    };

    return (
        <div style={{margin: "70px 0 150px"}}>
            <h1 style={{textAlign: "center"}}>What to do in : {countryName} ?</h1>
            <div className="container-activity-layout"
                 style={{
                     margin: "20px 0",
                     display: "flex",
                     gap: "150px",
                     alignItems: "center",
                     justifyContent: "center"
                 }}>
                {selectedCities.length > 0 ? (
                    selectedCities.map((city, index) => (
                        <div key={city.id}>
                            <h3 style={{margin: "10px 0 30px"}}>{city.name}</h3>
                            <div className="activity-layout">
                                {activities[`city${index + 1}`]?.length > 0 ? (
                                    activities[`city${index + 1}`].map((activity, activityIndex) => (
                                        <div
                                            key={activity.id}
                                            className={`activity-item ${selected[`city${index + 1}`]?.includes(activityIndex) ? "selected" : ""}`}
                                            onClick={() => handleSelect(`city${index + 1}`, activityIndex)}
                                        >
                                            <h4>{activity.name}</h4>
                                            <p>{activity.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading activities...</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cities selected</p>
                )}
            </div>
        </div>
    );
};

export default ActivitySelecting;