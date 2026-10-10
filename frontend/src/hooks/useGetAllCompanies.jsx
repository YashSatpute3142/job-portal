import { getAllCompanies } from "@/api/companyApi"
import { setCompanies} from "@/redux/companySlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getAllCompanies()
                
                if (res.data.success) {
                    
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.error(error);

            }
        }
        fetchCompanies()
    }, [])
}