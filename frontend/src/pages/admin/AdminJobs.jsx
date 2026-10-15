import { AdminJobsTable } from "@/components/jobs/AdminJobsTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetAllAdminJobs } from "@/hooks/useGetAllAdminJobs"
import { setSearchCompanyByText } from "@/redux/companySlice"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const AdminJobs = () => {
    useGetAllAdminJobs()
    const [input, setinput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="mb-8">
                    <span className="mb-3 inline-block w-fit rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#6A38C2] shadow-sm">
                        Recruiter Dashboard
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Company Management</h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        View, search and manage all the Jobs registered on your account.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="relative w-full sm:max-w-sm">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            className="h-11 w-full rounded-full border-gray-200 bg-white pl-11 shadow-lg shadow-gray-200/60 focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]"
                            placeholder="Filter By Name"
                            onChange={(e) => setinput(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="h-11 w-full sm:w-auto rounded-full bg-[#6A38C2] px-5 text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Job
                    </Button>
                </div>

                <AdminJobsTable />
            </div>
        </div>
    )
}
