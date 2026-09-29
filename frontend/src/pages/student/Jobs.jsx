import { FilterCard } from "@/components/jobs/FilterCard"
import { Job } from "@/components/jobs/Job"
import { space } from "postcss/lib/list"

const jobArray = [1,2,3,4,5,6,7,8]

export const Jobs = () => {
    return(
        <div className="max-w-7xl mx-auto mt-5">
            <div className="flex gap-5">
                <div className="w-20%">
                   <FilterCard />
                </div>
                
               {
                jobArray.length <= 0 ? <span>Job not Found</span> : (
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                jobArray.map((item, index) => (
                                    <div>
                                        <Job />
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