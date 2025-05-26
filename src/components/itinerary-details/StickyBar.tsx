import React, {useEffect, useState} from 'react';
import "../../App.css"


const StickyBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisivility = () => {
            setIsVisible(window.scrollY > 3400);
        };

        window.addEventListener('scroll', toggleVisivility);
        return () => window.removeEventListener('scroll', toggleVisivility);
    }, []);

    const handleClick = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const yOffset = -80;
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    return isVisible ? (
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
    ) : null;
};

export default StickyBar;
