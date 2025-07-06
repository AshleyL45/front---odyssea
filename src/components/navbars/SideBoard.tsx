import {FC, JSX, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "../../App.css"
import {useUserDashboard} from "../../contexts/DashboardContext";

interface SideBoardProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const SideBoard: FC<SideBoardProps> = ({activePage, setActivePage}) => {

    const [activeLink, setActiveLink] = useState<string>('Overview');
    const {firstName, lastName} = useUserDashboard();
    const [menuOpen, setMenuOpen] = useState(window.innerWidth > 1024);


    const handleClick = (page: string) => {
        setActiveLink(page);
        setActivePage(page);

        // Fermer la navbar si la largeur de l'écran est inférieure à 600px
        if (window.innerWidth <= 1024) {
            setMenuOpen(false);
        }
    };


    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setMenuOpen(window.innerWidth > 1024);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <aside>

            {window.innerWidth <= 1024 && (
                <div className="icon-side-bar" onClick={toggleMenu}>
                    <MenuOpenIcon
                        sx={{position: "absolute", top: "20px", left: "20px", fontSize: "32px", cursor: "pointer"}}
                    />
                </div>
            )}


            <div className={`side-board-container ${menuOpen && window.innerWidth <= 1024 ? "mobile-active" : ""}`}
                 style={{display: menuOpen ? "flex" : "none"}}>

                <div>
                    <div>
                        <h1 style={{fontFamily: "Literata, serif", fontWeight: 500, marginLeft: "2rem"}}>{firstName} {lastName}</h1>
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
                                    <li
                                        onClick={() => handleClick('My personalized trips')}>
                                        {activeLink === 'My personalized trips' && <span className="active"></span>}
                                        <a href="#">My personalized trips</a>
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
                    <Link to="/contact">Help</Link>
                </div>
            </div>

        </aside>
    );
};

export default SideBoard;
