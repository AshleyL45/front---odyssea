import {FC, JSX, useEffect, useState} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import {patch} from "../../API/api";
import {deleteFromDB} from "../../API/api";
import {useNavigate} from "react-router-dom";
import MessageBox from "../auth/MessageBox";

const Settings: ({}: {}) => JSX.Element = ({}) => {
    const {logout} = useAuth();
    const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>("");


    const handleUpdatePassword = async () => {
        if (inputValue.trim() === "") {
            setMessage({type: "error", text: "Password cannot be empty."});
            return;
        }

        if (inputValue.length < 14) {
            setMessage({type: "error", text: "Password must be at least 14 characters."});
            return;
        }

        try {
            const res = await patch(`/auth/password`, {password: inputValue});
            if (res.success === true) {
                setMessage({type: "success", text: "Password successfully updated."});
            }
        } catch (e) {
            console.error("Cannot change password : ", e);
            setMessage({type: "error", text: "An error occurred while updating your password."});
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const res = await deleteFromDB(`/auth/`);
            if (res.success === true) {
                logout();
                navigate("/");
            }
        } catch (e) {
            console.error("Cannot delete account : ", e);
            setMessage({type: "error", text: "Account deletion failed. Please try again."});
        }
    };


    const handleLogout = () => {
        navigate("/");
        logout();
    }


    return (
        <div style={{position: "relative"}}>

            <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column", minHeight: "80vh"}}>
                <div>
                    <h1 style={{
                        marginLeft: "8rem",
                        marginTop: "1.8rem",
                        marginBottom: "2rem",
                        fontSize: "1.8rem"
                    }}>Settings</h1>

                    <div style={{
                        marginLeft: "8rem",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%",
                        alignItems: "center"
                    }}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label htmlFor={"updatePassword"}>Change my password</label>
                            <input type={"password"} style={{padding: "0.5rem 1rem"}} id={"updatePassword"}
                                   placeholder={"Insert your new password."}
                                   value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        </div>
                        <CustomButton sx={{color: "white", marginBottom: 0}}
                                      onClick={handleUpdatePassword}>Save</CustomButton>
                    </div>
                    {message && <MessageBox type={message.type} text={message.text}/>}


                    <CustomButton
                        sx={{
                            backgroundColor: "white",
                            color: "#2C3E50",
                            border: "1px solid #2C3E50",
                            display: "block",
                            marginLeft: "8rem",
                            marginTop: "3rem"
                        }} onClick={handleLogout}>Log out</CustomButton>
                </div>

                <CustomButton sx={{color: "red", width: "180px", alignSelf: "end"}} onClick={handleDeleteAccount}>Delete
                    account</CustomButton>
            </div>
        </div>

    );
};

export default Settings;
