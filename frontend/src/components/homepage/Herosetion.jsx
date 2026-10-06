import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@base-ui/react";
import { MousePointerClick, Search } from "lucide-react";

// Images live in frontend/public/assets, so they are referenced by URL.
const photoGray = "/assets/bg-no-color.jpg";
const photoColor = "/assets/bg.jpg";

const PURPLE = "106, 56, 194"; // #6A38C2 as rgb
const DURATION = 1100; // ms for one ripple to expand
const HOLD = 1500; // ms the colour stays fully open
const CLOSE = 3200; // ms for the colour to slowly close back to grayscale
const BASE_RADIUS = 120; // first click reveal size (px)
const STEP_RADIUS = 70; // each further click is this much larger
const MAX_REVEALS = 16;
const EMPTY_MASK = "linear-gradient(transparent, transparent)";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const QUICK_SEARCHES = ["Remote", "Design", "Engineering", "Marketing"];

export const HeroSection = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [hasClicked, setHasClicked] = useState(false);

    const stageRef = useRef(null);
    const colorRef = useRef(null);
    const glowRef = useRef(null);
    const revealsRef = useRef([]);
    const clickCountRef = useRef(0);
    const rafRef = useRef(null);

    const setMask = (el, value) => {
        if (!el) return;
        el.style.maskImage = value;
        el.style.webkitMaskImage = value;
    };

    // Paints every reveal as one radial mask (colour photo) and one ring mask (glow).
    const draw = useCallback((now) => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const colorMasks = [];
        const glowMasks = [];

        // Drop reveals that have fully closed.
        revealsRef.current = revealsRef.current.filter(
            (rv) => now - rv.start < DURATION + HOLD + CLOSE
        );
        const animating = revealsRef.current.length > 0;
        // Once everything has closed, the next click starts small again.
        if (!animating) clickCountRef.current = 0;

        revealsRef.current.forEach((rv) => {
            const elapsed = reduceMotion ? DURATION : now - rv.start;
            const t = Math.min(1, elapsed / DURATION); // opening progress
            const c = Math.min(1, Math.max(0, (elapsed - DURATION - HOLD) / CLOSE)); // closing progress

            // Open with an ease-out, then collapse gently with an ease-in-out.
            const r = rv.to * easeOutCubic(t) * (1 - easeInOutCubic(c));
            if (r < 0.5) return;

            // Soft feathered edge so the colour dissolves into the grayscale.
            colorMasks.push(
                `radial-gradient(circle at ${rv.x}px ${rv.y}px, #000 ${Math.max(0, r - 10)}px, transparent ${r}px)`
            );

            // Glow is brightest while the wave travels, rests as a faint rim, then fades as it closes.
            const alpha = (0.16 + 0.6 * (1 - t)) * (1 - 0.6 * c);
            glowMasks.push(
                `radial-gradient(circle at ${rv.x}px ${rv.y}px, transparent ${Math.max(0, r - 18)}px, rgba(0,0,0,${alpha.toFixed(3)}) ${r}px, transparent ${r + 26}px)`
            );
        });

        setMask(colorRef.current, colorMasks.length ? colorMasks.join(",") : EMPTY_MASK);
        setMask(glowRef.current, glowMasks.length ? glowMasks.join(",") : EMPTY_MASK);

        rafRef.current = animating ? requestAnimationFrame(draw) : null;
    }, []);

    const reveal = useCallback(
        (x, y) => {
            const rect = stageRef.current.getBoundingClientRect();
            const diagonal = Math.hypot(rect.width, rect.height);

            clickCountRef.current += 1;
            const to = Math.min(BASE_RADIUS + (clickCountRef.current - 1) * STEP_RADIUS, diagonal);

            revealsRef.current.push({ x, y, to, start: performance.now() });
            if (revealsRef.current.length > MAX_REVEALS) revealsRef.current.shift();

            setHasClicked(true);
            if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
        },
        [draw]
    );

    const handlePointerDown = (e) => {
        const rect = stageRef.current.getBoundingClientRect();
        reveal(e.clientX - rect.left, e.clientY - rect.top);
    };

    // Keyboard users get the same effect from the centre of the photo.
    const handleKeyDown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        const rect = stageRef.current.getBoundingClientRect();
        reveal(rect.width / 2, rect.height / 2);
    };

    useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(query.trim());
    };

    const maskBase = {
        WebkitMaskImage: EMPTY_MASK,
        maskImage: EMPTY_MASK,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
    };

    return (
        <section className="relative isolate overflow-hidden bg-white">
            <div className="mx-auto grid min-h-[640px] max-w-[1400px] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_1.05fr]">
                {/* ───────── Left: content ───────── */}
                <div className="relative z-10 flex items-center px-6 py-14 sm:px-10 lg:py-0 lg:pl-16 lg:pr-0">
                    <div className="flex max-w-xl flex-col gap-6 text-left">
                        <span className="w-fit rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-[#F83002]">
                            No 1 Job Hunt Website
                        </span>

                        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            Search, Apply &amp; <br className="hidden sm:block" />
                            Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
                        </h1>

                        <p className="max-w-md text-base leading-relaxed text-gray-600">
                            Browse thousands of openings from verified companies, apply in a
                            couple of clicks, and track every application in one place.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            role="search"
                            className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-5 pr-1.5 shadow-lg shadow-gray-200/60 transition focus-within:border-[#6A38C2] focus-within:ring-4 focus-within:ring-[#6A38C2]/15"
                        >
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Find your Dream Jobs"
                                aria-label="Search jobs"
                                className="w-full border-none bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                            />
                            <Button
                                type="submit"
                                aria-label="Search"
                                className="flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#6A38C2] text-white transition hover:bg-[#5b2fb0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A38C2] active:scale-95"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </form>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span>Popular:</span>
                            {QUICK_SEARCHES.map((term) => (
                                <button
                                    key={term}
                                    type="button"
                                    onClick={() => {
                                        setQuery(term);
                                        onSearch?.(term);
                                    }}
                                    className="cursor-pointer rounded-full border border-gray-200 px-3 py-1 text-gray-700 transition hover:border-[#6A38C2] hover:text-[#6A38C2] focus-visible:outline-2 focus-visible:outline-[#6A38C2]"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ───────── Right: diagonal photo ───────── */}
                <div className="relative h-[380px] sm:h-[460px] lg:h-auto">
                    {/* Purple edge peeking out along the slant */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#6A38C2] [clip-path:polygon(0_6%,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(12.5%_0,100%_0,100%_100%,-3.5%_100%)]"
                    />

                    <div
                        ref={stageRef}
                        role="button"
                        tabIndex={0}
                        aria-label="Click the photo to reveal it in colour"
                        onPointerDown={handlePointerDown}
                        onKeyDown={handleKeyDown}
                        className="absolute inset-0 cursor-pointer touch-manipulation select-none overflow-hidden outline-none [clip-path:polygon(0_9%,100%_3%,100%_100%,0_100%)] focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#6A38C2]/60 lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]"
                    >
                        {/* 1 · grayscale base */}
                        <img
                            src={photoGray}
                            alt="Professional on a video call at a laptop in a bright home office"
                            draggable={false}
                            className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
                        />

                        {/* 2 · colour photo, only visible inside the ripple masks */}
                        <img
                            ref={colorRef}
                            src={photoColor}
                            alt=""
                            aria-hidden="true"
                            draggable={false}
                            style={maskBase}
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[60%_center]"
                        />

                        {/* 3 · purple glow riding the leading edge of each ripple */}
                        <div
                            ref={glowRef}
                            aria-hidden="true"
                            style={{ ...maskBase, backgroundColor: `rgb(${PURPLE})`, filter: "blur(6px)" }}
                            className="pointer-events-none absolute inset-0 mix-blend-screen"
                        />

                        {/* Hint, disappears after the first click */}
                        <div
                            aria-hidden="true"
                            className={`pointer-events-none absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-medium text-gray-800 shadow-lg backdrop-blur transition-all duration-500 ${
                                hasClicked ? "translate-y-2 opacity-0" : "opacity-100"
                            }`}
                        >
                            <MousePointerClick className="h-4 w-4 text-[#6A38C2]" />
                            Click the photo to add colour
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
