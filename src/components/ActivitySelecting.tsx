import {FC, JSX, useState} from 'react';

const ActivitySelecting: ({}: {}) => JSX.Element = ({}) => {

    const [selected, setSelected] = useState<{ city1: number[]; city2: number[] }>({
        city1: [],
        city2: [],
    });

    const handleSelect = (city: "city1" | "city2", index: number) => {
        setSelected((prev) => {
            const currentSelection = prev[city];

            if (currentSelection.includes(index)) {
                return {...prev, [city]: currentSelection.filter((i) => i !== index)};
            }

            if (currentSelection.length < 2) {
                return {...prev, [city]: [...currentSelection, index]};
            }

            return prev;
        });
    };

    const activities = {
        city1: [
            {
                title: "Visiter le château royal de Wawel (Cracovie)",
                description: "Plongez dans l’histoire des rois de Pologne dans ce magnifique château perché sur une colline.",
            },
            {
                title: "Explorer le quartier juif de Kazimierz (Cracovie)",
                description: "Un quartier vibrant, entre histoire, street art et bars branchés.",
            },
            {
                title: "Découvrir la mine de sel de Wieliczka",
                description: "Un site souterrain fascinant classé à l’UNESCO avec des sculptures et des chapelles taillées dans le sel.",
            },
        ],
        city2: [
            {
                title: "Admirer la vieille ville de Varsovie",
                description: "Rebâtie après la guerre, elle offre un mélange unique d’histoire et de modernité.",
            },
            {
                title: "Se promener dans le parc Lazienki",
                description: "Un havre de paix en plein cœur de Varsovie, idéal pour une balade bucolique.",
            },
            {
                title: "Visiter le musée de l'Insurrection de Varsovie",
                description: "Un hommage aux résistants polonais avec une immersion poignante dans l’histoire.",
            },
        ],
    };


    return (

        <div className="container-activity-layout" style={{margin: "40px 0", display: "flex", gap: "60px", alignItems: "center", justifyContent: "center"}}>

            <div>
                <h3 style={{margin: "10px 0 30px"}}>[city 1]</h3>
                <div className="activity-layout">
                    {activities.city1.map((activity, index) => (
                        <div
                            key={index}
                            className={`activity-item ${selected.city1.includes(index) ? "selected" : ""}`}
                            onClick={() => handleSelect("city1", index)}
                        >
                            <h4>{activity.title}</h4>
                            <p>{activity.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="line-activity-layout"></div>

            <div>
                <h3 style={{margin: "10px 0 30px"}}>[city 2]</h3>
                <div className="activity-layout">
                    {activities.city2.map((activity, index) => (
                        <div
                            key={index}
                            className={`activity-item ${selected.city2.includes(index) ? "selected" : ""}`}
                            onClick={() => handleSelect("city2", index)}
                        >
                            <h4>{activity.title}</h4>
                            <p>{activity.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>


    );
};

export default ActivitySelecting;


{/*
<div>
                        <h4>Visiter le château royal de Wawel (Cracovie)</h4>
                        <p>Plongez dans l’histoire des rois de Pologne dans ce magnifique château perché sur une
                            colline.</p>
                    </div>
                    <div>
                        <h4>Explorer le quartier juif de Kazimierz (Cracovie)</h4>
                        <p>Un quartier vibrant, entre histoire, street art et bars branchés.</p>
                    </div>
                    <div>
                        <h4>Visiter le château royal de Wawel (Cracovie)</h4>
                        <p>Plongez dans l’histoire des rois de Pologne dans ce magnifique château perché sur une
                            colline.</p>
                    </div>
*/}



{/*
<div>
                        <h4>Visiter le château royal de Wawel (Cracovie)</h4>
                        <p>Plongez dans l’histoire des rois de Pologne dans ce magnifique château perché sur une
                            colline.</p>
                    </div>
                    <div>
                        <h4>Explorer le quartier juif de Kazimierz (Cracovie)</h4>
                        <p>Un quartier vibrant, entre histoire, street art et bars branchés.</p>
                    </div>
                    <div>
                        <h4>Visiter le château royal de Wawel (Cracovie)</h4>
                        <p>Plongez dans l’histoire des rois de Pologne dans ce magnifique château perché sur une
                            colline.</p>
                    </div>
*/}