import { getAllAplicants } from "@/api/applicationApi"
import { ApplicantsTable } from "@/components/jobs/ApplicantsTable"
import { setAllApplicants } from "@/redux/ApplicationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Users } from "lucide-react"

export const Applicants = () => {
    const params = useParams()
    const Id = params.id;
    const dispatch = useDispatch()
    const {applicants} = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllAplicants = async() => {
            try {
                const res =await getAllAplicants(Id)
                if( res.data.success){
                    dispatch(setAllApplicants((await res).data.job))
                }
            } catch (error) {
                console.error(error);

            }
        }
        fetchAllAplicants()
    },[])

    return(
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="mb-3 inline-block w-fit rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#6A38C2] shadow-sm">
                            Recruiter Dashboard
                        </span>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Applicants</h1>
                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Review everyone who applied for this job and update their application status.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6A38C2]/10 text-[#6A38C2]">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total Applicants</p>
                            <p className="text-2xl font-bold leading-tight text-gray-900">{applicants?.applications?.length ?? 0}</p>
                        </div>
                    </div>
                </div>

                <ApplicantsTable />
            </div>
        </div>
    )
}
