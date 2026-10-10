import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { addNewCompany } from "@/api/companyApi"
import { useDispatch } from "react-redux"
import { setSingleCompany  } from "@/redux/companySlice"
import { toast } from "../ui/toast"

export const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()

    const registerCompany = async() => {
        try {
    const res = await addNewCompany({ companyName });

    if (res.data?.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.add({
            title: "Success",
            description: res.data.message,
            type: "success",
        });

        const companyId = res.data.company?._id;

        if (companyId) {
            navigate(`/admin/companies/${companyId}`);
        }
    }
} catch (error) {
    console.error("Company registration error:", error);

    toast.add({
        title: "Error",
        description:
            error.response?.data?.message || "Something went wrong",
        type: "error",
    });
}
    }

    return(
        <div>
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magni quia nemo, incidunt illo reprehenderit?</p>  
                </div>
                
                <Label>Company Name</Label>
                <Input
                type="text"
                className="my-2"
                placeholder="jobHunt, Microsoft etc" 
                onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick= {() => navigate("/admin/companies")}>Cancel</Button>
                    <Button className="text-white bg-black p-5" onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}