import {FC, useState} from 'react';

const SideBoard: FC = () => {
    const [activeLink, setActiveLink] = useState<string>('Vue d\'ensemble');

    const handleClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="side-board-container">
            <div>
                <div className="user-name">
                    <h1>Liliana Ashley Chrifi</h1>
                </div>
                <div className="side-board-menu">
                    <nav>
                        <div>
                            <ul>
                                <li onClick={() => handleClick('Vue d\'ensemble')}>
                                    {activeLink === 'Vue d\'ensemble' && <span className="active"></span>}
                                    <a href="#">Vue d'ensemble</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li onClick={() => handleClick('Réservation')}>
                                    {activeLink === 'Réservation' && <span className="active"></span>}
                                    <a href="#">Réservation</a>
                                </li>
                                <li onClick={() => handleClick('Historique de voyage')}>
                                    {activeLink === 'Historique de voyage' && <span className="active"></span>}
                                    <a href="#">Historique de voyage</a>
                                </li>
                                <li onClick={() => handleClick('Ma sélection')}>
                                    {activeLink === 'Ma sélection' && <span className="active"></span>}
                                    <a href="#">Ma sélection</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li onClick={() => handleClick('Informations personnelles')}>
                                    {activeLink === 'Informations personnelles' && <span className="active"></span>}
                                    <a href="#">Informations personnelles</a>
                                </li>
                                <li onClick={() => handleClick('Paramètres')}>
                                    {activeLink === 'Paramètres' && <span className="active"></span>}
                                    <a href="#">Paramètres</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            <div style={{paddingLeft: "30px"}}>
                <a href="#">Aide</a>
            </div>
        </div>
    );
};

export default SideBoard;
