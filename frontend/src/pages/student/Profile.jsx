import AppliedJObTable from "@/components/profile/appliedJobTAble"
import { UpdateProfileDialog } from "@/components/profile/UpdateProfileDialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Contact, Mail, Pen } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"


const isResume = true;

export const Profile = () => {
    const [open , setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const{fullName,email,phoneNumber,profile} = user

    return (
        <div>
            <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="https://png.pngtree.com/recommend-works/png-clipart/20241009/ourmid/pngtree-cool-blue-dragon-logo-png-image_14012110.png"
                            />

                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{fullName}</h1>
                            <p>{profile.bio}</p>
                        </div>

                    </div>
                    <Button onClick ={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact/>
                        <span>{phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">
                        {
                           profile?.skills.length !== 0 ? profile?.skills.map((item,index) => <Badge>{item}</Badge>) :  <span>DO work Man</span>
                        }
                    </div>
                    
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font -bold">Resume</Label>
                    {
                        isResume ? <a href={profile?.resume} target="blank" className="text-blue-500 hover:underline cursor-pointer">{profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
                
            </div>
            <div className="max-w-7xl mx-auto bg-white rounded-2xl">
                    <h1 className="font-bold text-lg  my-5">Applied Jobs</h1>
                    <AppliedJObTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}