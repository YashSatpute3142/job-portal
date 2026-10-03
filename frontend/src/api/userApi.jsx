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

export const updateProile = async (formData) => {
    return await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    );
};

export  const  logoutUser = async () => {
    return await axios.get(
        `${USER_API_END_POINT}/logout`,
        {
            withCredentials:true
        }
    )
}