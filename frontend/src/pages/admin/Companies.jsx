import { CompanyTable } from "@/components/company/CompanyTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

export const Companies = () => {
    const navigate = useNavigate()
    return(
        <div>
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <Input
                    className="w-fit"
                    placeholder="Filter By Name" 
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className="bg-black text-white p-5">New Company</Button>
                </div>
                <CompanyTable />
            </div>
        </div>
    )
}