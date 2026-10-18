import { SlidersHorizontal } from "lucide-react"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR", "Bangalore", "Hyderabad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Devloper", "FullStack Devloper"]
    },
    {
        filterType:"Salary",
        array:["0-40k","42k-1lakh","1lakh to 50lakh"]
    }
]

export const FilterCard = () => {

    return(
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2]">
                    <SlidersHorizontal className="h-4 w-4" />
                </div>
                <h1 className="text-lg font-bold text-gray-900">Filter Jobs</h1>
            </div>
            <hr className="mt-4 border-gray-100" />
            <RadioGroup className="mt-4 gap-6">
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6A38C2]">{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="my-1 flex items-center space-x-3 rounded-lg px-2 py-2 transition-colors hover:bg-[#6A38C2]/5"
                                        >
                                            <RadioGroupItem value={item} className="border-gray-300 text-[#6A38C2] focus-visible:ring-[#6A38C2]/40" />
                                            <Label className="cursor-pointer text-sm font-normal text-gray-700">{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>

    )
}
