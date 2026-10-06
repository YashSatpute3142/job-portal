import { Table, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"

export const CompanyTable = () => {
    return(
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableCaption>A List Of Your Resent Register Companies</TableCaption>

            </Table>
        </div>
    )
}