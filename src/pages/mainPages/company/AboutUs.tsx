import {JSX} from 'react';
import {useNavigate} from "react-router-dom";
import Pages from "../../../components/layout/Pages"
import "../../../App.css";
import InfosDisplayer from "../../../components/ReusableComponents/InfosDisplayer";
import InfosDisplayerReverse from "../../../components/ReusableComponents/InfosDisplayerReverse";
import CustomButton from "../../../components/ReusableComponents/CustomButton";
import OurValueItem from "../../../components/ReusableComponents/OurValueItem";
import aboutUs from "../../../assets/aboutUs/aboutUs.png";
import comment from "../../../assets/aboutUs/comments-image.png";
import valueOne from "../../../assets/aboutUs/valueOne.png";
import valueTwo from "../../../assets/aboutUs/valueTwo.png";
import valueThree from "../../../assets/aboutUs/valueThree.png";
import valueFour from "../../../assets/aboutUs/valueFour.png";

const values = [
    {
        image: valueOne,
        number: 1,
        title: "Limitless Exploration",
        description: "Every journey is a chance to discover new horizons. We take you places you might not have thought of going."
    },
    {
        image: valueTwo,
        number: 2,
        title: "Mastered Simplicity",
        description: "Traveling should be a pleasure. We take care of everything so you can fully enjoy your stay."
    },
    {
        image: valueThree,
        number: 3,
        title: "The Art of Surprise",
        description: "The well-thought-out unexpected: a mystery trip or a unique itinerary that transforms every moment into an adventure."
    },
    {
        image: valueFour,
        number: 4,
        title: "Responsible Excellence",
        description: "Authentic and environmentally friendly experiences, for a trip that makes sense."
    }
]

const AboutUs: ({}: {}) => JSX.Element = ({}) => {
    const navigate = useNavigate();

    return (
        <div className="container-about-page">
            <Pages title="About Us - Odyssea">
            </Pages>

            <InfosDisplayer image={aboutUs} >
                <h3 style={{textAlign: "center", fontSize: '2.5rem', marginBottom: '1.1rem'}}>About Us</h3>
                <p style={{textAlign: "center"}}>Odyssea was born from a simple idea: bringing back the joy of traveling without the hassle of
                    planning. A group of travel-loving friends once came together and realized that the best memories
                    often come from the unexpected. So why not give everyone the chance to travel without planning,
                    while still ensuring a unique experience? <br/>
                    That’s how Odyssea came to life — a platform that lets you create tailor-made trips or be surprised
                    by a mystery itinerary. Our mission? To offer unforgettable, simple, and spontaneous experiences for
                    travelers seeking adventure.
                </p>
            </InfosDisplayer>

            <h2 style={{fontSize: '2.7rem', textAlign: 'center', margin: '8rem auto 5rem'}}>Our Values</h2>

            <section className="container-values">
                {values.map((value) => (
                    <OurValueItem
                        image={value.image}
                        number={value.number}
                        title={value.title}
                        description={value.description}
                    />
                ))}
            </section>

            <h2 style={{fontSize: '2.7rem', textAlign: 'center', margin: '2.5rem auto 8rem', padding: '0.6rem'}}>What our customers say ...</h2>

            <InfosDisplayerReverse image={comment}>
                <h3 style={{fontSize: '1.5rem', margin: "0 0 10px"}}>An Unforgettable Experience !</h3>
                <p>
                    <i>
                        "I tried the mystery trip and it was incredible! Everything was perfectly organized, and the
                        destination was a real surprise. A perfect mix of adventure and comfort. I would do it again
                        without
                        hesitation!"
                    </i> -- Céline D.
                </p>
                <h2 style={{fontSize: '1.5rem', margin: '30px 0 10px'}}>No More Planning Stress</h2>
                <p>
                    <i>
                        "I love to travel, but I hate planning... Odyssea took care of everything for me! I just entered
                        my dates and received a ready-to-go trip. The result: a magical journey with zero hassle!"
                    </i> -- Jason A.
                </p>
            </InfosDisplayerReverse>

            <div className='contact-about-us'>
                <h2>Travel differently, in complete freedom with Odyssea</h2>
                <div>
                    <p>
                        Whether you choose a turnkey itinerary, create your own trip, or let yourself be surprised with
                        a mystery stay, one thing is certain: the adventure begins here.
                    </p>
                    <CustomButton style={{color: 'white', marginTop: '1.8rem'}} onClick={() => navigate('/contact')}>
                        CONTACT US
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
