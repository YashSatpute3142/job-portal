import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CompanyTable = () => {

    const { companies } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    
    

    return (
        <div>
            <Table>
                <TableCaption>A List Of Your Resent Register Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right cursor-pointer">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companies?.map((company) => {
                            const { name, createdAt,logo } = company
                            return (
                               <tr key={company._id}>
                                <TableCell>
                                        <Avatar>
                                            <AvatarImage src={logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover className="text-black">
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div className="flex items-center gap-2 w-fit cursor-pointer">
                                                    <Edit2 className="w-4" />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                               </tr>
                                    
                                
                            )
                        })
                    }

                </TableBody>

            </Table>
        </div>
    )
}