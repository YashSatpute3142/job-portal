import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { setStatus } from "@/api/applicationApi"
import { toast } from "../ui/toast"
const ShortlistingStatus = ["accepted", "rejected"]
export const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const statushandler = async (status, id) => {
        try {
            const res = await setStatus({ status, id });
            if (res.data.success) {
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

        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A List of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contanct</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                <TableCell>{item?.applicant?.email}/</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item?.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blanck">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                ShortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() =>statushandler(status, item?._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })

                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }

                    <TableCell></TableCell>
                </TableBody>

            </Table>
        </div>
    )
}