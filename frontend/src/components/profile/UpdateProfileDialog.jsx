import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { updateProile } from "@/api/userApi"
import { setUser } from "@/redux/authSlice"
import { toast } from "../ui/toast"

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
                <DialogContent className="sm:max-w-106.25 bg-white " onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submithandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name:</Label>
                                <Input
                                id="name"
                                name="fullName"
                                type="text"
                                value={input.fullName}
                                onChange={changeEventHandler}
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email:</Label>
                                <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="text-right">Phone No:</Label>
                                <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Bio:</Label>
                                <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Skills:</Label>
                                <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">Resume:</Label>
                                <Input
                                id="file"
                                name="file"
                                type="file"
                                onChange={fileChangehandler}
                                accept="application/pdf"
                                className="col-span-3" 
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                             loading ? <button className="m-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait </button> : <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-gray-800"
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