import React, {useEffect, useState} from 'react';
import HomeImages from "../../components/homePage/HomeImages";
import TripItemHome from "../../components/ReusableComponents/TripItemHome";
import TripItemHomeReverse from "../../components/ReusableComponents/TripItemHomeReverse";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import TripIncludesIcons from "../../components/homePage/TripIncludesIcons";
import Footer from "../../components/ReusableComponents/Footer";
import {Link} from "react-router-dom";
import BlogItemBlog from "../../components/ReusableComponents/BlogItemBlog";
import HomeCarousel from "../../components/homePage/HomeCarousel";
import Pages from "../../components/layout/Pages";

interface Itinerary {
    id: number;
    name: string;
    description: string;
}

interface Slide {
    imageUrl: string;
    title: string;
    description: string;
}

type HeaderPair = {
    firstHeader?: string;
    secondHeader?: string;
};

const carouselData: Slide[] = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
        title: 'Romantic Escape to Paradise',
        description: 'Celebrate your love with a dreamy honeymoon in the world\'s most romantic destinations.',
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop',
        title: 'Rejuvenation Escape',
        description: 'Reconnect with yourself on this 12-day wellness retreat.',
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop',
        title: 'Luxury Business Expedition',
        description: 'Combine work and pleasure on this 12-day luxury business trip.',
    },
];

const HomePage: React.FC = () => {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [headerMap, setHeaderMap] = useState<Record<number, HeaderPair>>({});

    // detect mobile/tablet
    useEffect(() => {
        const onResize = () => setIsMobileOrTablet(window.innerWidth <= 768);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/itineraries');
                const all = await res.json();
                const slice3 = all.data.slice(0, 3);
                setItineraries(slice3);

                const map: Record<number, HeaderPair> = {};
                await Promise.all(slice3.map(async (trip: { id: number }) => {
                    const roles: string[] = await fetch(`/api/itinerary-images/${trip.id}`)
                        .then(r => r.ok ? r.json() : [])
                        .catch(() => []);
                    if (roles.includes('firstHeader')) {
                        const blob = await fetch(`/api/itinerary-images/${trip.id}/firstHeader`)
                            .then(r => r.ok ? r.blob() : null)
                            .catch(() => null);
                        if (blob) map[trip.id] = {...map[trip.id], firstHeader: URL.createObjectURL(blob)};
                    }
                    if (roles.includes('secondHeader')) {
                        const blob = await fetch(`/api/itinerary-images/${trip.id}/secondHeader`)
                            .then(r => r.ok ? r.blob() : null)
                            .catch(() => null);
                        if (blob) map[trip.id] = {...map[trip.id], secondHeader: URL.createObjectURL(blob)};
                    }
                }));
                setHeaderMap(map);
            } catch (e) {
                console.error("Erreur HomePage:", e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        return () => {
            Object.values(headerMap).forEach(pair => {
                pair.firstHeader && URL.revokeObjectURL(pair.firstHeader);
                pair.secondHeader && URL.revokeObjectURL(pair.secondHeader);
            });
        };
    }, [headerMap]);

    return (
        <>
            <Pages title="Home - Odyssea">
                {}
            </Pages>

            {isMobileOrTablet
                ? <HomeCarousel images={carouselData}/>
                : <HomeImages images={carouselData}/>
            }


            <section className="home-itineraries">
                <h1 style={{textAlign: 'center', fontSize: '3rem', marginTop: '5rem'}}>
                    Discover the world
                </h1>
                {itineraries.length === 3 ? (
                    <>
                        <TripItemHome
                            id={itineraries[0].id}
                            name={itineraries[0].name}
                            description={itineraries[0].description}
                            headerImage1={headerMap[itineraries[0].id]?.firstHeader || ''}
                            headerImage2={headerMap[itineraries[0].id]?.secondHeader || ''}
                        />
                        <TripItemHomeReverse
                            id={itineraries[1].id}
                            name={itineraries[1].name}
                            description={itineraries[1].description}
                            headerImage1={headerMap[itineraries[1].id]?.firstHeader || ''}
                            headerImage2={headerMap[itineraries[1].id]?.secondHeader || ''}
                        />
                        <TripItemHome
                            id={itineraries[2].id}
                            name={itineraries[2].name}
                            description={itineraries[2].description}
                            headerImage1={headerMap[itineraries[2].id]?.firstHeader || ''}
                            headerImage2={headerMap[itineraries[2].id]?.secondHeader || ''}
                        />
                    </>
                ) : (
                    <p>Loading itineraries...</p>
                )}
            </section>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                marginTop: '-8rem'
            }}>
                <Link to="/trips">
                    <CustomButton style={{
                        color: 'white', padding: '10px',
                        fontSize: '1rem', marginBottom: '6rem'
                    }}>
                        Discover all our trips
                    </CustomButton>
                </Link>
                <TripIncludesIcons/>
            </div>

            <BlogItemBlog
                title="A unique itinerary designed just for you."
                paragraph="Because every traveler is unique, we create tailor-made itineraries to suit your desires..."
                linkUrl="/personalized-trip/summary"
                linkText="Personalize my trip"
            />
        </>
    );
};

export default HomePage;
