import {JSX, useState} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import MessageBox from "../auth/MessageBox";
import styles from "./Settings.module.css"
import {useAccountActions} from "../../hooks/UseAccountActions";
import DeleteAccountModal from "./DeleteAccountModal";

const Settings: ({}: {}) => JSX.Element = ({}) => {
    const {logout} = useAuth();
    const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {changePassword, error, successMessage, removeAccount} = useAccountActions();

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

        await changePassword(inputValue);
    };


    const handleDeleteAccount = async () => {
        await removeAccount();
        setIsModalOpen(false);

        if (successMessage) {
            setMessage({type: "success", text: successMessage});
        } else {
            setMessage({ type: "error", text: "An error occurred while deleting your account. Please try again later." });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setMessage(null);
    };


    return (
        <>

            <section className={styles.settingsContainer}>
                <div>
                    <h1 className={styles.settingsTitle}>Settings</h1>

                    <form onSubmit={handleUpdatePassword} className={styles.passwordForm}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label htmlFor={"updatePassword"}>Change my password</label>
                            <input type={"password"} style={{padding: "0.5rem 1rem"}} id={"updatePassword"}
                                   placeholder={"Insert your new password."}
                                   value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        </div>
                        <CustomButton className={styles.savePasswordButton} type={"submit"} onClick={handleUpdatePassword}>Save</CustomButton>
                    </form>

                    <CustomButton onClick={logout} className={styles.logoutButton}>Log out</CustomButton>
                </div>

                {
                    message && message.type === "success" ? (
                        <MessageBox type={"success"} text={message.text}/>
                    ) : message && message.type === "error" ? (
                        <MessageBox type={"error"} text={message.text}/>
                    ) : null
                }


                <CustomButton sx={{color: "red", width: "180px", alignSelf: "end"}} onClick={()=> setIsModalOpen(true)} aria-label="Delete your account permanently">Delete
                    account</CustomButton>

                <DeleteAccountModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleDeleteAccount}/>
            </section>
        </>

    );
};

export default Settings;
