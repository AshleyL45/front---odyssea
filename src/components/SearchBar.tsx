import {FC, JSX, useEffect, useRef, useState} from 'react';
import styles from "../styles/components/SearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';
import {debounceTime, filter, fromEvent, map, switchMap, tap} from "rxjs";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {List, ListItemButton, ListItemText} from "@mui/material";
import {Trip} from "../@types/Trip";

const SearchBar: ({}: {}) => JSX.Element = ({}) => {

    const searchBarRef = useRef<any>(null);
    const [showList, setShowList] = useState<boolean>(true);
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState<Trip[]>([]);

    useEffect(() => {

        const typedLetter = fromEvent(searchBarRef.current, 'input');
        const typedLetterPipe = typedLetter.pipe(
            map((event: any) => event.target.value),
            tap((word: string) => {
                if (word === "") {
                    setShowList(false);
                }
            }),
            filter((letter: string) => letter.length > 2),
            debounceTime(300),
            switchMap((value: any) => (
                axios.get(`/itinerary?query=${value}`) //TODO : A modifier avec le bon endpoint
                )
            )
        )

        const observer = {
            next: (value: any) => {
                setItineraries(value.data.results);
                setShowList(true);
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log("Completé");
            }
        }

        const subscription = typedLetterPipe.subscribe(observer);
        return () => {
            subscription.unsubscribe()
        };

    }, [])

    function handleCloseList(id: number) {
        setShowList(false);
        navigate(`/tripdetails/${id}`);
    }

    return (
        <div className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon}/>
            <input type="search" className={styles.searchInput}
                   placeholder="Rechercher une destination ou une expérience…" ref={searchBarRef}>
            </input>

            {
                (itineraries && itineraries.length > 0 && showList) &&
                (
                    <List sx={{
                        position: "absolute",
                        height: 250,
                        overflowY: "scroll",
                        backgroundColor: "white",
                        border: "1px solid white"
                    }}>
                        {
                            itineraries.map((itinerary) => {
                                return (
                                    <ListItemButton divider={true} sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }} onClick={() => handleCloseList(itinerary.id)}>
                                        <ListItemText primary={itinerary.itineraryName}
                                                      sx={{color: "black"}}/>
                                    </ListItemButton>
                                )
                            })
                        }
                    </List>
                )

            }
        </div>

    );
};

export default SearchBar;
