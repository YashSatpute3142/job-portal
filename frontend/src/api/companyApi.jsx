import axios from "axios"

export const addNewCompany = async() => {
    return await axios.post(
        `${COMPANY_API_END_POINT}/register`
    )
}