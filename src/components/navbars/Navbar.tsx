import {FC, JSX, useEffect, useState} from 'react';
import logo from "../../images/logo_symbol.png";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
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
            <style>{`
              .navbar-links ul li a {
                position: relative;
                text-decoration: none;
                color: inherit;
              }
              
              .navbar-links ul li a::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                background-color: #2C3E50;
                bottom: -4px;
                left: 0;
                transition: width 0.3s ease-in-out;
              }

              .navbar-links ul li a:hover::after {
                width: 100%;
              }

              .dashboard-icon {
                cursor: pointer;
                transition: color 0.3s ease-in-out;
                color: #2C3E50;
              }

              .dashboard-icon:hover {
                color: #1ABC9C;
              }
            `}</style>

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
                                <li><a href="#">About Odyssea</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li>
                                    <PermIdentityIcon
                                        className="login-logo" sx={{fontSize: "40px"}}
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
