import React, {useEffect, useState} from 'react';
import HomeImages from "../../components/homePage/HomeImages";
import TripItemHome from "../../components/ReusableComponents/TripItemHome";
import TripItemHomeReverse from "../../components/ReusableComponents/TripItemHomeReverse";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import TripIncludesIcons from "../../components/homePage/TripIncludesIcons";
import Footer from "../../components/ReusableComponents/Footer";
import {Link} from "react-router-dom";
import Navbar from "../../components/navbars/Navbar";
import BlogItemBlog from "../../components/ReusableComponents/BlogItemBlog";
import {imageData} from "../../assets/image";
import HomeCarousel from "../../components/homePage/HomeCarousel";
import Pages from "../../components/layout/Pages";


interface Itinerary {
    id: number;
    name: string;
    description: string;
}


const data = [
    {
        imageUrl:
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
        title: 'Romantic Escape to Paradise',
        description:
            'Celebrate your love with a dreamy honeymoon in the world\'s most romantic destinations.',
    },
    {
        imageUrl:
            'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop',
        title: 'Rejuvenation Escape',
        description:
            'Reconnect with yourself on this 12-day wellness retreat.',
    },
    {
        imageUrl:
            'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop',
        title: 'Luxury Business Expedition',
        description:
            'Combine work and pleasure on this 12-day luxury business trip.',
    },
];


const getHeaderImage = (tripId: number) => {
    const imageSet = imageData.find((data) => data.id === tripId);
    return imageSet ? imageSet.images.header : ''
};

const HomePage: React.FC = () => {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/itineraries');
                const data: Itinerary[] = await response.json();
                setItineraries(data.slice(0, 3));
            } catch (error) {
                console.error('Erreur lors de la récupération des itineraries :', error);
            }
        };

        fetchItineraries();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth <= 768);
        };
        // On initialise
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Pages title="Home - Odyssea">
            </Pages>

            {isMobileOrTablet ? (
                <HomeCarousel images={data}/>
            ) : (
                <HomeImages images={data}/>
            )}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    background: 'transparent',
                    zIndex: 1000,
                }}
            >
                <Navbar/>
            </div>


            <section className="home-itineraries">
                <h1 style={{textAlign: 'center', fontSize: '3rem', marginTop: '5rem'}}>
                    Discover the world
                </h1>
                {itineraries.length >= 3 ? (
                    <>
                        <TripItemHome
                            id={itineraries[0].id}
                            name={itineraries[0].name}
                            description={itineraries[0].description}
                            headerImage1={getHeaderImage(itineraries[0].id)[0]}
                            headerImage2={getHeaderImage(itineraries[0].id)[1]}
                        />
                        <TripItemHomeReverse
                            id={itineraries[1].id}
                            name={itineraries[1].name}
                            description={itineraries[1].description}
                            headerImage1={getHeaderImage(itineraries[1].id)[0]}
                            headerImage2={getHeaderImage(itineraries[1].id)[1]}
                        />
                        <TripItemHome
                            id={itineraries[2].id}
                            name={itineraries[2].name}
                            description={itineraries[2].description}
                            headerImage1={getHeaderImage(itineraries[2].id)[0]}
                            headerImage2={getHeaderImage(itineraries[2].id)[1]}
                        />
                    </>
                ) : (
                    <p>Loading itineraries...</p>
                )}
            </section>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    marginTop: '-8rem',
                }}
            >
                <Link to={`/trips`}>
                    <CustomButton
                        style={{
                            color: 'white',
                            padding: '10px',
                            fontSize: '1rem',
                            marginBottom: '6rem',
                        }}
                    >
                        Discover all our trips
                    </CustomButton>
                </Link>
                <TripIncludesIcons/>
            </div>

            <BlogItemBlog
                title="A unique itinerary designed just for you."
                paragraph="Because every traveler is unique, we create tailor-made itineraries to suit your desires, your dreams and your pace."
                linkUrl="/trips"
                linkText="Personalize my trip"
            />

            <Footer/>
        </>
    );
};

export default HomePage;
