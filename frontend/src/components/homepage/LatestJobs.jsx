import { useSelector } from "react-redux"
import { LatestJobCards } from "./LatestJonCarts"

const randomJobs = [1,2,3,4,5,6,7,8]
export const LatestJobs = () => {

    const {allJobs} = useSelector(store=>store.job)

    return(
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top </span>Job Openeing</h1>
            {/*Carts */}
            <div className="grid grid-cols-3 gap-4 my-5">
                {
                     !allJobs || allJobs.length === 0 ? <span>NO Job Available</span> : allJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>

        </div>
    )
}