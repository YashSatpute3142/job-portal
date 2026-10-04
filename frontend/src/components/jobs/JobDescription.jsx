import { useParams } from "react-router-dom"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { getSingleJob } from "@/api/jobApi"
import { useDispatch, useSelector } from "react-redux"
import { setSingleJob } from "@/redux/jobSlice"
import { applyForJob } from "@/api/applicationApi"
import { toast } from "../ui/toast"

export const JobDescription = () => {
    const {singleJob} = useSelector(store=>store.job) 
    const {user} = useSelector(store=>store.auth) 
    const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant === user?._id) || false;
    const [isapplied, setIsAppied] = useState(isInitiallyApplied);

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async() => {
        try {
            const res = await applyForJob(jobId)
            if(res.data.success){
                setIsAppied(true);
                const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob)) //help to real time UI update
                toast.add({
                title: "Success",
                description: res.data.message,
                type: "success",
            });
            }
            
        } catch (error) {
            console.error(error);
            toast.add({
            title: "Error",
            description:
                error.response?.data?.message || "Something went wrong",
            type: "error",
        });
            
        }
    }
    
    useEffect(() =>{
        const fetchSingleJob = async() => {
            try {
                const res = await getSingleJob(jobId)
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job))
                    setIsAppied(res.data.job.applications.some(application=>application.applicant === user?._id)) // ensure that  the state is in sync with  fetched data
                }
                
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchSingleJob()
    },[jobId, dispatch, jobId])
    if(!singleJob) return <div>Loading...</div>

    const {applications,company,createdAt,description,experienceLevel,jobType,location,position,requirements,salary,title} = singleJob

   return (
    <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h1 className="font-bold text-3xl text-gray-900">{title}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-5">
                        <Badge className="text-blue-700 font-semibold rounded-full bg-blue-50 px-4 py-2" variant="ghost">
                            {position} Position
                        </Badge>
                        <Badge className="text-[#F83002] font-semibold rounded-full bg-red-50 px-4 py-2" variant="ghost">
                            {jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-semibold rounded-full bg-purple-50 px-4 py-2" variant="ghost">
                            {salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={isapplied ? null : applyJobHandler}
                    disabled={isapplied}
                    className={`rounded-lg px-6 py-6 ${
                        isapplied
                            ? "bg-gray-500 cursor-not-allowed text-white"
                            : "bg-[#7209b7] hover:bg-[#5f32ad] text-white"
                    }`}
                >
                    {isapplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            <div className="border-b border-gray-200 my-8"></div>

            <h1 className="font-bold text-xl text-gray-900 mb-6">
                Job Description
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-semibold text-gray-900 mt-1">{title}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900 mt-1">{location}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-900 mt-1">{experienceLevel} years</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-semibold text-gray-900 mt-1">{salary} LPA</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Applicants</p>
                    <p className="font-semibold text-gray-900 mt-1">{applications?.length || 0}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Posted Date</p>
                    <p className="font-semibold text-gray-900 mt-1">
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="font-bold text-lg text-gray-900 mb-3">
                    About the Job
                </h2>
                <p className="text-gray-600 leading-7">
                    {description}
                </p>
            </div>

            <div className="mt-8">
                <h2 className="font-bold text-lg text-gray-900 mb-3">
                    Requirements
                </h2>
                <div className="flex flex-wrap gap-3">
                    {requirements?.map((requirement, index) => (
                        <Badge
                            key={index}
                            className="bg-purple-50 text-[#7209b7] px-4 py-2 rounded-full"
                            variant="ghost"
                        >
                            {requirement}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
}