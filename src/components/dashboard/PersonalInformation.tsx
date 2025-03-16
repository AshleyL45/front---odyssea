import {FC, JSX} from 'react';
import CustomButton from "../ReusableComponents/CustomButton";
import {useAuth} from "../../contexts/AuthContext";

const PersonalInformation: ({}: {}) => JSX.Element = ({}) => {
    const {firstName, lastName, email} = useAuth();
    console.log(lastName?.toString())

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
                    <input type={"text"} style={{padding: "0.5rem 1rem"}} id={"updateFirstName"} value={firstName?.toString()}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <label htmlFor={"updateLastName"}>Last Name</label>
                    <input type={"text"} style={{padding: "0.5rem 1rem"}} id={"updateLastName"} value={lastName?.toString()}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <label htmlFor={"updateEmail"}>E-mail</label>
                    <input type={"email"} style={{padding: "0.5rem 1rem"}} id={"updateEmail"} value={email?.toString()}
                    />
                </div>

                <CustomButton sx={{color: "white", marginBottom: 0}}
                             >Save</CustomButton>
            </section>


        </div>
    );
};

export default PersonalInformation;
