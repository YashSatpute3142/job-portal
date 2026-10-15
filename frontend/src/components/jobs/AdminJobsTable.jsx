
import { Building2, Edit2, MoreHorizontal, SearchX } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setSearchJobByText } from "@/redux/jobSlice"

const formatDate = (value) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === "string" ? value.split("T")[0] : "—"
    }
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export const AdminJobsTable = () => {

    const {allAdminJobs, searchJobByText} = useSelector(store =>store.job)

    const [filterJob, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies?.length >= 0 && companies.filter((job) => {
            if (!setSearchJobByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterJobs(filteredCompany)
    }, [allAdminJobs, searchJobByText])

    const rows = Array.isArray(filterJob) ? filterJob : []
    const hasSearch = Boolean(searchCompanyByText)

    if (rows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                    {hasSearch ? <SearchX className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {hasSearch ? "No matching companies" : "No companies yet"}
                </h3>
                <p className="mt-1 max-w-sm text-sm text-gray-500">
                    {hasSearch
                        ? "We couldn't find any company matching your search. Try a different name."
                        : "Companies you register will appear here. Use the Add Company button to get started."}
                </p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableCaption className="mb-4 text-gray-400">A List Of Your Recent Posted Jobs</TableCaption>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
                            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">Company Name</TableHead>
                            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">Role</TableHead>
                            <TableHead className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:table-cell sm:px-6">Date</TableHead>
                            <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            rows.map((job, index) => {
                                const { name, createdAt, logo } = job || {}
                                const displayName = name || "Unnamed Company"
                                const initial = displayName.trim().charAt(0).toUpperCase() || "C"
                                return (
                                    <TableRow
                                        key={job?._id || index}
                                        className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/80"
                                    >
                                        <TableCell className="px-4 py-3 sm:px-6">
                                            {logo ? (
                                                <Avatar className="h-10 w-10 border border-gray-200 bg-white">
                                                    <AvatarImage src={logo} alt={displayName} className="object-cover" />
                                                </Avatar>
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6A38C2]/20 bg-[#6A38C2]/10 text-sm font-semibold text-[#6A38C2]">
                                                    {initial}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 sm:px-6">
                                            <div className="font-medium text-gray-900">{displayName}</div>
                                            <div className="text-xs text-gray-500 sm:hidden">{formatDate(createdAt)}</div>
                                        </TableCell>
                                        <TableCell className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6">
                                            {formatDate(createdAt)}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-right sm:px-6">
                                            <Popover>
                                                <PopoverTrigger className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-36 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
                                                    <div
                                                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#6A38C2]/10 hover:text-[#6A38C2]"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
