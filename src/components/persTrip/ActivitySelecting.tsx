import {FC, useState, useEffect} from "react";
import {post} from "../../API/api";
import {Activity} from "../../@types/PersonalizeTrip";
import "../../App.css";

interface ActivitySelectingProps {
    countryName: string;
    selectedCities: any[];
    onSelectionChange: (count: number) => void;
    setErrorMessage: (message: string | null) => void;
}

const ActivitySelecting: FC<ActivitySelectingProps> = ({ countryName, selectedCities, onSelectionChange, setErrorMessage}) => {
    const [activities, setActivities] = useState<{ [key: number]: Activity[] }>({});
    const [selected, setSelected] = useState<{ [key: number]: Activity[] }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countryMap, setCountryMap] = useState<{ [key: number]: string }>({}); // Mappe chaque ville à son pays.
    const [expandedActivities, setExpandedActivities] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (id: number) => {
        setExpandedActivities((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // 1. Charger les sélections depuis localStorage
    useEffect(() => {
        setSelected((prev) => {
            const mergedSelections = {...prev};

            selectedCities.forEach((city) => {
                if (!mergedSelections[city.id]) {
                    const stored = localStorage.getItem(`selectedActivities`);
                    if (stored) {
                        try {
                            mergedSelections[city.id] = JSON.parse(stored);
                        } catch (error) {
                            console.error(`Error parsing selected activities for city ${city.id}:`, error);
                        }
                    }
                }
            });
            return mergedSelections;
        });
    }, [selectedCities]);


    // 2. Récupérer les activités + construire le countryMap
    useEffect(() => {
        const fetchActivitiesAndMap = async () => {
            setIsLoading(true);
            let timeoutId: NodeJS.Timeout;

            timeoutId = setTimeout(() => { setIsLoading(false) }, 10000);

            const activitiesByCity: { [key: number]: Activity[] } = {};
            const countryMap: { [key: number]: string } = {};
            const countrySelection = JSON.parse(localStorage.getItem("countrySelection") || "[]");

            for (const city of selectedCities) {
                try {
                    const response = await post(`/activities/importAndGet?cityId=${city.id}&radius=10000`, {});
                    if (response && Array.isArray(response.data)) {
                        activitiesByCity[city.id] = response.data;
                    } else {
                        console.error(`Invalid response for city ${city.id}:`, response.message);
                    }
                } catch (error) {
                    console.error(`Failed to fetch activities for city ${city.id}`, error);
                }

                const country = countrySelection.find((item: any) => item.cityIds.includes(city.id));
                if (country) {
                    countryMap[city.id] = country.name;
                }
            }
            setActivities(activitiesByCity);
            setCountryMap(countryMap);
            clearTimeout(timeoutId);
            setIsLoading(false);
        };

        if (selectedCities.length) {
            fetchActivitiesAndMap();
        }
    }, [selectedCities]);


    // 3. Sauvegarder les sélections + notifier du total sélectionné
    useEffect(() => {
        const newSelections = Object.entries(selected).flatMap(([cityId, activities]) =>
            activities.map((activity) => ({...activity, cityId: Number(cityId)}))
        );

        const stored = localStorage.getItem("selectedActivities");
        let existingSelections: (Activity & { cityId: number })[] = [];

        if (stored) {
            try {
                existingSelections = JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing existing selected activities", e);
            }
        }

        // Filtrer les anciennes activités des mêmes villes pour éviter les doublons
        const updatedSelections = [
            ...existingSelections.filter(
                (activity) => !newSelections.some((newAct) => newAct.cityId === activity.cityId)
            ),
            ...newSelections,
        ];

       /* const minInfos = Object.entries(selected).flatMap(([cityId, activities]) =>
            activities.map((activity) => ({
                cityId: Number(cityId),
                activityId: activity.id
            }))
        );*/

        localStorage.setItem("selectedActivities", JSON.stringify(updatedSelections));
        onSelectionChange(updatedSelections.length);
    }, [selected]);


    const handleSelect = (cityId: number, activity: Activity) => {
        setSelected((prev) => {
            const currentSelection = prev[cityId] || [];
            const isAlreadySelected = currentSelection.some((act) => act.id === activity.id);

            let newSelection;
            if (isAlreadySelected) {
                newSelection = currentSelection.filter((act) => act.id !== activity.id);
            } else {
                if (currentSelection.length < 3) {
                    newSelection = [...currentSelection, activity];
                } else {
                    alert("You must select only up to 3 activities per city.");
                    return prev;
                }
            }

            return {...prev, [cityId]: newSelection};
        });
    };

    // retourne true si la description est trop longue (+ de 150 caractères en tout)
    const isTruncated = (activity: Activity): boolean => {
        return activity.description.length > (150 - activity.name.length);
    };

    // fais la différence entre la longueur du non et de la description
    const getTruncatedDescription = (activity: Activity, id: number) => {
        if (expandedActivities[id] || !isTruncated(activity)) { // l'utilisateur a cliqué sur "See more" ? || description pas besoin d’être tronquée ?
        // Si l’une des deux est vraie, on retourne toute la description sans troncature.
            return activity.description;
        }

        return activity.description.slice(0, 120 - activity.name.length) + "..."; // Sinon, on applique la troncature
    };

    return (
        <div>
            <h1 style={{textAlign: "center", fontSize: '1.5rem', marginTop: "70px"}}>What to do in {countryName} ?</h1>
            <div className="container-activity-layout">
                {isLoading ? (
                    <p style={{textAlign: "center", marginTop: "40px"}}>Loading activities...</p>
                ) : selectedCities.length > 0 ? (
                        selectedCities.map((city) => (
                            <section key={city.id}>
                                <h3 style={{margin: "50px 0 0 30px", fontSize:"1.35rem"}}>- {city.name} -</h3>
                                <div className="activity-scroll-container">
                                    <div className="activity-layout" style={{margin: "30px auto"}}>
                                        {activities[city.id]?.length > 0 ? (
                                            activities[city.id].map((activity) => {
                                                return (
                                                    <div
                                                        key={activity.id}
                                                        className={`activity-item 
                                                            ${selected[city.id]?.some((act) => act.id === activity.id) ? "selected" : ""}
                                                            ${expandedActivities[activity.id] ? "expanded" : ""}
                                                        `}
                                                        onClick={() => handleSelect(city.id, activity)}
                                                        style={{
                                                            transition: "all 0.3s ease",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <h4>{activity.name}</h4>
                                                        <p className="activity-description">
                                                            {getTruncatedDescription(activity, activity.id)}{" "}
                                                            {/* Affichage de la description tronquée */}
                                                        </p>
                                                        {isTruncated(activity) && (
                                                            <span
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleExpand(activity.id); // Gérer l'extension de la description
                                                                }}
                                                                style={{color: "black", textDecoration: "underline", textUnderlineOffset: '5px', cursor: "pointer", marginTop: "10px", display: "inline-block",
                                                                }}
                                                            >
                                                                {expandedActivities[activity.id] ? "See less" : "See more"}
                                                           </span>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p style={{textAlign: "center", marginTop: "40px"}}>No activities found for this city.</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        ))
                    ) : ( <p style={{textAlign: "center", marginTop: "40px"}}>No cities selected</p>
                )}
            </div>
        </div>
    );
};

export default ActivitySelecting;
