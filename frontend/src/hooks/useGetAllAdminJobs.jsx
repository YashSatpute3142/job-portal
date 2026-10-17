import { getAllAdminJobs } from "@/api/jobApi"
import { setAllAdminJobs } from "@/redux/jobSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetAllAdminJobs = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await getAllAdminJobs()
                console.log("ADMIN JOBS RESPONSE:", res.data)
                
                if (res.data.success) {
                    
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.error(error);

            }
        }
        fetchAllAdminJobs()
    }, [])
}