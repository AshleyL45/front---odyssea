import {FC} from 'react';
import logo from "../../images/logo_name.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router-dom";

const NavbarDashboard: FC<{}> = ({}) => {
    const navigate = useNavigate();


    return (
        <>

            <nav className="navbar-dashboard">

                <div>
                    <p style={{display: "flex", alignItems: "center", textDecoration: "underline", cursor: "pointer"}}>
                        <ArrowBackIosNewIcon sx={{fontSize: "12px"}} onClick={() => navigate("/")}/>
                        back to website
                    </p>
                </div>

                <a href="#"><img className="logo" src={logo} alt="Odyssea logo"/></a>

                <div style={{border: "solid 2px black", borderRadius:7, padding:"7px 10px"}}>
                    <a href="#">
                        <p>Need help ?</p>
                    </a>
                </div>

            </nav>


        </>
    );
};

export default NavbarDashboard;
