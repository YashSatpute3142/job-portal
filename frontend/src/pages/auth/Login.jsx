import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { loginUser } from "@/api/userApi";

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
    const navigate = useNavigate();

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
        const res = await loginUser(input);

        if (res.data.success) {
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
    }
};
    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 mt-12 mb-8">
                <div className="flex items-center gap-16">
                    <div className="w-1/2 flex items-center justify-center">
                        <div
                            className="relative w-full max-w-md overflow-hidden"
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
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                style={{
                                    clipPath: isHovering
                                        ? `circle(100px at ${mousePosition.x}px ${mousePosition.y}px)`
                                        : "circle(0px at 0px 0px)",
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-1/2">
                        <form
                            onSubmit={submitHamdler}
                            className="w-full border border-gray-200 rounded-md p-6"
                        >
                            <h1 className="font-bold text-2xl mb-6">
                                Login
                            </h1>

                            <div className="mb-4">
                                <Label
                                    htmlFor="email"
                                    className="block mb-2"
                                >
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="xyz@gmail.com"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div className="mb-4">
                                <Label
                                    htmlFor="password"
                                    className="block mb-2"
                                >
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <Label>
                                        Role
                                    </Label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            className="w-4 h-4 cursor-pointer"
                                            checked={input.role === "student"}
                                            onChange={changeEventHandler}
                                        />

                                        <span>
                                            Student
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            className="w-4 h-4 cursor-pointer"
                                            checked={input.role === "recruiter"}
                                            onChange={changeEventHandler}
                                        />

                                        <span>
                                            Recruiter
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                Login
                            </Button>

                            <div className="mt-5 text-sm">
                                Don't have account?{" "}

                                <Link
                                    to="/signup"
                                    className="text-blue-600 hover:underline"
                                >
                                    Signup
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};