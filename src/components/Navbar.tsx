import {FC, useEffect, useState} from 'react';
import logo from "../images/logo_symbol.png";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";

const Navbar: FC<{}> = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Clean-up pour remettre l'overflow normal lors du démontage ou changement d'état
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (

        <div className={`container-navbar ${menuOpen ? 'open' : ''}`} style={{position: "relative"}}>

            {/* Icône du menu burger */}
            {!menuOpen && (
                <div className="menu-logo" onClick={toggleMenu}>
                    <MenuIcon sx={{fontSize: "50px", color: "#2C3E50"}}/>
                </div>
            )}

            {/* Icône de fermeture */}
            {menuOpen && (
                <div className="close-menu-icon" onClick={toggleMenu}>
                    <CloseIcon sx={{fontSize: "52px", color: "#2C3E50"}}/>
                </div>
            )}

            {/* Navigation */}
            <nav className={`navbar ${menuOpen ? 'open' : ''}`}>

                <div className="navbar-menu">
                    <div className="navbar-links">
                        <div className="navbar-left">
                            <ul>
                                <li><a href="/trips">Nos voyages</a></li>
                                <li><a href="#">Voyage personnalisé</a></li>
                                <li><a href="#">Voyage surprise</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="navbar-center">
                        <a href="/" className="logo">
                            <img className="logo-image" src={logo} alt="Odyssea logo"/>
                        </a>
                    </div>

                    <div className="navbar-links">
                        <div className="navbar-right">
                            <ul>
                                <li><a href="#">Articles de blog</a></li>
                                <li><a href="#">À Propos</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="dashboard-icon">
                <PermIdentityIcon className="login-logo" sx={{fontSize: "50px"}} onClick={() => navigate('/login')} />
            </div>

        </div>
    );
};


export default Navbar;
