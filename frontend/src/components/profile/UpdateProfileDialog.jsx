import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Loader2, UserPen } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { updateProile } from "@/api/userApi"
import { setUser } from "@/redux/authSlice"
import { toast } from "../ui/toast"

const inputClass =
    "h-11 w-full rounded-lg border-gray-200 bg-white focus-visible:border-[#6A38C2] focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0"
const labelClass = "mb-2 block text-sm font-medium text-gray-700"

export const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false);
    const{user} = useSelector(store=>store.auth);
    const [input, setInput] = useState({
        fullName:user?.fullName,
        email:user?.email,
        phoneNumber: user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file: null
    })

    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }
    const fileChangehandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file})
    }
    const submithandler = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log("UPDATE BUTTON CLICKED");
    console.log("FILE SELECTED:", input.file);

        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills", input.skills);
        if(input.file){
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await updateProile(formData);
            if(res.data.success){
                dispatch(setUser(res.data.user))
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

        }finally{
            setLoading(false)
        }

    }

    return(
        <div>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-0 shadow-2xl sm:max-w-lg" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className="border-b border-gray-100 bg-gradient-to-b from-[#6A38C2]/5 to-white px-6 pb-5 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6A38C2]/10 text-[#6A38C2]">
                                <UserPen className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <DialogTitle className="text-xl font-bold text-gray-900">Update Profile</DialogTitle>
                                <p className="mt-0.5 text-sm text-gray-500">Keep your details and resume up to date.</p>
                            </div>
                        </div>
                    </DialogHeader>
                    <form onSubmit={submithandler} className="px-6 pb-6">
                        <div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <Label htmlFor="name" className={labelClass}>Name</Label>
                                <Input
                                id="name"
                                name="fullName"
                                type="text"
                                value={input.fullName}
                                onChange={changeEventHandler}
                                className={inputClass}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className={labelClass}>Email</Label>
                                <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className={inputClass}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber" className={labelClass}>Phone No</Label>
                                <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className={inputClass}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <Label htmlFor="bio" className={labelClass}>Bio</Label>
                                <Input
                                id="bio"
                                name="bio"
                                placeholder="A short line about you"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className={inputClass}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <Label htmlFor="skills" className={labelClass}>Skills</Label>
                                <Input
                                id="skills"
                                name="skills"
                                placeholder="React, Node.js, MongoDB"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className={inputClass}
                                />
                                <p className="mt-1.5 text-xs text-gray-400">Separate skills with commas.</p>
                            </div>
                            <div className="sm:col-span-2">
                                <Label htmlFor="file" className={labelClass}>Resume</Label>
                                <Input
                                id="file"
                                name="file"
                                type="file"
                                onChange={fileChangehandler}
                                accept="application/pdf"
                                className="block h-auto w-full cursor-pointer rounded-lg border-gray-200 bg-white py-2 pl-2 pr-3 text-sm text-gray-500 file:mr-3 file:h-9 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#6A38C2] file:px-4 file:py-0 file:text-sm file:font-medium file:leading-9 file:text-white hover:file:bg-[#5b2fb0] focus-visible:border-[#6A38C2] focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0"
                                />
                                <p className="mt-1.5 text-xs text-gray-400">PDF files only.</p>
                            </div>
                        </div>
                        <DialogFooter className="border-t border-gray-100 pt-5">
                            {
                             loading ? <button className="flex h-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-[#6A38C2]/70 font-medium text-white"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait </button> : <Button
                                type="submit"
                                className="h-11 w-full rounded-full bg-[#6A38C2] text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40 active:scale-95"
                            >
                                Update
                            </Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
