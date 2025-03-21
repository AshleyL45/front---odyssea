import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import OptionsSelecting from "../../components/OptionsSelecting";
import {Option} from "../../@types/Option";


/*const options = {
    typeOption1: [
        {
            title: "Services d’Exception & Confort",
            option1: "Assistant linguistique",
            option2: "Service médical VIP",
            option3: "Babysitter certifié(e) et multilingue",
        }
    ],
    typeOption2: [
        {
            title: "Luxe & Bien-être",
            option1: "Chef privé",
            option2: "Coach bien-être et fitness",
            option3: "Salle de cinéma privée",
        }
    ],
    typeOption3: [
        {
            title: "Transports & Expériences Exclusives",
            option1: "Hélicoptère privé",
            option2: "Location de yacht",
            option3: "Photographe professionnel",
        }
    ],
    typeOption4: [
        {
            title: "Shopping & Événements",
            option1: "Personal shopper",
            option2: "Organisateur d’événements"
        }
    ],
};*/

const options: Option[] = [
    {
        id: 1,
        name: "Gourmet Breakfast",
        price: 20.00,
        description: "Enjoy a luxurious breakfast with fresh pastries, fruits, and gourmet coffee.",
        category: "Luxury & Well-being"
    },
    {
        id: 2,
        name: "Spa Access",
        price: 50.00,
        description: "Full-day access to our exclusive spa, including sauna and massage therapy.",
        category: "Luxury & Well-being"
    },
    {
        id: 3,
        name: "Private Airport Shuttle",
        price: 75.00,
        description: "Travel in comfort with our private transfer service to and from the airport.",
        category: "Transport & Exclusive Experiences"
    },
    {
        id: 4,
        name: "VIP Lounge Access",
        price: 40.00,
        description: "Relax in our VIP lounge with complimentary drinks and snacks.",
        category: "Luxury & Well-being"
    },
    {
        id: 5,
        name: "Scenic Helicopter Tour",
        price: 300.00,
        description: "Experience breathtaking views with a private helicopter tour over the city.",
        category: "Transport & Exclusive Experiences"
    },
    {
        id: 6,
        name: "Premium Wi-Fi",
        price: 15.00,
        description: "High-speed internet access for streaming and business use.",
        category: "Exceptional Services & Comfort"
    },
    {
        id: 7,
        name: "Exclusive Shopping Tour",
        price: 100.00,
        description: "Guided shopping experience with access to designer boutiques and personal stylists.",
        category: "Shopping & Events"
    },
    {
        id: 8,
        name: "Romantic Dinner for Two",
        price: 120.00,
        description: "Enjoy an intimate candlelit dinner with a gourmet menu and fine wine.",
        category: "Luxury & Well-being"
    },
    {
        id: 9,
        name: "Private Yacht Rental",
        price: 500.00,
        description: "Sail the seas with a private yacht rental, including a professional crew.",
        category: "Transport & Exclusive Experiences"
    },
    {
        id: 10,
        name: "Concierge Service",
        price: 30.00,
        description: "24/7 access to a dedicated concierge for reservations and special requests.",
        category: "Exceptional Services & Comfort"
    }
];



const Trip7: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "70%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Would you like to add any options to your itinerary?</h1>

                {/*<OptionsSelecting options={options} />*/}

                <div style={{display: "block"}}>
                    <CustomButton style={{width: "130px"}} variant="contained">Next</CustomButton>
                </div>

            </div>

        </div>
    );
};

export default Trip7;
