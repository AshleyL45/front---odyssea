import {FC, JSX, useEffect, useRef, useState} from 'react';
import styles from "../../styles/components/SearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';
import {debounceTime, filter, fromEvent, map, switchMap, tap} from "rxjs";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {List, ListItemButton, ListItemText} from "@mui/material";
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";

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
                console.log(value),
                get(`api/itineraries/search?query=${value}`) //TODO : A modifier avec le bon endpoint
                )
            )
        )

        const observer = {
            next: (value: any) => {
                console.log("Value" + JSON.stringify(value, null, 2))
                setItineraries(value);
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
        navigate(`/trip/${id}`);
    }

    return (
        <>
            <div className={styles.searchContainer}>
                <SearchIcon className={styles.searchIcon}/>
                <input type="search" className={styles.searchInput}
                       placeholder="Search for an experience…" ref={searchBarRef}>
                </input>
            </div>
            {
                (itineraries && itineraries.length > 0 && showList) &&
                (
                    <List sx={{
                        position: "absolute",
                        height: 250,
                        overflowY: "hidden",
                        backgroundColor: "white",
                        border: "1px solid white",
                        borderRadius: 4,
                        left: 200
                    }} className={styles.searchList}>
                        {
                            itineraries.map((itinerary) => {
                                return (
                                    <ListItemButton divider={true} sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }} onClick={() => handleCloseList(itinerary.id)}>
                                        <ListItemText key={itinerary.id} primary={itinerary.name}
                                                      sx={{color: "black"}}/>
                                    </ListItemButton>
                                )
                            })
                        }
                    </List>
                )
            }
        </>



    );
};

export default SearchBar;
