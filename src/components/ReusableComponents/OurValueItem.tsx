import {FC} from 'react';
import style from "../../styles/AboutUs.module.css";

interface Props {
    image: string;
    number: number;
    title: string;
    description: string;
}

const OurValueItem: FC<Props> = ({ image, number, title, description }) => {
    return (
        <div className={style.containerOurValueItem}>
            <div className={style.ourValueImage} style={{backgroundImage: `url(${image})`}}></div>
            <div className={style.ourValueContent}>
                <h2>{number}</h2>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default OurValueItem;
