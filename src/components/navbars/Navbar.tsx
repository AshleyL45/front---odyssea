import {JSX, useEffect, useState} from 'react';
import logo from "../../assets/logo/logo_symbol.png";
import userIcon from "../../assets/userIcontwo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import style from "../../styles/Navbar.module.css";

const Navbar: () => JSX.Element = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const {role} = useAuth();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const goToDashboard = () => {
        const destination = role?.toUpperCase() === "ADMIN" ? "/admin" : "/dashboard";
        navigate(destination);
    };


    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <header className={`${style.containerNavbar} ${menuOpen ? style.open : ''}`}>
            {!menuOpen && (
                <div className={style.navbarHeader}>
                    <div className={style.menuLogo} onClick={toggleMenu}>
                        <MenuIcon sx={{fontSize: "40px", color: "#2C3E50"}}/>
                    </div>
                    <a href="/" className={style.centerLogo}>
                        <img className={style.logoImage} src={logo} alt="Odyssea logo"/>
                    </a>
                </div>
            )}

            {menuOpen && (
                <div className={style.closeMenuIcon} onClick={toggleMenu}>
                    <CloseIcon sx={{fontSize: "48px", color: "#2C3E50"}}/>
                </div>
            )}

            <nav className={`${style.navbar} ${menuOpen ? style.open : ''}`}>
                <div className={style.navbarMenu}>
                    <div className={style.navbarLinks}>
                        <div className={style.navbarLeft}>
                            <ul>
                                <li><a href="/trips">Our itineraries</a></li>
                                <li><a href="/personalized-trip/summary">Personalized trip</a></li>
                                <li><a href="/mystery-trip">Mystery trip</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={style.navbarCenter}>
                        <a href="/" className={style.logo}>
                            <img className={style.logoImage} src={logo} alt="Odyssea logo"/>
                        </a>
                    </div>

                    <div className={style.navbarLinks}>
                        <div className={style.navbarRight}>
                            <ul>
                                <li><a href="/aboutUs">About Odyssea</a></li>
                                <li><a href="/contact">Contact us</a></li>
                                <li>
                                    <img
                                        src={userIcon}
                                        alt="user icon"
                                        className={style.loginLogo}
                                        style={{width: "25px"}}
                                        onClick={goToDashboard}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
