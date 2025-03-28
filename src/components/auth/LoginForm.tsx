import {FC, JSX, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from "../../styles/LoginForm.module.css"
import CustomButton from "../ReusableComponents/CustomButton";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../../API/api";
import {Card} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface LoginFormInput {
    email: string
    password: string
}

const LoginForm: ({}: {}) => JSX.Element = ({}) => {

    const navigate = useNavigate()
    const {login} = useAuth();
    const [error, setError] = useState("");
    const location = useLocation();


    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const postUser = async (data: LoginFormInput) => {
        try {
            const response = await post("/auth/login", {
                email: data.email,
                password: data.password
            })

            if (response.token) {
                login(response.token);
                const from = location.state?.from || '/';
                navigate(from, {replace: true});
                //console.log("response : " + response.token)
            }

        } catch (e) {
            console.warn("Error logging in : ", e);
            setError("Invalid password or username. Please try again.");
        }

    }

    const onSubmit: SubmitHandler<LoginFormInput> = async (data: LoginFormInput) => {
        await postUser(data);
    }

    return (
        <>
            <a href="/" className="return-button"
               style={{display: "flex", alignItems: "center", textDecoration: "underline", color: "white"}}>
                <ArrowBackIosNewIcon sx={{fontSize: "12px"}}/>
                return to website
            </a>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <p>Don't have an account yet? <span style={{textDecoration: "underline", cursor: "pointer"}}
                                                    onClick={() => navigate("/register")}>Register</span></p>

                <div className={styles.fieldsLogin}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" {...register("email", {required: "Please insert a valid email"})}
                               id="email"/>
                    </div>
                    {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", {required: "Please insert a valid password"})}
                               id="password"/>
                    </div>
                </div>

                {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}


                {error && (<p style={{color: "red"}}>{error}</p>)}

                <div style={{display: "flex", justifyContent: "center"}}>
                    <CustomButton type="submit" variant="contained"
                                  className={styles.submitButtonLogin}>Login</CustomButton>
                </div>

            </form>

        </>
    );
};

export default LoginForm;
