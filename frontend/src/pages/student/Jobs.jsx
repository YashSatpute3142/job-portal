import { FilterCard } from "@/components/jobs/FilterCard"
import { Job } from "@/components/jobs/Job"
import { useGetAllJobs } from "@/hooks/useGetAllJobs"
import { space } from "postcss/lib/list"
import { useSelector } from "react-redux"

export const Jobs = () => {
    useGetAllJobs()
    const {allJobs} = useSelector(store=>store.job)
    return(
        <div className="max-w-7xl mx-auto mt-5">
            <div className="flex gap-5">
                <div className="w-20%">
                   <FilterCard />
                </div>
                
               {
                 !allJobs || allJobs.length === 0 ? <span>Job not Found</span> : (
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                allJobs.map((job) => (
                                    <div key={job._id}>
                                        <Job job = {job}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
               }

            </div>
           
        </div>
        
    )
}