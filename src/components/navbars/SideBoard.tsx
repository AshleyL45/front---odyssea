import {FC, JSX, useState} from 'react';
import {Link} from "react-router-dom";


interface SideBoardProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const SideBoard: FC<SideBoardProps> = ({activePage, setActivePage}) => {
    const [activeLink, setActiveLink] = useState<string>('Vue d\'ensemble');

    // TODO: Faire une requête pour avoir le prénom et le nom de l'utilisateur

    const handleClick = (page: string) => {
        setActiveLink(page);
        setActivePage(page)
    };

    return (
        <div className="side-board-container">
            <div>
                <div className="user-name">
                    <h1>Liliana Ashley Chrifi</h1> {/*TODO: Remplacer avec le prénom et nom de famille de l'utilisateur*/}
                </div>
                <div className="side-board-menu">
                    <nav>
                        <div>
                            <ul>
                                <li
                                    onClick={() => handleClick('Vue d\'ensemble')}>
                                    {activeLink === 'Vue d\'ensemble' && <span className="active"></span>}
                                    <a href="#">Vue d'ensemble</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li
                                    onClick={() => handleClick('Réservation')}>
                                    {activeLink === 'Réservation' && <span className="active"></span>}
                                    <a href="#">Réservation</a>
                                </li>
                                <li
                                    onClick={() => handleClick('Historique de voyage')}>
                                    {activeLink === 'Historique de voyage' && <span className="active"></span>}
                                    <a href="#">Historique de voyage</a>
                                </li>
                                <li
                                    onClick={() => handleClick('Ma sélection')}>
                                    {activeLink === 'Ma sélection' && <span className="active"></span>}
                                    <a href="#">Ma sélection</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li
                                    onClick={() => handleClick('Informations personnelles')}>
                                    {activeLink === 'Informations personnelles' && <span className="active"></span>}
                                    <a href="#">Informations personnelles</a>
                                </li>
                                <li
                                    onClick={() => handleClick('Paramètres')}>
                                    {activeLink === 'Paramètres' && <span className="active"></span>}
                                    <a href="#">Paramètres</a>
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
