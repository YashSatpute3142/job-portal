import { Bookmark } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

export const Job = () => {
    return(
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 mt-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            
            <div className="flex items-center gap-2 my-2">
                <Button className="ml-0">
                    <Avatar>
                        <AvatarImage 
                          src="https://png.pngtree.com/recommend-works/png-clipart/20241009/ourmid/pngtree-cool-blue-dragon-logo-png-image_14012110.png"
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">Company Name</h1>
                     <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">Title</h1>
                <p className="text-sm text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem impedit odio et nam aperiam doloribus cupiditate perferendis rem aspernatur maiores.</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'text-blue-700 font-bold'} variant="ghost" >12 Position</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full Time</Badge> 
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>  
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button variant="outline">Details</Button>
                <Button className="bg-[#7209b7] text-white">Save For Later</Button>
            </div>
        </div>
    )
}