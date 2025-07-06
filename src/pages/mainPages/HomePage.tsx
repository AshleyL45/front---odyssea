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
import {useHeaderImages} from "../../hooks/homePage/useHeaderImages";
import {triptychImages} from "../../components/homePage/TriptychImages";
import {useIsMobile} from "../../hooks/homePage/useIsMobile";

const HomePage: React.FC = () => {
    const {itineraries, headerMap} = useHeaderImages();
    const isMobileOrTablet = useIsMobile();

    return (
        <>
            <Pages title="Home - Odyssea">
                {}
            </Pages>

            {isMobileOrTablet
                ? <HomeCarousel images={triptychImages}/>
                : <HomeImages images={triptychImages}/>
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
