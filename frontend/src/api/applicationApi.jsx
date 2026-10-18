import { APPLICATION_API_END_POINT } from "@/utils/constant"
import axios from "axios"

export const applyForJob = async(jobId) => {
    return await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{},{
        withCredentials:true
    })
}

export const getAllAplicants = async(Id) => {
    return await axios.get(
        `${APPLICATION_API_END_POINT}/${Id}/applicants`,
        {
            withCredentials:true
        }
    )
}

export const setStatus = async({status, id}) => {
    return await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        {status},
        {
            withCredentials:true
        }
    )
}