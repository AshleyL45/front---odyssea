import {FC} from 'react';
import logo from "../../images/logo_name.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const NavbarDashboard: FC<{}> = ({}) => {
    return (
        <>

            <nav className="navbar-dashboard">

                <div>
                    <a href="#" style={{display: "flex", alignItems: "center", textDecoration: "underline"}}>
                        <ArrowBackIosNewIcon sx={{fontSize: "12px"}}/>
                        retour au site
                    </a>
                </div>

                <a href="#"><img className="logo" src={logo} alt="Odyssea logo"/></a>

                <div style={{border: "solid 2px black", borderRadius:7, padding:"7px 10px"}}>
                    <a href="#">
                        <p>Besoin d'aide ?</p>
                    </a>
                </div>

            </nav>


        </>
    );
};

export default NavbarDashboard;
