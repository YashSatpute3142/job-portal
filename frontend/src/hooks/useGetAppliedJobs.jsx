import { getAppiedJobs } from "@/api/applicationApi";
import { setAllApliedJobs } from "@/redux/jobSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

export  const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async() => {
            try {
                const res = await getAppiedJobs();
                if(res.data.success){
                    dispatch(setAllApliedJobs((await res).data.application));
                    
                    console.log(res.data);
                    
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchAppliedJobs();
    },[])
}