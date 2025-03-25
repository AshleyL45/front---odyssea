import {FC, JSX, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "../../App.css"

interface SideBoardProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const SideBoard: FC<SideBoardProps> = ({activePage, setActivePage}) => {

    const [activeLink, setActiveLink] = useState<string>('Overview');
    const {firstName, lastName} = useAuth();
    const [menuOpen, setMenuOpen] = useState(window.innerWidth > 600);

    // TODO: Faire une requête pour avoir le prénom et le nom de l'utilisateur

    const handleClick = (page: string) => {
        setActiveLink(page);
        setActivePage(page);

        // Fermer la navbar si la largeur de l'écran est inférieure à 600px
        if (window.innerWidth <= 600) {
            setMenuOpen(false);
        }
    };


    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setMenuOpen(window.innerWidth > 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <>

            {window.innerWidth <= 600 && (
                <div className="icon-side-bar" onClick={toggleMenu}>
                    <MenuOpenIcon
                        sx={{position: "absolute", top: "20px", left: "20px", fontSize: "32px", cursor: "pointer"}}
                    />
                </div>
            )}


            <div className={`side-board-container ${menuOpen && window.innerWidth <= 600 ? "mobile-active" : ""}`}
                 style={{display: menuOpen ? "flex" : "none"}}>

                <div>
                    <div className="user-name">
                        <h1>{firstName} {lastName}</h1> {/*TODO: Remplacer avec le prénom et nom de famille de l'utilisateur*/}
                    </div>
                    <div className="side-board-menu">
                        <nav>
                            <div>
                                <ul>
                                    <li
                                        onClick={() => handleClick('Overview')}>
                                        {activeLink === 'Overview' && <span className="active"></span>}
                                        <a href="#">Overview</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li
                                        onClick={() => handleClick('My bookings')}>
                                        {activeLink === 'My bookings' && <span className="active"></span>}
                                        <a href="#">My bookings</a>
                                    </li>
                                    <li
                                        onClick={() => handleClick('Travel History')}>
                                        {activeLink === 'Travel History' && <span className="active"></span>}
                                        <a href="#">Travel History</a>
                                    </li>
                                    <li
                                        onClick={() => handleClick('My selection')}>
                                        {activeLink === 'My selection' && <span className="active"></span>}
                                        <a href="#">My selection</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li
                                        onClick={() => handleClick('Personal information')}>
                                        {activeLink === 'Personal information' && <span className="active"></span>}
                                        <a href="#">Personal information</a>
                                    </li>
                                    <li
                                        onClick={() => handleClick('Settings')}>
                                        {activeLink === 'Settings' && <span className="active"></span>}
                                        <a href="#">Settings</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

                <div style={{paddingLeft: "30px"}}>
                    <Link to="/contact">Aide</Link>
                </div>
            </div>

        </>
    );
};

export default SideBoard;
