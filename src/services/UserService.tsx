import {deleteFromDB, patch, put} from "../API/api";

export const updateAccountInformation = async (newEmail : string, newFirstName: string, newLastName: string) => {
    return await put(`/users/`, {
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName
    });
}

export const updatePassword = async (newPassword: string) => {
    return await patch(`/users/password`, {
        password: newPassword
    });
}

export const deleteAccount = async () => {
    return await deleteFromDB(`/users/`);
}