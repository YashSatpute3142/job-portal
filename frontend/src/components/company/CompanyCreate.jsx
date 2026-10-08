import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export const CompanyCreate = () => {
    const navigate = useNavigate()
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
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick= {() => navigate("/admin/companies")}>Cancel</Button>
                    <Button className="text-white bg-black p-5" onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}