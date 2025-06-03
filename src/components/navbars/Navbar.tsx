import {FC, JSX, useEffect, useState} from 'react';
import logo from "../../assets/logo/logo_symbol.png";
import userIcon from "../../assets/userIcontwo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";

const Navbar: () => JSX.Element = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <div className={`container-navbar ${menuOpen ? 'open' : ''}`}>
            {!menuOpen && (
                <div className="menu-logo" onClick={toggleMenu}>
                    <MenuIcon sx={{fontSize: "50px", color: "#2C3E50"}}/>
                </div>
            )}

            {menuOpen && (
                <div className="close-menu-icon" onClick={toggleMenu}>
                    <CloseIcon sx={{fontSize: "48px", color: "#2C3E50"}}/>
                </div>
            )}

            <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
                <div className="navbar-menu" style={{fontSize: '18px'}}>
                    <div className="navbar-links">
                        <div className="navbar-left">
                            <ul>
                                <li><a href="/trips">Our itineraries </a></li>
                                <li><a href="/personalized-trip/summary">Personalized trip</a></li>
                                <li><a href="/mystery-trip">Mystery trip</a></li>
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
                                <li><a href="/aboutUs">About Odyssea</a></li>
                                <li><a href="/contact">Contact us</a></li>
                                <li>
                                    <img
                                        src={userIcon}
                                        alt='user icon'
                                        className="login-logo" style={{width: "25px"}}
                                        onClick={() => navigate('/dashboard')}
                                    />
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>


        </div>
    );
};

export default Navbar;
