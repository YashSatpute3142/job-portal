
import { Bookmark, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"

export const Job = ({ job }) => {
    const navigate = useNavigate();

    if (!job) return null;

    const { company, title, description, position, jobType, salary, createdAt } = job;

    const daysFunction = (mongoDBTime) => {
        if (!mongoDBTime) return 0;

        const createdDate = new Date(mongoDBTime);
        const currentTime = new Date();
        const timeDifferance = currentTime - createdDate;

        return Math.floor(timeDifferance / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6A38C2]/30 hover:shadow-xl hover:shadow-[#6A38C2]/10">
            <div className="flex items-center justify-between">
                <p className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    {daysFunction(createdAt) === 0 ? "Today" : `${daysFunction(createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full border-gray-200 text-gray-500 transition-colors hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="my-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-1">
                    {company?.logo ? (
                        <Avatar className="h-full w-full rounded-lg">
                            <AvatarImage
                                src={company.logo}
                                className="object-cover"
                            />
                        </Avatar>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#6A38C2]/10 text-lg font-bold text-[#6A38C2]">
                            {company?.name?.trim()?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                    )}
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-base font-semibold text-gray-900">{company?.name || "Company"}</h1>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        India
                    </p>
                </div>
            </div>

            <div className="flex-1">
                <h1 className="mb-2 text-lg font-bold leading-snug text-gray-900">{title}</h1>
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">{description}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700" variant="ghost">
                    {position} Position
                </Badge>
                <Badge className="rounded-full bg-[#6A38C2]/10 px-3 py-1 font-semibold text-[#6A38C2]" variant="ghost">
                    {jobType}
                </Badge>
                <Badge className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700" variant="ghost">
                    {salary} LPA
                </Badge>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                <Button
                    onClick={() => navigate(`/description/${job._id}`)}
                    variant="outline"
                    className="h-10 flex-1 rounded-full border-gray-200 text-gray-700 transition-colors hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                >
                    Details
                </Button>
                <Button className="h-10 flex-1 rounded-full bg-[#6A38C2] text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] active:scale-95">
                    Save For Later
                </Button>
            </div>
        </div>
    )
}
