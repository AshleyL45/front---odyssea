import {FC, JSX, useEffect, useState} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import {patch} from "../../API/api";
import {deleteFromDB} from "../../API/api";
import {useNavigate} from "react-router-dom";

const Settings: ({}: {}) => JSX.Element = ({}) => {
    const {userId, logout} = useAuth();
    const [confirmationMessage, setConfirmationMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>("");
    console.log(inputValue)


    const handleUpdatePassword = async () => {
        try {
            const changePassword = await patch(`/auth/${userId}/password`, {
                password: inputValue
            });
            if(changePassword === "Account successfully deleted."){
                setTimeout(() => setConfirmationMessage(true), 300);
                setMessage(`${changePassword}`)
            }
        } catch (e) {
            console.error("Cannot change password : ", e);
        }

    }

    const handleDeleteAccount = async () => {
        try{
            const deleteAccount = await deleteFromDB(`/auth/${userId}/deleteAccount`);
            if(deleteAccount){
                navigate("/login");
            }
        } catch (e) {
            console.error("Cannot delete account : ", e);
        }
    }


    return (
        <div style={{position: "relative"}}>
            {
                confirmationMessage && (
                    <div style={{width: "70%", height: 50, backgroundColor: "black",color: "white", borderRadius: 8, position: "absolute", left: "50%", transform: 'translate(-50%, 10px)'}}>
                        <p>{message}</p>
                    </div>
                )
            }

            <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column", minHeight: "80vh"}}>
                <div>
                    <h1 style={{
                        marginLeft: "8rem",
                        marginTop: "1.8rem",
                        marginBottom: "2rem",
                        fontSize: "1.8rem"
                    }}>Paramètres</h1>

                    <div style={{
                        marginLeft: "8rem",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%",
                        alignItems: "center"
                    }}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label htmlFor={"updatePassword"}>Modifier le mon de passe</label>
                            <input type={"password"} style={{padding: "0.5rem 1rem"}} id={"updatePassword"}
                                   value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        </div>
                        <CustomButton sx={{color: "white", marginBottom: 0}}
                                      onClick={handleUpdatePassword}>Save</CustomButton>
                    </div>


                    <CustomButton
                        sx={{
                            backgroundColor: "white",
                            color: "#2C3E50",
                            border: "1px solid #2C3E50",
                            display: "block",
                            marginLeft: "8rem",
                            marginTop: "3rem"
                        }} onClick={logout}>Log out</CustomButton>
                </div>

                <CustomButton sx={{color: "red", width: "180px", alignSelf: "end"}} onClick={handleDeleteAccount}>Delete
                    account</CustomButton>
            </div>
        </div>

    );
};

export default Settings;
