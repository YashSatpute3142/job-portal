import { updateCompany } from "@/api/companyApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import { useGetCompanyById } from "@/hooks/useGetCompanyById"
import { ArrowLeft, Building2, ImagePlus, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const inputClass =
    "h-11 rounded-lg border-gray-200 bg-white focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2] disabled:cursor-not-allowed disabled:opacity-60"
const labelClass = "mb-2 block text-sm font-medium text-gray-700"

export const CompanySetup = () => {
    const params = useParams()
    const Id = params.id;

    useGetCompanyById(Id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("")
    const navigate = useNavigate()

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
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null,
        })
    }, [singleCompany])

    useEffect(() => {
        if (typeof File !== "undefined" && input.file instanceof File) {
            const url = URL.createObjectURL(input.file)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
        setPreviewUrl("")
    }, [input.file])

    const currentLogo = singleCompany?.logo
    const displayedLogo = previewUrl || currentLogo
    const fileName = typeof File !== "undefined" && input.file instanceof File ? input.file.name : ""

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <form onSubmit={submithandler}>
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            className="w-fit gap-2 rounded-full border-gray-200 bg-white px-4 font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
                            variant="outline"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back</span>
                        </Button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Company Settings</h1>
                            <p className="mt-1 text-sm text-gray-500">Update your company information and logo so job seekers see accurate details.</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <Label htmlFor="company-name" className={labelClass}>Company Name</Label>
                                <Input
                                    id="company-name"
                                    type="text"
                                    name="name"
                                    className={inputClass}
                                    placeholder="Company name"
                                    value={input.name}
                                    disabled={loading}
                                    onChange={changeEventhandler}
                                />
                            </div>
                            <div>
                                <Label htmlFor="company-description" className={labelClass}>Description</Label>
                                <Input
                                    id="company-description"
                                    type="text"
                                    name="description"
                                    className={inputClass}
                                    placeholder="What does your company do?"
                                    value={input.description}
                                    disabled={loading}
                                    onChange={changeEventhandler}
                                />
                            </div>
                            <div>
                                <Label htmlFor="company-website" className={labelClass}>Website</Label>
                                <Input
                                    id="company-website"
                                    type="text"
                                    name="website"
                                    className={inputClass}
                                    placeholder="https://example.com"
                                    value={input.website}
                                    disabled={loading}
                                    onChange={changeEventhandler}
                                />
                            </div>
                            <div>
                                <Label htmlFor="company-location" className={labelClass}>Location</Label>
                                <Input
                                    id="company-location"
                                    type="text"
                                    name="location"
                                    className={inputClass}
                                    placeholder="City, Country"
                                    value={input.location}
                                    disabled={loading}
                                    onChange={changeEventhandler}
                                />
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <Label className={labelClass}>Company Logo</Label>
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                                    {displayedLogo ? (
                                        <img src={displayedLogo} alt="Company logo preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <Building2 className="h-9 w-9 text-gray-300" />
                                    )}
                                </div>
                                <label
                                    htmlFor="company-logo"
                                    className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 px-4 py-6 text-center transition-colors hover:border-[#6A38C2]/50 hover:bg-[#6A38C2]/5"
                                >
                                    <ImagePlus className="mb-2 h-6 w-6 text-[#6A38C2]" />
                                    <span className="text-sm font-medium text-gray-700">
                                        {fileName || "Click to upload a new logo"}
                                    </span>
                                    <span className="mt-1 text-xs text-gray-400">PNG, JPG or WEBP image</span>
                                    <Input
                                        id="company-logo"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        disabled={loading}
                                        onChange={changeFilehandler}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                onClick={() => navigate("/admin/companies")}
                                className="h-11 rounded-full border-gray-200 px-6 text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-60"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-11 rounded-full bg-[#6A38C2] px-8 text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
