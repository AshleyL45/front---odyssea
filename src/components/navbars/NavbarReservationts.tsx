import {FC} from 'react';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../../images/logo_name.png";
import "../../App.css"

const NavbarReservation: FC<{}> = ({}) => {
    return (
        <>

            <nav className="navbar-reservation">

            <div>
                    <a href="/" className="return-button" style={{display: "flex", alignItems: "center", textDecoration: "underline"}}>
                        <ArrowBackIosNewIcon sx={{fontSize: "12px"}}/>
                        return to website
                    </a>
                </div>

                <a href="#"><img className="logo" src={logo} alt="Odyssea logo"/></a>

                <div className="help-button" style={{border: "solid 2px black", borderRadius: 7}}>
                    <a href="#">
                        <p>Need help ?</p>
                    </a>
                </div>

            </nav>

        </>
    );
};

export default NavbarReservation;
