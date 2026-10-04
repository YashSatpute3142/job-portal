import { CategoryCarousel } from "@/components/homepage/CategoryCarousel"
import { HeroSection } from "@/components/homepage/Herosetion"
import { LatestJobs } from "@/components/homepage/LatestJobs"
import { useGetAllJobs } from "@/hooks/useGetAllJobs"


export const Home = () => {
    useGetAllJobs()
    return (
        <>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        </>
    )
}