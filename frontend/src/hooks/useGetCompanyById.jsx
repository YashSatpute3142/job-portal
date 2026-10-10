import { setSingleCompany } from "@/redux/companySlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await getCompanyById(companyId)
                
                if (res.data.success) {
                    
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.error(error);

            }
        }
        fetchSingleCompany()
    }, [companyId, dispatch])
}