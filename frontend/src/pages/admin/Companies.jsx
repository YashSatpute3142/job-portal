import { CompanyTable } from "@/components/company/CompanyTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Companies = () => {
    useGetAllCompanies()
    const [input, setinput] =useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    },[input])

    return(
        <div>
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <Input
                    className="w-fit"
                    placeholder="Filter By Name" 
                    onChange={(e) => setinput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className="bg-black text-white p-5">New Company</Button>
                </div>
                <CompanyTable />
            </div>
        </div>
    )
}