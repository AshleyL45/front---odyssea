import {FC, useEffect, useState} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import '../../App.css';

type Props = {
    onClick: () => void ;
}

const MyComponent: FC<Props> = ({onClick}) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 2700);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return isVisible ? (
        <div className="book-sticky-bar">
            <CustomButton sx={{color: "white"}} onClick={onClick}>Book your itinerary</CustomButton>
        </div>
    ) : null;
};

export default MyComponent;
