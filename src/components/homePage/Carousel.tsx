import React, {useEffect, useRef} from 'react';
import {Box, IconButton} from "@mui/material";
import photo from "../../images/julia-worthington-qsZzCxorDF4-unsplash.jpg";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [photo, photo, photo]; // Liste des images

const Carousel = () => {
    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({left: carouselRef.current.clientWidth, behavior: "auto"});
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;

            if (direction === "right") {
                carouselRef.current.scrollBy({left: scrollAmount, behavior: "smooth"});

                setTimeout(() => {
                    if (carouselRef.current!.scrollLeft >= carouselRef.current!.scrollWidth - 2 * scrollAmount) {
                        carouselRef.current!.scrollTo({left: scrollAmount, behavior: "auto"});
                    }
                }, 500);
            } else {
                carouselRef.current.scrollBy({left: -scrollAmount, behavior: "smooth"});

                setTimeout(() => {
                    if (carouselRef.current!.scrollLeft <= 0) {
                        carouselRef.current!.scrollTo({
                            left: carouselRef.current!.scrollWidth - 2 * scrollAmount,
                            behavior: "auto"
                        });
                    }
                }, 500);
            }
        }
    };

    return (
        <Box sx={{position: "relative", display: "flex", alignItems: "center", overflow: "hidden"}}>
            <IconButton
                onClick={() => scroll("left")}
                sx={{position: "absolute", left: 0, zIndex: 10, color: "white"}}
            >
                <ArrowBackIosIcon/>
            </IconButton>

            <Box
                ref={carouselRef}
                sx={{
                    display: "flex",
                    overflowX: "hidden",
                    width: "95%",
                    margin: "100px auto",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    whiteSpace: "nowrap",
                }}
            >
                {/* Duplication pour effet infini */}
                {[...images, ...images, ...images].map((src, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={src}
                        alt={`Slide ${index + 1}`}
                        sx={{
                            flex: "0 0 100%",
                            scrollSnapAlign: "center",
                            objectFit: "cover",
                            width: "100%",
                        }}
                    />
                ))}
            </Box>

            <IconButton
                onClick={() => scroll("right")}
                sx={{position: "absolute", right: 0, zIndex: 10, color: "white"}}
            >
                <ArrowForwardIosIcon/>
            </IconButton>
        </Box>
    );
};

export default Carousel;