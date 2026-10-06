import { CompanyTable } from "@/components/company/CompanyTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Companies = () => {
    return(
        <div>
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <Input
                    className="w-fit"
                    placeholder="Filter By Name" 
                    />
                    <Button className="bg-black text-white p-5">New Company</Button>
                </div>
                <CompanyTable />
            </div>
        </div>
    )
}