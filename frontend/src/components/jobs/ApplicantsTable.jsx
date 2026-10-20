import { motion } from "framer-motion"
import { Check, FileText, MoreHorizontal, UserX, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { setStatus } from "@/api/applicationApi"
import { toast } from "../ui/toast"
const ShortlistingStatus = ["accepted", "rejected"]

const formatDate = (value) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return typeof value === "string" ? value.split("T")[0] : "—"
    }
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

const headClass = "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6"

const MotionRow = motion.create(TableRow)

export const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const statushandler = async (status, id) => {
        try {
            const res = await setStatus({ status, id });
            if (res.data.success) {
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

    const rows = Array.isArray(applicants?.applications) ? applicants.applications : []

    if (rows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                    <UserX className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No applicants yet</h3>
                <p className="mt-1 max-w-sm text-sm text-gray-500">
                    When candidates apply for this job, they will appear here.
                </p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableCaption className="mb-4 text-gray-400">A List of your recent applied user</TableCaption>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
                            <TableHead className={headClass}>FullName</TableHead>
                            <TableHead className={`${headClass} hidden md:table-cell`}>Email</TableHead>
                            <TableHead className={`${headClass} hidden lg:table-cell`}>Contanct</TableHead>
                            <TableHead className={headClass}>Resume</TableHead>
                            <TableHead className={`${headClass} hidden sm:table-cell`}>Date</TableHead>
                            <TableHead className={`${headClass} text-right`}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            rows.map((item, index) => {
                                const fullName = item?.applicant?.fullName || "Unknown Applicant"
                                const initial = fullName.trim().charAt(0).toUpperCase() || "U"

                                return (
                                    <MotionRow
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.04 }}
                                    key={item?._id || index}
                                        className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/80"
                                    >
                                        <TableCell className="px-4 py-3 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6A38C2]/20 bg-[#6A38C2]/10 text-sm font-semibold text-[#6A38C2]">
                                                    {initial}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-gray-900">{fullName}</div>
                                                    <div className="truncate text-xs text-gray-500 md:hidden">{item?.applicant?.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden px-4 py-3 text-sm text-gray-600 md:table-cell sm:px-6">{item?.applicant?.email}</TableCell>
                                        <TableCell className="hidden px-4 py-3 text-sm text-gray-600 lg:table-cell sm:px-6">{item?.applicant?.phoneNumber}</TableCell>
                                        <TableCell className="px-4 py-3 sm:px-6">
                                            {
                                                item?.applicant?.profile?.resume ? (
                                                    <a
                                                        className="inline-flex max-w-[180px] cursor-pointer items-center gap-1.5 rounded-full bg-[#6A38C2]/10 px-3 py-1 text-xs font-medium text-[#6A38C2] transition-colors hover:bg-[#6A38C2]/20"
                                                        href={item?.applicant?.profile?.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FileText className="h-3.5 w-3.5 shrink-0" />
                                                        <span className="truncate">{item?.applicant?.profile?.resumeOriginalName || "Resume"}</span>
                                                    </a>
                                                ) : (
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">NA</span>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell className="hidden px-4 py-3 sm:table-cell sm:px-6">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                {formatDate(item?.applicant?.createdAt)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-right sm:px-6">
                                            <Popover>
                                                <PopoverTrigger className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </PopoverTrigger>
                                                <PopoverContent className="z-50 w-40 rounded-xl border border-gray-200 bg-white p-1.5 opacity-100 shadow-xl">
                                                    {
                                                        ShortlistingStatus.map((status, idx) => {
                                                            const accepted = status === "accepted"
                                                            return (
                                                                <div
                                                                    onClick={() =>statushandler(status, item?._id)}
                                                                    key={idx}
                                                                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium capitalize text-gray-700 transition-colors ${
                                                                        accepted
                                                                            ? "hover:bg-emerald-50 hover:text-emerald-700"
                                                                            : "hover:bg-red-50 hover:text-red-600"
                                                                    }`}
                                                                >
                                                                    {accepted ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                                                                    <span>{status}</span>
                                                                </div>
                                                            )
                                                        })

                                                    }
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </MotionRow>
                                )
                            })
                        }
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}
