import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postAdminJob } from "@/api/jobApi";
import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { Briefcase, Loader2 } from "lucide-react";

const companyArray = [];

const inputClass =
    "h-11 rounded-lg border-gray-200 bg-white focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0 focus-visible:border-[#6A38C2] disabled:cursor-not-allowed disabled:opacity-60"
const labelClass = "mb-2 block text-sm font-medium text-gray-700"

export const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading] = useState(false)
    const { companies } = useSelector(store => store.company);
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSelectChsngeHandler = (value) => {
        setInput({ ...input, companyId: value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await postAdminJob(input);

            toast.add({
                title: "Success",
                description: res.data.message,
                type: "success",
            });
            navigate("/admin/jobs")

        } catch (error) {
            console.error(error);
            toast.add({
                title: "Error",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
            });

        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="mb-8 text-center sm:text-left">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6A38C2]/10 text-[#6A38C2] sm:mx-0">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Post a New Job</h1>
                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Fill in the details below to publish an opening and start receiving applications.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label className={labelClass}>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Frontend Developer"
                                value={input.title}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Short summary of the role"
                                value={input.description}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                placeholder="React, Node.js, MongoDB"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                placeholder="In LPA"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="City, Country"
                                value={input.location}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                placeholder="Full Time, Part Time"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                placeholder="Years of experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <Label className={labelClass}>No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className={inputClass}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="md:col-span-2">
                                    <Label className={labelClass}>Company</Label>
                                    <Select onValueChange={handleSelectChsngeHandler}>
                                        <SelectTrigger className="flex h-11 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-[#6A38C2] focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/30 focus:ring-offset-0">
                                            <SelectValue placeholder="Select a Company">
                                                {companies.find((company) => company._id === input.companyId)?.name || "Select a Company"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent alignItemWithTrigger={false} sideOffset={6} className="z-50 min-w-[var(--anchor-width)] rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem key={company.name} value={company._id} className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-[#6A38C2]/10 focus:text-[#6A38C2]">
                                                                {company.name}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 w-full rounded-full bg-[#6A38C2] px-8 text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Post Job"
                            )}
                        </Button>
                        {
                            companies.length === 0 && (
                                <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-center text-xs font-semibold text-red-600">
                                    *Please Register a Company first before posting job
                                </p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
