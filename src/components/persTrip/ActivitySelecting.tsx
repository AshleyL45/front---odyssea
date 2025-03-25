import {FC, useState, useEffect} from "react";
import {post} from "../../API/api";
import {Activity} from "../../@types/PersonalizeTrip";
import "../../App.css";

interface ActivitySelectingProps {
    countryName: string;
    selectedCities: any[];
    onSelectionChange: (count: number) => void;
    setErrorMessage: (message: string | null) => void; // Nouvelle prop pour gérer les erreurs
}

const ActivitySelecting: FC<ActivitySelectingProps> = ({countryName, selectedCities, onSelectionChange, setErrorMessage}) => {
    const [activities, setActivities] = useState<{ [key: number]: Activity[] }>({});
    const [selected, setSelected] = useState<{ [key: number]: Activity[] }>({});
    const [countryMap, setCountryMap] = useState<{ [key: number]: string }>({});

    // 🔹 Charger les activités sélectionnées depuis localStorage au montage
    useEffect(() => {
        const storedSelections: { [key: number]: Activity[] } = {};

        selectedCities.forEach((city) => {
            const storedActivities = localStorage.getItem(`selectedActivitiesByCity_${city.id}`);
            if (storedActivities) {
                try {
                    storedSelections[city.id] = JSON.parse(storedActivities);
                } catch (error) {
                    console.error(`Error parsing selected activities for city ${city.id}:`, error);
                }
            }
        });

        setSelected(storedSelections);
    }, [selectedCities]);

    // 🔹 Sauvegarder en `localStorage` lorsque `selected` change
    useEffect(() => {
        Object.entries(selected).forEach(([cityId, activities]) => {
            localStorage.setItem(`selectedActivitiesByCity_${cityId}`, JSON.stringify(activities));
        });
    }, [selected]);

    // 🔹 Récupérer les activités pour chaque ville
    useEffect(() => {
        const fetchActivities = async () => {
            const activitiesByCity: { [key: number]: Activity[] } = {};

            for (const city of selectedCities) {
                try {
                    const response = await post(`/activities/importAndGet?cityId=${city.id}&radius=50`, {});
                    if (response && Array.isArray(response)) {
                        activitiesByCity[city.id] = response;
                    } else {
                        console.error(`Invalid response format for city ID ${city.id}:`, response);
                    }
                } catch (error) {
                    console.error(`Failed to fetch activities for city ${city.id}`, error);
                }
            }

            setActivities(activitiesByCity);
        };

        fetchActivities();
    }, [selectedCities]);

    // 🔹 Charger la correspondance ville-pays depuis `localStorage`
    useEffect(() => {
        const countrySelection = JSON.parse(localStorage.getItem("countrySelection") || "[]");
        const countryMap = selectedCities.reduce((acc, city) => {
            const country = countrySelection.find((item: any) => item.cityIds.includes(city.id));
            if (country) {
                acc[city.id] = country.name;
            }
            return acc;
        }, {} as { [key: number]: string });

        setCountryMap(countryMap);
    }, [selectedCities]);

    // 🔹 Mettre à jour le nombre total d'activités sélectionnées
    useEffect(() => {
        const totalSelected = Object.values(selected).reduce((acc, curr) => acc + curr.length, 0);
        onSelectionChange(totalSelected);
    }, [selected]);

    // 🔹 Gérer la sélection des activités (stocker les objets entiers)
    const handleSelect = (cityId: number, activity: Activity) => {
        setSelected((prev) => {
            const currentSelection = prev[cityId] || [];
            const isAlreadySelected = currentSelection.some((act) => act.id === activity.id);

            let newSelection;
            if (isAlreadySelected) {
                newSelection = currentSelection.filter((act) => act.id !== activity.id);
            } else {
                if (currentSelection.length < 2) {
                    newSelection = [...currentSelection, activity];
                } else {
                   alert("You must select only up to 2 activities per city.")
                    return prev;
                }
            }

            return {...prev, [cityId]: newSelection};
        });
    };

    return (
        <div style={{margin: "70px 0 150px"}}>
            <h1 style={{textAlign: "center"}}>What to do in {countryName} ?</h1>
            <div
                className="container-activity-layout"
                style={{
                    margin: "20px 0",
                    display: "flex",
                    gap: "150px",
                    alignItems: "start",
                    justifyContent: "center",
                }}
            >
                {selectedCities.length > 0 ? (
                    selectedCities.map((city) => (
                        <div key={city.id}>
                            <h3 style={{margin: "10px 0 30px"}}>{city.name}</h3>
                            <div className="activity-layout">
                                {activities[city.id]?.length > 0 ? (
                                    activities[city.id].map((activity) => (
                                        <div
                                            key={activity.id}
                                            className={`activity-item ${selected[city.id]?.some((act) => act.id === activity.id) ? "selected" : ""}`}
                                            onClick={() => handleSelect(city.id, activity)}
                                        >
                                            <h4>{activity.name}</h4>
                                            <p>{activity.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No activities found for this city.</p>
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
