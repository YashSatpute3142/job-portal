import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { addNewCompany } from "@/api/companyApi"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
import { toast } from "../ui/toast"
import { Building2, Loader2 } from "lucide-react"

export const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const registerCompany = async () => {
        if (loading) return

        if (!companyName || !companyName.trim()) {
            toast.add({
                title: "Error",
                description: "Please enter a company name",
                type: "error",
            });
            return
        }

        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="mb-8 text-center sm:text-left">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6A38C2]/10 text-[#6A38C2] sm:mx-0">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Register Your Company</h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        Start by giving your company a name. You can add a logo, description, website and location in the next step.
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        registerCompany()
                    }}
                    className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
                >
                    <Label htmlFor="company-name" className="mb-2 block text-sm font-medium text-gray-700">Company Name</Label>
                    <Input
                        id="company-name"
                        type="text"
                        className="h-11 rounded-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2] disabled:cursor-not-allowed disabled:opacity-60"
                        placeholder="jobHunt, Microsoft etc"
                        value={companyName}
                        disabled={loading}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <p className="mt-2 text-xs text-gray-400">This name will be visible to job seekers on your listings.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
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
                            className="h-11 rounded-full bg-[#6A38C2] px-6 text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Continue"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
