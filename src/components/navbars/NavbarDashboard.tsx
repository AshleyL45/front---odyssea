import logo from "../../assets/logo/logo_name.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router-dom";


const NavbarDashboard = ({}) => {
    const navigate = useNavigate();


    return (
        <>

            <nav className="navbar-dashboard">

                <div>
                    <p onClick={() => navigate("/")} className="return-button" style={{display: "flex", alignItems: "center", textDecoration: "underline", cursor: "pointer"}}>
                        <ArrowBackIosNewIcon sx={{fontSize: "12px"}}/>
                        back to website
                    </p>
                </div>

                <a href="/"><img className="logo" src={logo} alt="Odyssea logo"/></a>

            </nav>


        </>
    );
};

export default NavbarDashboard;
