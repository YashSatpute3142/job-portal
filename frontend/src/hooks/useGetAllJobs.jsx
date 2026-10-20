import { getAllJobs } from "@/api/jobApi"
import { setAllJobs } from "@/redux/jobSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useGetAllJobs = (useSearch = false) => {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(store => store.job)
    const keyword = useSearch ? searchedQuery : ""
    useEffect(() => {
        let cancelled = false
        const fetchAllJobs = async () => {
            try {
                const res = await getAllJobs(keyword)
                if (cancelled) return

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job))
                } else {
                    dispatch(setAllJobs([]))
                }
            } catch (error) {
                console.error(error);
                if (!cancelled) dispatch(setAllJobs([]))
            }
        }
        fetchAllJobs()
        return () => {
            cancelled = true
        }
    }, [keyword])
}
