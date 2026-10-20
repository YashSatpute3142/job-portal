import { AnimatePresence, motion } from "framer-motion"
import { easeOut } from "@/lib/motion"
import { FilterCard } from "@/components/jobs/FilterCard"
import { Job } from "@/components/jobs/Job"
import { useGetAllJobs } from "@/hooks/useGetAllJobs"
import { SearchX } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const salaryRanges = {
    "0-5 LPA": [0, 5],
    "5-10 LPA": [5, 10],
    "10-20 LPA": [10, 20],
    "20+ LPA": [20, Infinity],
}

const normalize = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "")

export const Jobs = () => {
    useGetAllJobs()
    const {allJobs, searchedQuery} = useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const range = salaryRanges[searchedQuery]
            const query = normalize(searchedQuery)
            const filteredJobs = allJobs.filter((job) => {
                if (range) {
                    const salary = Number(job?.salary)
                    return salary >= range[0] && salary < range[1]
                }
                const location = normalize(job?.location)
                return normalize(job?.title).includes(query) ||
                normalize(job?.description).includes(query) ||
                location.includes(query) ||
                (location !== "" && query.includes(location))
            })
            setFilterJobs(filteredJobs)

        } else {
            setFilterJobs(allJobs)
        }
    },[allJobs, searchedQuery])
    return(
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Find Jobs</h1>
                    <span className="rounded-full border border-[#6A38C2]/20 bg-[#6A38C2]/10 px-3 py-1 text-sm font-semibold text-[#6A38C2]">
                        {filterJobs?.length || 0}
                    </span>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: easeOut }}
                        className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72"
                    >
                       <FilterCard />
                    </motion.div>

                   {
                     !filterJobs || filterJobs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, ease: easeOut }}
                            className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
                                <SearchX className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Job not Found</h3>
                            <p className="mt-1 max-w-sm text-sm text-gray-500">
                                No jobs match the selected filter. Try a different option or clear the filter.
                            </p>
                        </motion.div>
                     ) : (
                        <div className="min-w-0 flex-1">
                            <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                <AnimatePresence mode="popLayout">
                                {
                                    filterJobs.map((job, index) => (
                                        <motion.div
                                            key={job._id}
                                            layout="position"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: Math.min(index, 9) * 0.05, ease: easeOut } }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.3, ease: easeOut }}
                                        >
                                            <Job job = {job}/>
                                        </motion.div>
                                    ))
                                }
                                </AnimatePresence>
                            </div>
                        </div>
                    )
                   }

                </div>

            </div>
        </div>

    )
}
