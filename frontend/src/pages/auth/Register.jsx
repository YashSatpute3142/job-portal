import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { registerUser } from "@/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export const Register = () => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const [isHovering, setIsHovering] = useState(false);

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null,
    });

    const {loading} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

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

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0],
        });
    };

    const submitHamdler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
        formData.append("file", input.file);
    }

    try {
        dispatch(setLoading(true))
        const res = await registerUser(formData);

        if (res.data.success) {
            toast.add({
                title: "Success",
                description: res.data.message,
                type: "success",
            });

            navigate("/login");
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
                                Sign Up
                            </h1>

                            <div className="mb-4">
                                <Label
                                    htmlFor="fullName"
                                    className="block mb-2"
                                >
                                    Full Name
                                </Label>

                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                />
                            </div>

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
                                    htmlFor="phoneNumber"
                                    className="block mb-2"
                                >
                                    Phone Number
                                </Label>

                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Enter phone no"
                                    value={input.phoneNumber}
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

                                <div className="flex items-center gap-3">
                                    <Label htmlFor="profile">
                                        Profile
                                    </Label>

                                    <Input
                                        id="profile"
                                        name="profile"
                                        type="file"
                                        accept="image/*"
                                        className="cursor-pointer"
                                        onChange={changeFileHandler}
                                    />
                                </div>
                            </div>

                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className="r-2 h-4 w-4 animate-spin" />Please wait</Button>: <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                Sign Up
                            </Button>
                            }

                            <div className="mt-5 text-sm">
                                Already have account?{" "}

                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};