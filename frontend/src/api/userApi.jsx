import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

export const registerUser = async (formData) => {
    return await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    );
};

export const loginUser = async (input) => {
    return await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
};