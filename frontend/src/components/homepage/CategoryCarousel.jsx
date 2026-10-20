import { motion } from "framer-motion";
import { easeOut, revealOnScroll } from "@/lib/motion";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../ui/carousel";
import {
    ArrowUpRight,
    Cloud,
    Code,
    Database,
    Layers,
    Monitor,
    Palette,
    PenTool,
    Server
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "Frontend Developer", icon: Monitor },
    { name: "Backend Developer", icon: Server },
    { name: "Full Stack Developer", icon: Layers },
    { name: "Data Science", icon: Database },
    { name: "UI/UX Designer", icon: PenTool },
    { name: "DevOps Engineer", icon: Cloud },
    { name: "Software Engineer", icon: Code },
    { name: "Graphic Designer", icon: Palette }
];

const arrowStyles =
    "size-10 border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white";

export const CategoryCarousel = ({ onSelect }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const SearchJobHandler = (query) => {
            dispatch(setSearchedQuery(query))
            navigate("/browse")
    }
    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div {...revealOnScroll} className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-[#6A38C2]">
                        Browse by field
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                        Explore <span className="text-[#6A38C2]">Job Categories</span>
                    </h2>
                    <p className="text-base leading-relaxed text-gray-600">
                        Find the right opportunities and build your career in your field.
                    </p>
                </motion.div>

                <div className="px-10 sm:px-14">
                    <Carousel opts={{ align: "start", loop: true }} className="w-full">
                        <CarouselContent className="py-6">
                            {categories.map(({ name, icon: Icon }, index) => (
                                <CarouselItem
                                    key={name}
                                    className="basis-full sm:basis-1/2 lg:basis-1/4"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: easeOut }}
                                        whileTap={{ scale: 0.97 }}
                                        className="h-full"
                                    >
                                    <button
                                        type="button"
                                        onClick={() => SearchJobHandler(name)}
                                        className="group relative flex h-full w-full cursor-pointer flex-col items-start gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#6A38C2]/40 hover:shadow-xl hover:shadow-[#6A38C2]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A38C2]"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-[#6A38C2]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#6A38C2] transition-transform duration-500 group-hover:scale-x-100"
                                        />

                                        <span className="relative flex size-12 items-center justify-center rounded-xl bg-[#6A38C2]/10 text-[#6A38C2] transition-colors duration-300 group-hover:bg-[#6A38C2] group-hover:text-white">
                                            <Icon className="size-6" strokeWidth={1.75} />
                                        </span>

                                        <span className="relative flex w-full items-end justify-between gap-3">
                                            <span className="text-lg font-semibold leading-snug text-gray-900">
                                                {name}
                                            </span>
                                            <ArrowUpRight className="size-5 shrink-0 -translate-x-1 translate-y-1 text-[#6A38C2] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                                        </span>
                                    </button>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className={arrowStyles} />
                        <CarouselNext className={arrowStyles} />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};
