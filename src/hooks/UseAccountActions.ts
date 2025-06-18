import { useState } from "react";
import { updateAccountInformation, updatePassword, deleteAccount } from "../services/UserService";
import {useNavigate} from "react-router-dom";

export const useAccountActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const updateInfo = async (newEmail: string, newFirstName: string, newLastName: string) => {
        setLoading(true);
        setError(null);
        try {
            await updateAccountInformation(newEmail, newFirstName, newLastName);
            setSuccessMessage("Information updated successfully.");
        } catch (err) {
            setError("Failed to update account info.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (newPassword: string) => {
        setLoading(true);
        setError(null);
        try {
            await updatePassword(newPassword);
            setSuccessMessage("Password changed successfully.");
        } catch (err) {
            setError("Failed to change password.");
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    const removeAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await deleteAccount();
            if(response.success === true){
                setSuccessMessage("Account deleted successfully.");
                navigate("/");
            }
        } catch (err) {
            setError("Failed to delete account.");
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    return {
        updateInfo,
        changePassword,
        removeAccount,
        loading,
        error,
        successMessage,
    };
};
