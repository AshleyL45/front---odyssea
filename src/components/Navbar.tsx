import {FC} from 'react';
import logo from "../images/logo_symbol.png";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Navbar: FC<{}> = ({}) => {

    return (
        <>

            <nav className="navbar">
                <div className="navbar-left">
                    <ul>
                        <li><a href="#">Nos voyages</a></li>
                        <li><a href="#">Voyage personnalisé</a></li>
                        <li><a href="#">Voyage surprise</a></li>
                    </ul>
                </div>

                <div className="navbar-center">
                    <a href="/" className="logo">
                        <img className="logo-image" src={logo} alt="Odyssea logo"/>
                    </a>
                </div>

                <div className="navbar-right">
                    <ul>
                        <li><a href="#">Articles de blog</a></li>
                        <li><a href="#">À Propos</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <PermIdentityIcon className="login-logo" sx={{fontSize: "2.2rem"}}/>
            </nav>


        </>
    );
};

export default Navbar;
