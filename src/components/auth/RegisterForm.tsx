import {FC, JSX, useState} from 'react';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {post} from "../../API/api";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "../../styles/RegisterForm.module.css"
import CustomButton from "../ReusableComponents/CustomButton";

interface SubscribeFormInput {
    email: string
    password: string
    password_confirmation: string
    role: string,
    firstName: string,
    lastName: string
}

const RegisterForm: ({}: {}) => JSX.Element = ({}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
            role: "USER",
            firstName: "",
            lastName: ""
        },
    })

    // Envoyer les données vers la base de données
    const postUser = async (data: SubscribeFormInput) => {
        try {
            const response = await post("/auth/register", {
                email: data.email,
                password: data.password,
                role: "USER",
                firstName: data.firstName,
                lastName: data.lastName
            })


            if (response === "User registered successfully!") {
                navigate("/login");
            } else {
                setError(response);
            }

        } catch (e) {
            console.warn("Error logging in : ", e);
        }

    }

    const onSubmit: SubmitHandler<SubscribeFormInput> = async (data: SubscribeFormInput) => {
        await postUser(data);
    }


    const password = watch("password");


    return (
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <p>Already registered? <span style={{textDecoration: "underline", cursor: "pointer"}}
                                         onClick={() => navigate("/login")}>Login</span></p>

            <div className={styles.names}>
                <div className={styles.namesBlocks}>
                    <label htmlFor="first-name">First name*</label>
                    <input type="text" {...register("firstName")} required className={styles.inputValidation} id="first-name"/>
                </div>

                <div className={styles.namesBlocks}>
                    <label htmlFor="last-name">Last name*</label>
                    <input type="text" {...register("lastName")} required className={styles.inputValidation} id="last-name"/>
                </div>
            </div>


            <label htmlFor="email">Email*</label>
            <input type="email" {...register("email")} required className={styles.inputValidation} id="email"/>

            <label htmlFor="password">Password*</label>
            <input type="password" {...register("password", {required: "Password is required"})} className={styles.inputValidation} id="password"/>

            <label htmlFor="password_confirmation">Confirm password*</label>
            <input type="password" {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
            })} className={styles.inputValidation} id="password_confirmation"/>

            {errors.password_confirmation && <p style={{color: "red"}}>{errors.password_confirmation.message}</p>}

            {error && (<p style={{color: "red"}}>{error}</p>)}
            <CustomButton type="submit" variant="contained" className={styles.submitButton}>Register</CustomButton>
        </form>
    );
};

export default RegisterForm;
