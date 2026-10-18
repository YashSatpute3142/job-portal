import { getAllAplicants } from "@/api/applicationApi"
import { ApplicantsTable } from "@/components/jobs/ApplicantsTable"
import { setAllApplicants } from "@/redux/ApplicationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const Applicants = () => {
    const params = useParams()
    const Id = params.id;
    const dispatch = useDispatch()
    const {applicants} = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllAplicants = async() => {
            try {
                const res =await getAllAplicants(Id)
                if( res.data.success){
                    dispatch(setAllApplicants((await res).data.job))
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchAllAplicants()
    },[])

    return(
        <div>
            <div className="max-w-7xl mx-auto">
                <h1>Applicants: {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}