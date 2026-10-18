import { JOB_API_END_POINT } from "@/utils/constant"
import axios from "axios"

export const getAllJobs = async() => {
    return await axios.get(
        `${JOB_API_END_POINT}/get`,
        {
            withCredentials:true
        }
    )
}

export const getSingleJob = async(jobId) => {
    return await axios.get(
        `${JOB_API_END_POINT}/get/${jobId}`,
        {
            withCredentials:true
        }
    )
}

export const getAllAdminJobs = async() => {
    return await axios.get(
        `${JOB_API_END_POINT}/getadminjobs`,
        {
            withCredentials:true
        }
    )
}

export const postAdminJob =  async(input) => {
    return await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )
}