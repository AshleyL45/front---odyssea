import {FC, JSX} from 'react';
import styles from "../../styles/RegisterPage.module.css"
import {useNavigate} from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";
import image from "../../images/damien-chaudet-SjCHKiGVWH4-unsplash.jpg";
import Pages from "../../components/layout/Pages"

const RegisterPage: ({}: {}) => JSX.Element = ({}) => {
    const navigate = useNavigate();

    return (
        <>
            <Pages title="Register - Odyssea">
            </Pages>
            <div className={styles.registerPage}>
                <RegisterForm/>
            </div>
        </>
    );
};

export default RegisterPage;
