import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { BriefcaseBusiness } from "lucide-react"

const headClass = "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6"

const statusClass = (status) => {
    const value = (status || "pending").toLowerCase()
    if (value === "accepted") return "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
    if (value === "rejected") return "border border-red-200 bg-red-50 text-red-600 hover:bg-red-50"
    return "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50"
}

const MotionRow = motion.create(TableRow)

export const AppliedJObTable = () => {
    const { allApliedJobs } = useSelector(store => store.job)

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="mb-4 text-gray-400">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
                        <TableHead className={headClass}>Date</TableHead>
                        <TableHead className={headClass}>Job Role</TableHead>
                        <TableHead className={headClass}>Company</TableHead>
                        <TableHead className={`${headClass} text-right`}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !allApliedJobs || allApliedJobs.length <= 0 ?
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="px-6 py-14 text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                                        <BriefcaseBusiness className="h-5 w-5" />
                                    </div>
                                    <p className="font-semibold text-gray-900">You Haven't Applied Any Job Yet.</p>
                                    <p className="mt-1 text-sm text-gray-500">Jobs you apply for will show up here.</p>
                                </TableCell>
                            </TableRow> :
                            allApliedJobs.map((appliedJob, index) => (
                                <MotionRow
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.04 }}
                                    key={appliedJob._id}
                                    className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/80"
                                >
                                    <TableCell className="px-4 py-3 sm:px-6">
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                            {appliedJob.createdAt?.split("T")[0] || "N/A"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 font-semibold text-gray-900 sm:px-6">{appliedJob.job?.title || "N/A"}</TableCell>
                                    <TableCell className="px-4 py-3 text-gray-600 sm:px-6">{appliedJob.job?.company?.name || "N/A"}</TableCell>
                                    <TableCell className="px-4 py-3 text-right sm:px-6">
                                        <Badge className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(appliedJob.status)}`}>
                                            {appliedJob.status || "Pending"}
                                        </Badge>
                                    </TableCell>
                                </MotionRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
