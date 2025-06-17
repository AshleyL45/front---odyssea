import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {get} from "../API/api";

export const useUsernames = () => {
    const {token} = useAuth();
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);

    useEffect(() => {
        if(!token) return;
        const fetchUsername = async () => {
            try {
                const res = await get(`/auth/me`);
                if(res?.data) {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchUsername();
    }, [token])

    return {firstName, lastName};
}