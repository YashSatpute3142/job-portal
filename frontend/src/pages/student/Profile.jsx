import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Contact, Mail, Pen } from "lucide-react"

const skills = ["html", "css", "js", "react", "node", "express"]

export const Profile = () => {
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
                            <h1 className="font-medium text-xl">Full Name</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam a in reiciendis.</p>
                        </div>

                    </div>
                    <Button className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>yash@mail.com</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact/>
                        <span>89674523</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">
                        {
                           skills.length !== 0 ? skills.map((item,index) => <Badge>{item}</Badge>) :  <span>DO work Man</span>
                        }
                    </div>
                    
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font -bold">Resume</Label>
                </div>
            </div>
        </div>
    )
}