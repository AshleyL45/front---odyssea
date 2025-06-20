import styles from "../../styles/LoginForm.module.css"
import CustomButton from "../ReusableComponents/CustomButton";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MessageBox from "./MessageBox";
import {useLogin} from "../../hooks/UseLogin";

interface LoginFormInput {
    email: string
    password: string
}

const LoginForm = ({}) => {

    const {logUser, error} = useLogin()
    const [searchParams] = useSearchParams();
    const expired = searchParams.get("expired") === "true";
    const location = useLocation();
    const from = location.state?.from || "/";


    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<LoginFormInput> = async (data: LoginFormInput) => {
        await logUser(data.email, data.password);
    }

    return (
        <main>
            <Link to="/" className={styles["return-button"]}>
                <ArrowBackIosNewIcon sx={{fontSize: "12px"}}/>
                return to website
            </Link>

            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <p>Don't have an account yet? <Link to="/register" style={{textDecoration: "underline", color: "white"}}>Register</Link></p>
                {
                    expired && <MessageBox type="error" text={"Your session has expired. Please login again."}/>
                }

                <div className={styles.fieldsLogin}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                                    message: "Invalid email format. Example: user@example.com"
                                }
                            })}
                        />
                    </div>
                    {errors.email && <MessageBox type="error" text={errors.email.message as string}/>}

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", {required: "Please insert a valid password"})}
                               id="password"/>
                    </div>
                </div>

                {errors.password && <MessageBox type="error" text={errors?.password.message as string}/>}


                {error && <MessageBox type="error" text={error}/>}

                <div style={{display: "flex", justifyContent: "center"}}>
                    <CustomButton type="submit" variant="contained"
                                  className={styles.submitButtonLogin}>Login</CustomButton>
                </div>

            </form>

        </main>
    );
};

export default LoginForm;