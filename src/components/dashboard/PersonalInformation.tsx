import {FC, JSX, useState} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";
import {post, put} from "../../API/api";

const PersonalInformation: ({}: {}) => JSX.Element = ({}) => {
    const {firstName, lastName, email} = useAuth();
    const {userId} = useAuth();

    const [newFirstName, setNewFirstName] = useState(firstName?.toString() || "");
    const [newLastName, setNewLastName] = useState(lastName?.toString() || "");
    const [newEmail, setNewEmail] = useState(email?.toString() || "");

    const [message, setMessage] = useState<string>("");

    const handleAccountChange = async () => {
        try {
            const postNewInfo = await put(`/auth/${userId}/update`, {
                email: newEmail,
                firstName: newFirstName,
                lastName: newLastName
            })

            if(postNewInfo === "Account successfully updated."){
                setMessage(postNewInfo);
            }
        } catch (e) {
            console.error("Cannot update account : ", e);
        }
    }

    return (
        <div>
            <h1 style={{
                marginLeft: "8rem",
                marginTop: "1.8rem",
                marginBottom: "2rem",
                fontSize: "1.8rem"
            }}>Personal information</h1>

            <section style={{display: "flex", justifyContent: "space-between", width: "85%", margin: "auto"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <label htmlFor={"updateFirstName"}>First Name</label>
                    <input type={"text"} style={{padding: "0.5rem 1rem"}} id={"updateFirstName"} defaultValue={firstName?.toString()}
                           onChange={(e) => setNewFirstName(e.target.value)}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <label htmlFor={"updateLastName"}>Last Name</label>
                    <input type={"text"} style={{padding: "0.5rem 1rem"}} id={"updateLastName"} defaultValue={lastName?.toString()}
                           onChange={(e) => setNewLastName(e.target.value)}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <label htmlFor={"updateEmail"}>E-mail</label>
                    <input type={"email"} style={{padding: "0.5rem 1rem"}} id={"updateEmail"} defaultValue={email?.toString()}
                           onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>

                <CustomButton sx={{color: "white", marginBottom: 0}}
                              onClick={handleAccountChange} >Save</CustomButton>
            </section>
            {
                message && (
                    <p style={{color: "green", marginLeft: "7rem", marginTop: "2rem"}}>{message}</p>
                )
            }


        </div>
    );
};

export default PersonalInformation;
