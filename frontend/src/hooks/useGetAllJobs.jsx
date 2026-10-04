import { getAllJobs } from "@/api/jobApi"
import { setAllJobs } from "@/redux/jobSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetAllJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await getAllJobs()
                
                if (res.data.success) {
                    
                    dispatch(setAllJobs(res.data.job))
                }
            } catch (error) {
                console.error(error);

            }
        }
        fetchAllJobs()
    }, [])
}