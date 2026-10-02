import { Badge } from "../ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
const AppliedJObTable = () => {
    return(
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4,5].map((item,index) => (
                            <TableRow key={index}>
                                <TableCell>17-06-2026</TableCell>
                                <TableCell>Frontend dev</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right"><Badge className="bg-black rounded-full text-white">Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJObTable;