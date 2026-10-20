import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { AppliedJObTable } from "@/components/profile/AppliedJobTAble"
import { UpdateProfileDialog } from "@/components/profile/UpdateProfileDialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useGetAppliedJobs } from "@/hooks/useGetAppliedJobs"
import { Briefcase, Contact, FileText, Mail, Pen } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"


const isResume = true;

export const Profile = () => {
    useGetAppliedJobs()
    const [open , setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const{fullName,email,phoneNumber,profile} = user

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50 px-4 pb-12 pt-6 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
                <div className="h-28 bg-gradient-to-r from-[#6A38C2] via-[#7c4dd6] to-[#a67cf2] sm:h-32" />
                <div className="px-6 pb-8 sm:px-8">
                    <div className="-mt-12 flex items-end justify-between gap-4 sm:-mt-14">
                        <Avatar className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg sm:h-28 sm:w-28">
                            {profile?.profilePhoto ? (
                                <AvatarImage
                                    src={profile.profilePhoto}
                                    alt={fullName}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#6A38C2]/15 to-[#6A38C2]/5 text-3xl font-bold text-[#6A38C2] sm:text-4xl">
                                    {fullName?.trim().charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                        </Avatar>
                        <Button
                            onClick ={() => setOpen(true)}
                            className="mb-1 h-10 rounded-full border-gray-200 px-5 text-gray-700 transition-colors hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                            variant="outline"
                        >
                            <Pen className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{fullName}</h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 sm:text-base">{profile.bio}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2]">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Email</p>
                                <span className="block truncate text-sm font-medium text-gray-800">{email}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2]">
                                <Contact className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Phone</p>
                                <span className="block truncate text-sm font-medium text-gray-800">{phoneNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h1 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Skills</h1>
                        <div className="flex flex-wrap items-center gap-2">
                            {
                               profile?.skills.length !== 0 ? profile?.skills.map((item,index) => <motion.span key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }} className="inline-flex"><Badge className="rounded-full border border-[#6A38C2]/20 bg-[#6A38C2]/10 px-4 py-1.5 text-sm font-medium text-[#6A38C2] hover:bg-[#6A38C2]/15">{item}</Badge></motion.span>) :  <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-500">No skills added yet</span>
                            }
                        </div>

                    </div>
                    <div className="mt-8 grid w-full max-w-sm items-center gap-2">
                        <Label className="text-sm font-semibold uppercase tracking-wide text-gray-500">Resume</Label>
                        {
                            isResume ? (
                                <a
                                    href={profile?.resume}
                                    target="blank"
                                    className="inline-flex w-fit max-w-full cursor-pointer items-center gap-2 rounded-full bg-[#6A38C2]/10 px-4 py-2 text-sm font-medium text-[#6A38C2] transition-colors hover:bg-[#6A38C2]/20"
                                >
                                    <FileText className="h-4 w-4 shrink-0" />
                                    <span className="truncate">{profile?.resumeOriginalName || "View Resume"}</span>
                                </a>
                            ) : <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500">NA</span>
                        }
                    </div>

                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
                className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
                    <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5 sm:px-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6A38C2]/10 text-[#6A38C2]">
                            <Briefcase className="h-5 w-5" />
                        </div>
                        <h1 className="text-lg font-bold text-gray-900">Applied Jobs</h1>
                    </div>
                    <AppliedJObTable />
            </motion.div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}
