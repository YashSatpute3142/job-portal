import { CategoryCarousel } from "@/components/homepage/CategoryCarousel"
import { HeroSection } from "@/components/homepage/Herosetion"
import { LatestJobs } from "@/components/homepage/LatestJobs"
import { useGetAllJobs } from "@/hooks/useGetAllJobs"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export const Home = () => {
    useGetAllJobs()
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate()
    useEffect(() => {
        if(user?.role === "recruiter"){
            navigate("/admin/companies")
        }
    },[])
    return (
        <>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        </>
    )
}