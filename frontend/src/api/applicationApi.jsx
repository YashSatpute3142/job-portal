import { APPLICATION_API_END_POINT } from "@/utils/constant"
import axios from "axios"

export const applyForJob = async(jobId) => {
    return await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{},{
        withCredentials:true
    })
}