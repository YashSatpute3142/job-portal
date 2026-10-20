import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { loginUser } from "@/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export const Login = () => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const [isHovering, setIsHovering] = useState(false);

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const {loading} = useSelector(store=> store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

   const submitHamdler = async (e) => {
    e.preventDefault();
    try {
        dispatch(setLoading(true))
        const res = await loginUser(input);

        if (res.data.success) {
            dispatch(setUser(res.data.user))
            toast.add({
                title: "Success",
                description: res.data.message,
                type: "success",
            });

            navigate("/");
        }
    } catch (error) {
        console.error(error);

        toast.add({
            title: "Error",
            description:
                error.response?.data?.message || "Something went wrong",
            type: "error",
        });
    }finally{
        dispatch(setLoading(false))
    }
};
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-[#6A38C2]/5 via-gray-50 to-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
                <div className="flex items-center gap-12 lg:gap-16">
                    <div className="hidden w-1/2 items-center justify-center lg:flex">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: easeOut }}
                            className="relative w-full max-w-md cursor-crosshair overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-xl shadow-[#6A38C2]/10"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <img
                                src="/assets/signup-gray.png"
                                alt="Sign Up"
                                className="w-full object-contain"
                            />

                            <img
                                src="/assets/signup-color.png"
                                alt="Sign Up"
                                className="pointer-events-none absolute inset-0 h-full w-full object-contain p-4"
                                style={{
                                    clipPath: isHovering
                                        ? `circle(100px at ${mousePosition.x}px ${mousePosition.y}px)`
                                        : "circle(0px at 0px 0px)",
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="mx-auto w-full max-w-md lg:w-1/2 lg:max-w-none">
                        <motion.form
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
                            onSubmit={submitHamdler}
                            className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
                        >
                            <span className="mb-4 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-[#6A38C2]">
                                Welcome back
                            </span>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Login
                            </h1>
                            <p className="mb-8 mt-2 text-sm text-gray-500">
                                Sign in to continue searching and applying for your dream jobs.
                            </p>

                            <div className="mb-5">
                                <Label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="xyz@gmail.com"
                                    className="h-11 rounded-lg border-gray-200 bg-white focus-visible:border-[#6A38C2] focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div className="mb-5">
                                <Label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="h-11 rounded-lg border-gray-200 bg-white focus-visible:border-[#6A38C2] focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div className="mb-8">
                                <Label className="mb-3 block text-sm font-medium text-gray-700">
                                    Role
                                </Label>

                                <div className="grid grid-cols-2 gap-3">
                                    <motion.label
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                            input.role === "student"
                                                ? "border-[#6A38C2] bg-[#6A38C2]/5 text-[#6A38C2]"
                                                : "border-gray-200 text-gray-700 hover:border-[#6A38C2]/40 hover:bg-gray-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            className="h-4 w-4 cursor-pointer accent-[#6A38C2]"
                                            checked={input.role === "student"}
                                            onChange={changeEventHandler}
                                        />

                                        <span>
                                            Student
                                        </span>
                                    </motion.label>

                                    <motion.label
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                            input.role === "recruiter"
                                                ? "border-[#6A38C2] bg-[#6A38C2]/5 text-[#6A38C2]"
                                                : "border-gray-200 text-gray-700 hover:border-[#6A38C2]/40 hover:bg-gray-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            className="h-4 w-4 cursor-pointer accent-[#6A38C2]"
                                            checked={input.role === "recruiter"}
                                            onChange={changeEventHandler}
                                        />

                                        <span>
                                            Recruiter
                                        </span>
                                    </motion.label>
                                </div>
                            </div>
                            {
                             loading ? <button className="flex h-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-[#6A38C2]/70 font-medium text-white"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait </button> : <Button
                                type="submit"
                                className="h-11 w-full rounded-full bg-[#6A38C2] text-white shadow-lg shadow-[#6A38C2]/25 transition hover:bg-[#5b2fb0] focus-visible:ring-2 focus-visible:ring-[#6A38C2]/40 active:scale-95"
                            >
                                Login
                            </Button>
                            }


                            <div className="mt-6 text-center text-sm text-gray-500">
                                Don't have account?{" "}

                                <Link
                                    to="/signup"
                                    className="font-semibold text-[#6A38C2] hover:underline"
                                >
                                    Signup
                                </Link>
                            </div>
                        </motion.form>
                    </div>
                </div>
            </div>
        </div>
    );
};
