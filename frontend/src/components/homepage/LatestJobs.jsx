import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Briefcase } from "lucide-react"
import { LatestJobCards } from "./LatestJonCarts"

export const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)
    const navigate = useNavigate()
    const hasJobs = allJobs && allJobs.length > 0
    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
                    </h2>
                    <p className="text-base leading-relaxed text-gray-600">
                        Explore the newest opportunities from companies hiring now.
                    </p>
                </div>
                {hasJobs ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allJobs.slice(0, 6).map((job) => (
                                <LatestJobCards key={job._id} job={job}  />
                            ))}
                        </div>
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={() => navigate("/jobs")}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#6A38C2] px-8 py-3 font-medium text-white shadow-lg shadow-[#6A38C2]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5b2fb0] hover:shadow-xl hover:shadow-[#6A38C2]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A38C2]"
                            >
                                View All Jobs
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 px-6 py-14 text-center">
                        <span className="flex size-14 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                            <Briefcase className="size-6" strokeWidth={1.75} />
                        </span>
                        <p className="text-lg font-semibold text-gray-900">
                            No job openings available right now.
                        </p>
                        <p className="text-sm text-gray-500">
                            Please check back soon for new opportunities.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
