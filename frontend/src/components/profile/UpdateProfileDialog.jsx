import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"

export const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, isLoading] = useState(false);
    return(
        <div>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent className="sm:max-w-[425px] bg-white " onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name:</Label>
                                <Input
                                id="name"
                                name="name"
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email:</Label>
                                <Input
                                id="email"
                                name="email"
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="text-right">Phone No:</Label>
                                <Input
                                id="number"
                                name="number"
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Bio:</Label>
                                <Input
                                id="bio"
                                name="bio"
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Skills:</Label>
                                <Input
                                id="skills"
                                name="skills"
                                className="col-span-3" 
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">Resume:</Label>
                                <Input
                                id="file"
                                name="file"
                                type="file"
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