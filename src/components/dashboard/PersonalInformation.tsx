import {JSX, useState} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import "../../App.css"
import {useUserDashboard} from "../../contexts/DashboardContext";
import styles from "./PersonalInformation.module.css"
import MessageBox from "../auth/MessageBox";
import {useAccountActions} from "../../hooks/UseAccountActions";

const PersonalInformation: ({}: {}) => JSX.Element = ({}) => {
    const {firstName, lastName} = useUserDashboard()
    const {email} = useAuth();

    const [newFirstName, setNewFirstName] = useState(firstName?.toString() || "");
    const [newLastName, setNewLastName] = useState(lastName?.toString() || "");
    const [newEmail, setNewEmail] = useState(email?.toString() || "");

    const {updateInfo, error} = useAccountActions();


    const handleAccountChange = async (event: React.FormEvent) => {
        event.preventDefault();
        await updateInfo(newEmail, newFirstName, newLastName);
    };

    return (
        <>
            <h1 className={styles.personalInfoTitle}>Personal information</h1>

            <form onSubmit={handleAccountChange} className={styles.sectionPersonalInformation}>
                <div className={styles.personalInfoInputs}>
                    <label htmlFor={"updateFirstName"}>First Name</label>
                    <input type={"text"} style={{padding: "0.5rem 1rem"}} id={"updateFirstName"} defaultValue={firstName?.toString()}
                           onChange={(e) => setNewFirstName(e.target.value)}
                    />
                </div>

                <div className={styles.personalInfoInputs}>
                    <label htmlFor={"updateLastName"}>Last Name</label>
                    <input type={"text"} style={{padding: "0.5rem 1rem"}} id={"updateLastName"} defaultValue={lastName?.toString()}
                           onChange={(e) => setNewLastName(e.target.value)}
                    />
                </div>

                <div className={styles.personalInfoInputs}>
                    <label htmlFor={"updateEmail"}>E-mail</label>
                    <input type={"email"} style={{padding: "0.5rem 1rem"}} id={"updateEmail"}
                           placeholder={"Insert your new email."}
                           onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>

                <CustomButton sx={{color: "white", marginBottom: 0, width: 120}} type="submit">Save</CustomButton>
            </form>

            {
                error && (
                    <MessageBox type={"success"} text={"Information successfully updated."}/>
                )
            }

        </>
    );
};

export default PersonalInformation;
