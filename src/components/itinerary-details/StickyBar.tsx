import React, {FC, JSX} from 'react';
import "../../App.css"


const StickyBar: ({}: {}) => JSX.Element = ({}) => {
    const handleClick = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({behavior: 'smooth'});

        }
    };

    return (
        <div className="progress-sticky-bar">
            <ul>
                <li onClick={() => handleClick("1")}>Day 1</li>
                <li onClick={() => handleClick("2")}>Day 2</li>
                <li onClick={() => handleClick("3")}>Day 3</li>
                <li onClick={() => handleClick("4")}>Day 4</li>
                <li onClick={() => handleClick("5")}>Day 5</li>
                <li onClick={() => handleClick("6")}>Day 6</li>
                <li onClick={() => handleClick("7")}>Day 7</li>
                <li onClick={() => handleClick("8")}>Day 8</li>
                <li onClick={() => handleClick("9")}>Day 9</li>
                <li onClick={() => handleClick("10")}>Day 10</li>
                <li onClick={() => handleClick("11")}>Day 11</li>
                <li onClick={() => handleClick("12")}>Day 12</li>
            </ul>
        </div>
    );
};

export default StickyBar;
