import {FC} from 'react';

interface Props {
    image: string;
    number: number;
    title: string;
    description: string;
}

const OurValueItem: FC<Props> = ({ image, number, title, description }) => {
    return (
        <div className="container-our-value-item">
            <div className="our-value-image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="our-value-content">
                <h2>{number}</h2>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default OurValueItem;
