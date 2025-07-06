import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "../../styles/RegisterForm.module.css"
import CustomButton from "../ReusableComponents/CustomButton";
import MessageBox from "./MessageBox";
import {useRegister} from "../../hooks/UseRegister";

interface SubscribeFormInput {
    email: string
    password: string
    password_confirmation: string
    role: string,
    firstName: string,
    lastName: string
}

const RegisterForm = ({}) => {
    const {register: registerUser, error} = useRegister();


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

    const onSubmit: SubmitHandler<SubscribeFormInput> = async (data: SubscribeFormInput) => {
        await registerUser(data);
    }


    const password = watch("password");


    return (
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <p>Already registered? <Link to={"/login"} className={styles.loginButton}>Login</Link></p>

            <div className={styles.names}>
                <div className={styles.namesBlocks}>
                    <label htmlFor="first-name">First name*</label>
                    <input
                        id="first-name"
                        type="text"
                        {...register("firstName", {required: "First name is required"})}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "first-name-error" : undefined}
                        className={styles.inputValidation}
                    />
                    {errors.firstName && (
                        <MessageBox type="error" text={errors.firstName.message!}/>
                    )}
                </div>

                <div className={styles.namesBlocks}>
                    <label htmlFor="last-name">Last name*</label>
                    <input
                        id="last-name"
                        type="text"
                        {...register("lastName", {required: "Last name is required"})}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "last-name-error" : undefined}
                        className={styles.inputValidation}
                    />
                    {errors.lastName && (
                        <MessageBox type="error" text={errors.lastName.message!}/>
                    )}
                </div>
            </div>


            <label htmlFor="email">Email*</label>
            <input
                id="email"
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email format"
                    }
                })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={styles.inputValidation}
            />
            {errors.email && (
                <MessageBox type="error" text={errors.email.message!}/>
            )}


            <label htmlFor="password">Password*</label>
            <input
                id="password"
                type="password"
                {...register("password", {required: "Password is required"})}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={styles.inputValidation}
            />
            {errors.password && <MessageBox type="error" text={errors.password.message!}/>}

            <label htmlFor="password_confirmation">Confirm password*</label>
            <input
                id="password_confirmation"
                type="password"
                {...register("password_confirmation", {
                    required: "Please confirm your password",
                    validate: (value) =>
                        value === password || "Passwords do not match",
                })}
                aria-invalid={!!errors.password_confirmation}
                aria-describedby={errors.password_confirmation ? "password-confirmation-error" : undefined}
                className={styles.inputValidation}
            />
            {errors.password_confirmation && (
                <MessageBox type="error" text={errors.password_confirmation.message!}/>
            )}

            {error && <MessageBox type="error" text={error}/>}

            <div style={{display: "flex", justifyContent: "center"}}>
                <CustomButton type="submit" variant="contained" className={styles.submitButton}>Register</CustomButton>
            </div>

        </form>
    );
};

export default RegisterForm;
