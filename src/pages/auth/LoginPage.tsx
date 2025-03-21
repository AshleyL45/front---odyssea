import Navbar from "../../components/navbars/Navbar";
import LoginForm from "../../components/auth/LoginForm";
import styles from "../../styles/LoginPage.module.css"
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.loginPage}>
                <LoginForm/>
            </div>

        </>
    );
}

export default LoginPage;
