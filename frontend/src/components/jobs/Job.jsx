import { Bookmark } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"

export const Job = ({job}) => {
    const navigate = useNavigate();
    
    const {company,title,description,position,jobType,salary, createdAt} = job
    const daysFunction = (mongoDBTime) => {
        const createdDate = new Date(mongoDBTime);
        const currentTime = new Date();
        const timeDifferance = currentTime - createdDate
        return Math.floor(timeDifferance/(1000*24*60*60))
    }
    return(
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 mt-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{daysFunction(createdAt) === 0 ? "Today" : `${daysFunction(createdAt)} days ago`}</p>
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
                    <h1 className="font-medium text-lg">{company?.name}</h1>
                     <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'text-blue-700 font-bold'} variant="ghost" >{position} Position</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{jobType}</Badge> 
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{salary}LPA</Badge>  
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() =>navigate(`/description/${job._id}`) } variant="outline">Details</Button>
                <Button className="bg-[#7209b7] text-white">Save For Later</Button>
            </div>
        </div>
    )
}