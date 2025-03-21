import {FC, JSX, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";


interface SideBoardProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const SideBoard: FC<SideBoardProps> = ({activePage, setActivePage}) => {
    const [activeLink, setActiveLink] = useState<string>('Overview');
    const {firstName, lastName} = useAuth();

    // TODO: Faire une requête pour avoir le prénom et le nom de l'utilisateur

    const handleClick = (page: string) => {
        setActiveLink(page);
        setActivePage(page)
    };

    return (
        <div className="side-board-container">
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
    );
};

export default SideBoard;
