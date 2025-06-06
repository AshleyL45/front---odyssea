import {post} from "../API/api";

export interface RegisterPayload {
    email: string;
    password: string;
    role?: string;
    firstName: string;
    lastName: string;
}

export const loginUser = async (email: string, password: string) => {
    return post("/auth/login", {email, password});
};

export const registerUser = async (data: RegisterPayload) => {
    try {
        const response = await post("/auth/register", {
            ...data,
            role: data.role || "USER",
        });

        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

