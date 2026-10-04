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