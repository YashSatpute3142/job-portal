import { Job } from "@/components/jobs/Job"
import { useGetAllJobs } from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { SearchX } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"



export const Browse = () => {
    useGetAllJobs()
    const {allJobs} = useSelector(store => store.job);
    const dispatch = useDispatch()
    const mounted = useRef(false)
    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
            setTimeout(() => {
                if (!mounted.current) dispatch(setSearchedQuery(""))
            }, 0)
        }
    },[])

    return(
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="mb-8 flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Search Results</h1>
                    <span className="rounded-full border border-[#6A38C2]/20 bg-[#6A38C2]/10 px-3 py-1 text-sm font-semibold text-[#6A38C2]">
                        {allJobs.length}
                    </span>
                </div>
                {
                    allJobs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                                <SearchX className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No jobs found</h3>
                            <p className="mt-1 max-w-sm text-sm text-gray-500">
                                We couldn't find any jobs matching your search. Try a different keyword.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {
                            allJobs.map((job) => {
                                return(
                                    <Job key={job._id} job= {job} />
                                )
                            })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
