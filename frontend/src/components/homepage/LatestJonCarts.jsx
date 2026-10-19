import { MapPin } from "lucide-react"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"

const formatSalary = (salary) => {
    const monthly = Number(salary)
    if (!monthly) return null
    return `${((monthly * 12) / 100000).toFixed(1)} LPA`
}

export const LatestJobCards = ({ job }) => {
    const { company, title, description, position, jobType, salary, location } = job
    const companyName = company?.name || "Company"
    const salaryLabel = formatSalary(salary)
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#6A38C2]/40 hover:shadow-xl hover:shadow-[#6A38C2]/15">
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#6A38C2] transition-transform duration-500 group-hover:scale-x-100"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-[#6A38C2]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6A38C2]/10 text-lg font-bold uppercase text-[#6A38C2] transition-colors duration-300 group-hover:bg-[#6A38C2] group-hover:text-white">
                    {companyName.charAt(0)}
                </span>
                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">{companyName}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">{location || "India"}</span>
                    </p>
                </div>
            </div>
            <div className="relative mt-5 flex-1">
                <h2 className="text-xl font-bold leading-snug text-gray-950 transition-colors duration-300 group-hover:text-[#6A38C2]">
                    {title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {description}
                </p>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center gap-2">
                <Badge variant="ghost" className="rounded-full bg-[#6A38C2]/10 px-3 font-semibold text-[#6A38C2]">
                    {position} Position
                </Badge>
                <Badge variant="ghost" className="rounded-full bg-[#F83002]/10 px-3 font-semibold text-[#F83002]">
                    {jobType}
                </Badge>
                {salaryLabel && (
                    <Badge variant="ghost" className="rounded-full bg-emerald-50 px-3 font-semibold text-emerald-700">
                        {salaryLabel}
                    </Badge>
                )}
            </div>
        </div>
    )
}
