import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";

export const addNewCompany = async ({ companyName }) => {
    return await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
};

export const updateCompany = async({id, formData}) => {
    return await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    )
}

export const getCompanyById = async(companyId) => {
    return await axios.get(
        `${COMPANY_API_END_POINT}/get/${companyId}`,
        {
            withCredentials:true
        } 
    )
}

export const getAllCompanies = async() => {
    return await axios.get(
        `${COMPANY_API_END_POINT}/get`,
        {
            withCredentials:true
        } 
    )
}