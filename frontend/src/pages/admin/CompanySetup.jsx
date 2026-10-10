import { updateCompany } from "@/api/companyApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

export const CompanySetup = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false);
    const params = useParams()
    const navigate = useNavigate()
    const Id = params.id;

    const changeEventhandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFilehandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }
    const submithandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await updateCompany({ id: Id, formData })
            if (res.data.success) {
                toast.add({
                    title: "Success",
                    description: res.data.message,
                    type: "success",
                });
                navigate(`/admin/companies`)
            }
        } catch (error) {
            console.error("Company registration error:", error);

            toast.add({
                title: "Error",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
            });
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        })
    },[singleCompany])

    return (
        <div>
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submithandler}>
                    <div className="flex items-center gap-5 p-8 ">
                        <Button onClick={() => navigate("/admin/companies")} className="flex items-center gap-2 text-gray-500 font-semibold" variant="outline">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-3">Company Name :</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label className="mb-3">Description :</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label className="mb-3">Website :</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div>
                            <Label className="mb-3">Location :</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventhandler}
                            />
                        </div>
                        <div className="mb-8">
                            <Label className="mb-3">Logo :</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFilehandler}
                            />
                        </div>

                    </div>

                    {
                        loading ? <button className="m-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait </button> : <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800"
                        >
                            Update
                        </Button>
                    }

                </form>
            </div>
        </div>
    )
}