import {FC, useEffect, useState} from 'react';
import "../../App.css";
import {PersTripData} from "../../@types/PersonalizeTrip";

type DurationSelectingProps = {
    durations: PersTripData[];
    onSelectDuration: (days: number) => void;
    selectedDuration: number | null;
}

const DurationSelecting: FC<DurationSelectingProps> = ({durations, onSelectDuration, selectedDuration}) => {
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        setSelected(selectedDuration);
    }, [selectedDuration]);

    return (
        <div className="container-duration-select">
            {durations.map((duration) => (
                <div
                    key={duration.numberOfDays}
                    className={`duration-select ${selected === duration.numberOfDays ? 'active' : ''}`}
                    onClick={() => {
                        setSelected(duration.numberOfDays);
                        onSelectDuration(duration.numberOfDays);
                    }}
                >
                    {duration.daysDisplay}
                </div>
            ))}
        </div>
    );
};

export default DurationSelecting;