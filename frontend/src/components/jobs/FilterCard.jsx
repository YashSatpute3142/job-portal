import { SlidersHorizontal, X } from "lucide-react"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"

const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR", "Bangalore", "Hyderabad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    },
    {
        filterType:"Salary",
        array:["0-5 LPA","5-10 LPA","10-20 LPA","20+ LPA"]
    }
]

export const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch()

    const changeHandleChange = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))

    },[selectedValue])

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    },[])

    return(
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2]">
                        <SlidersHorizontal className="h-4 w-4" />
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">Filter Jobs</h1>
                </div>
                {
                    selectedValue && (
                        <button
                            type="button"
                            onClick={() => setSelectedValue("")}
                            className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                        >
                            <X className="h-3 w-3" />
                            Clear
                        </button>
                    )
                }
            </div>
            <hr className="mt-4 border-gray-100" />
            <RadioGroup value={selectedValue} onValueChange={changeHandleChange} className="mt-4 gap-6">
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6A38C2]">{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `r${index}-${idx}`
                                    return (
                                        <div
                                            key={idx}
                                            className="my-1 flex items-center space-x-3 rounded-lg px-2 py-2 transition-colors hover:bg-[#6A38C2]/5"
                                        >
                                            <RadioGroupItem value={item} id={itemId} className="border-gray-300 bg-white text-[#6A38C2] transition-colors focus-visible:ring-[#6A38C2]/40 aria-checked:border-[#6A38C2] aria-checked:bg-[#6A38C2] aria-checked:shadow-[inset_0_0_0_3px_#ffffff] data-[checked]:border-[#6A38C2] data-[checked]:bg-[#6A38C2] data-[checked]:shadow-[inset_0_0_0_3px_#ffffff] data-[state=checked]:border-[#6A38C2] data-[state=checked]:bg-[#6A38C2] data-[state=checked]:shadow-[inset_0_0_0_3px_#ffffff] [&_svg]:hidden" />
                                            <Label htmlFor={itemId} className="cursor-pointer text-sm font-normal text-gray-700">{item}</Label>
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
