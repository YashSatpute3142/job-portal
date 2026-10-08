import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export const CompanyTable = () => {
    return(
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
                    <TableCell>
                        <Avatar>
                            <AvatarImage src=""/>
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>21-2-2026</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover className="text-black">
                            <PopoverTrigger>
                                <MoreHorizontal />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className="flex items-center gap-2 w-fit cursor-pointer">
                                    <Edit2 className="w-4"/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableBody>

            </Table>
        </div>
    )
}