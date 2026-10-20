import { motion } from "framer-motion";
import { container, easeOut, fadeUp } from "@/lib/motion";
import { Button } from "@base-ui/react";
import { MousePointerClick, Search } from "lucide-react";
import { useColorReveal } from "@/hooks/useColorReveal";
import { useHeroSearch } from "@/hooks/useHeroSearch";

const photoGray = "/assets/bg-no-color.jpg";
const photoColor = "/assets/bg.jpg";

const QUICK_SEARCHES = ["Remote", "Design", "Engineering", "Marketing"];

export const HeroSection = ({ onSearch }) => {
    const { query, handleChange, handleSubmit, handleQuickSearch, handleSearchJob } = useHeroSearch(onSearch);
    const {
        stageRef,
        colorRef,
        glowRef,
        hasClicked,
        maskBase,
        glowStyle,
        handlePointerDown,
        handleKeyDown,
    } = useColorReveal();

    return (
        <section className="relative isolate overflow-hidden bg-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[#6A38C2]/[0.07] blur-3xl"
            />

            <div className="mx-auto grid min-h-[640px] max-w-[1400px] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_1.05fr]">
                <div className="relative z-10 flex items-center px-6 py-14 sm:px-10 lg:py-0 lg:pl-16 lg:pr-0">
                    <motion.div
                        variants={container(0.1, 0.1)}
                        initial="hidden"
                        animate="show"
                        className="flex max-w-xl flex-col gap-6 text-left"
                    >
                        <motion.span variants={fadeUp} className="inline-flex w-fit items-center gap-2 rounded-full border border-[#6A38C2]/15 bg-white/80 px-4 py-2 text-sm font-medium text-[#6A38C2] shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-[#F83002]" />
                            No 1 Job Hunt Website
                        </motion.span>

                        <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            Search, Apply &amp; <br className="hidden sm:block" />
                            Get Your <span className="bg-gradient-to-r from-[#6A38C2] to-[#9b6bf0] bg-clip-text text-transparent">Dream Jobs</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="max-w-md text-base leading-relaxed text-gray-600">
                            Browse thousands of openings from verified companies, apply in a
                            couple of clicks, and track every application in one place.
                        </motion.p>

                        <motion.form
                            variants={fadeUp}
                            onSubmit={handleSubmit}
                            role="search"
                            className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-5 pr-1.5 shadow-xl shadow-[#6A38C2]/10 transition focus-within:border-[#6A38C2] focus-within:ring-4 focus-within:ring-[#6A38C2]/15"
                        >
                            <input
                                type="text"
                                value={query}
                                onChange={handleChange}
                                placeholder="Find your Dream Jobs"
                                aria-label="Search jobs"
                                className="w-full border-none bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                            />
                            <Button
                                type="submit"
                                aria-label="Search"
                                onClick={handleSearchJob}
                                className="flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#6A38C2] text-white transition hover:bg-[#5b2fb0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A38C2] active:scale-95"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </motion.form>

                        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span>Popular:</span>
                            {QUICK_SEARCHES.map((term) => (
                                <button
                                    key={term}
                                    type="button"
                                    onClick={() => handleQuickSearch(term)}
                                    className="cursor-pointer rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-gray-700 transition hover:border-[#6A38C2] hover:text-[#6A38C2] focus-visible:outline-2 focus-visible:outline-[#6A38C2]"
                                >
                                    {term}
                                </button>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
                    className="relative h-[420px] sm:h-[500px] lg:-ml-24 lg:h-auto"
                >
                    <div
                        ref={stageRef}
                        role="button"
                        tabIndex={0}
                        aria-label="Click the photo to reveal it in colour"
                        onPointerDown={handlePointerDown}
                        onKeyDown={handleKeyDown}
                        className="absolute inset-0 cursor-pointer touch-manipulation select-none overflow-hidden outline-none [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_22%,#000_82%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_22%,#000_82%,transparent_100%)] focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#6A38C2]/60 lg:[-webkit-mask-composite:source-in] lg:[mask-composite:intersect] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.5)_14%,#000_34%,#000_86%,transparent_100%),linear-gradient(to_bottom,#000_0%,#000_80%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.5)_14%,#000_34%,#000_86%,transparent_100%),linear-gradient(to_bottom,#000_0%,#000_80%,transparent_100%)]"
                    >
                        <img
                            src={photoGray}
                            alt="Professional on a video call at a laptop in a bright home office"
                            draggable={false}
                            className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
                        />

                        <img
                            ref={colorRef}
                            src={photoColor}
                            alt=""
                            aria-hidden="true"
                            draggable={false}
                            style={maskBase}
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[60%_center]"
                        />

                        <div
                            ref={glowRef}
                            aria-hidden="true"
                            style={glowStyle}
                            className="pointer-events-none absolute inset-0 mix-blend-screen"
                        />
                    </div>

                    <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 text-xs font-medium text-gray-800 shadow-lg backdrop-blur transition-all duration-500 ${
                            hasClicked ? "translate-y-2 opacity-0" : "opacity-100"
                        }`}
                    >
                        <MousePointerClick className="h-4 w-4 text-[#6A38C2]" />
                        Click the photo to add colour
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
