import { useCallback, useEffect, useRef, useState } from "react";

const PURPLE = "106, 56, 194";
const DURATION = 1100;
const HOLD = 1500;
const CLOSE = 3200;
const BASE_RADIUS = 120;
const STEP_RADIUS = 70;
const MAX_REVEALS = 16;
const EMPTY_MASK = "linear-gradient(transparent, transparent)";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const setMask = (el, value) => {
    if (!el) return;
    el.style.maskImage = value;
    el.style.webkitMaskImage = value;
};

const maskBase = {
    WebkitMaskImage: EMPTY_MASK,
    maskImage: EMPTY_MASK,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
};

const glowStyle = {
    ...maskBase,
    backgroundColor: `rgb(${PURPLE})`,
    filter: "blur(6px)",
};

export const useColorReveal = () => {
    const [hasClicked, setHasClicked] = useState(false);

    const stageRef = useRef(null);
    const colorRef = useRef(null);
    const glowRef = useRef(null);
    const revealsRef = useRef([]);
    const clickCountRef = useRef(0);
    const rafRef = useRef(null);

    const draw = useCallback((now) => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const colorMasks = [];
        const glowMasks = [];

        revealsRef.current = revealsRef.current.filter(
            (rv) => now - rv.start < DURATION + HOLD + CLOSE
        );
        const animating = revealsRef.current.length > 0;
        if (!animating) clickCountRef.current = 0;

        revealsRef.current.forEach((rv) => {
            const elapsed = reduceMotion ? DURATION : now - rv.start;
            const t = Math.min(1, elapsed / DURATION);
            const c = Math.min(1, Math.max(0, (elapsed - DURATION - HOLD) / CLOSE));

            const r = rv.to * easeOutCubic(t) * (1 - easeInOutCubic(c));
            if (r < 0.5) return;

            colorMasks.push(
                `radial-gradient(circle at ${rv.x}px ${rv.y}px, #000 ${Math.max(0, r - 10)}px, transparent ${r}px)`
            );

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

    const handleKeyDown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        const rect = stageRef.current.getBoundingClientRect();
        reveal(rect.width / 2, rect.height / 2);
    };

    useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

    return {
        stageRef,
        colorRef,
        glowRef,
        hasClicked,
        maskBase,
        glowStyle,
        handlePointerDown,
        handleKeyDown,
    };
};
