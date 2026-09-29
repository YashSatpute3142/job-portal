import { CategoryCarousel } from "@/components/homepage/CategoryCarousel"
import { HeroSection } from "@/components/homepage/Herosetion"
import { LatestJobs } from "@/components/homepage/LatestJobs"


export const Home = () => {
    return (
        <>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        </>
    )
}