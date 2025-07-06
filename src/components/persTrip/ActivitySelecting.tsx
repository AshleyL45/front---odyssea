import {FC, useState, useEffect} from "react";
import {post} from "../../API/api";
import {Activity, CitySelection} from "../../@types/PersonalizeTrip";
import "../../App.css";

interface ActivitySelectingProps {
    countryName: string;
    selectedCities: CitySelection[];
}

const ActivitySelecting: FC<ActivitySelectingProps> = ({ countryName, selectedCities }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState<{ [key: number]: Activity[] }>({});
    const [selected, setSelected] = useState<Activity[]>([]);
    const [expandedActivities, setExpandedActivities] = useState<{ [key: number]: boolean }>({});

    // récupère les activités
    useEffect(() => {
        const fetchActivities = async () => {
            setIsLoading(true);
            let timeout: NodeJS.Timeout;
            // sécurité : désactive le loader après 10 sec
            timeout = setTimeout(() => {setIsLoading(false)}, 10000);

            const result: { [key: number]: Activity[] } = {};

            for(const city of selectedCities){
                try {
                    const response = await post(`/activities/importAndGet?cityId=${city.id}&radius=10000`, {});
                    if (response && Array.isArray(response.data)) { // vérifie si la réponse est bien une liste d'activités
                        result[city.id] = response.data;
                    } else {
                        result[city.id] = [];
                    }
                } catch (error){
                    console.error(`Erreur pour la ville ${city.cityName}`, error);
                    result[city.id] = [];
                }
            }

            setActivities(result);
            clearTimeout(timeout);
            setIsLoading(false);
        };

        if(selectedCities.length > 0){
            fetchActivities()
        }
    }, [selectedCities]);


    const handleSelect = (activity: Activity, cityId: number) => {
        const stored = localStorage.getItem('selectedActivities');
        // transforme en tableau d'objets
        let selection: Activity[] = stored ? JSON.parse(stored) : [];
        console.log("selection", selection);

        const alreadySelected = selection.find((a) => a.id === activity.id);

        if(alreadySelected){
            // on la retire
            selection = selection.filter((a) => a.id !== activity.id);
        } else {
            // vérifier combien d'activités sont sélectionnées pour cette ville
            const activitiesInThisCity = selection.filter((a) => a.cityId === cityId);
            if(activitiesInThisCity.length >= 3){
                alert("You can only select 3 activities per city.");
                return; // stop
            }

            // on l'ajoute
            selection.push(activity);
        }

        localStorage.setItem('selectedActivities', JSON.stringify(selection));
        setSelected(selection)
    };

    useEffect(() => {
        const stored = localStorage.getItem('selectedActivities');
        if (stored) {
            try {
                const parsed: Activity[] = JSON.parse(stored);
                setSelected(parsed);
            } catch (e) {
                console.error("Erreur lors du parsing des activités sélectionnées", e);
            }
        }
    }, []);

    const isTruncated = (activity: Activity): boolean => {
        return activity.description.length > (150 - activity.name.length);
    };

    const getTruncatedDescription = (activity: Activity, id: number) => {
        if (expandedActivities[id] || !isTruncated(activity)) {
            return activity.description;
        }
        return activity.description.slice(0, 120 - activity.name.length) + "...";
    };

    const toggleExpand = (id: number) => {
        setExpandedActivities((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    return (
        <div>
            <h1 style={{textAlign: "center", fontSize: '1.5rem', marginTop: "70px"}}>What to do in {countryName} ?</h1>
            <div className="container-activity-layout">
                {isLoading ? (
                    <p style={{textAlign: "center", marginTop: "40px"}}>Loading activities...</p>
                ) : (
                    selectedCities.length > 0 ? (
                        selectedCities.map((city) => (
                            <section key={city.id}>
                                <h3 style={{margin: "50px 0 0 30px", fontSize: "1.35rem"}}>- {city.cityName} -</h3>
                                <div className='activity-scroll-container'>
                                    <div className="activity-layout" style={{margin: "30px auto"}}>
                                        {activities[city.id]?.length > 0 ? (
                                            activities[city.id].map((activity: Activity) => (
                                                <div
                                                    key={activity.id}
                                                    onClick={() => handleSelect(activity, city.id)}
                                                    className={`activity-item ${selected.some((a) => a.id === activity.id) ? 'selected' : ''}`}
                                                >
                                                    <h4>{activity.name}</h4>
                                                    <p className="activity-description">{getTruncatedDescription(activity, activity.id)}{" "}</p>
                                                    {isTruncated(activity) && (
                                                        <span
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleExpand(activity.id);
                                                            }}
                                                            style={{
                                                                color: "black",
                                                                textDecoration: "underline",
                                                                textUnderlineOffset: '5px',
                                                                cursor: "pointer",
                                                                marginTop: "10px",
                                                                display: "inline-block",
                                                            }}
                                                        >
                                                        {expandedActivities[activity.id] ? "See less" : "See more"}
                                                    </span>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No activities available for {city.id}</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        ))
                    ) : (
                        <p>No city selected</p>
                    )
                )}
            </div>
        </div>
    );
};

export default ActivitySelecting;
