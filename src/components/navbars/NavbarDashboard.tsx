import {FC} from 'react';
import logo from "../../images/logo_name.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const NavbarDashboard: FC<{}> = ({}) => {
    const navigate = useNavigate();


    return (
        <>

            <MenuOpenIcon className="icon-side-bar" sx={{position: "absolute", top: "20px", left: "20px", fontSize: "30px"}}/>

            <nav className="navbar-dashboard">

                <div>
                    <p className="return-button" style={{display: "flex", alignItems: "center", textDecoration: "underline", cursor: "pointer"}}>
                        <ArrowBackIosNewIcon sx={{fontSize: "12px"}} onClick={() => navigate("/")}/>
                        back to website
                    </p>
                </div>

                <a href="#"><img className="logo" src={logo} alt="Odyssea logo"/></a>


            </nav>


        </>
    );
};

export default NavbarDashboard;
