import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Register = () => {
    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 mt-12 mb-8">

                <div className="flex items-center gap-16">

                    {/* LEFT SIDE - IMAGE */}
                    <div className="w-1/2 flex items-center justify-center">
                        <img
                            src="/assets/signup.avif"
                            alt="Sign Up"
                            className="w-full max-w-md object-contain"
                        />
                    </div>

                    {/* RIGHT SIDE - FORM */}
                    <div className="w-1/2">

                        <form className="w-full border border-gray-200 rounded-md p-6">

                            <h1 className="font-bold text-2xl mb-6">
                                Sign Up
                            </h1>

                            {/* FULL NAME */}
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
                                />
                            </div>

                            {/* EMAIL */}
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
                                />
                            </div>

                            {/* PHONE */}
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
                                />
                            </div>

                            {/* PASSWORD */}
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
                                />
                            </div>

                            {/* ROLE + PROFILE */}
                            <div className="flex items-center justify-between mb-6">

                                {/* ROLE */}
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
                                        />

                                        <span>
                                            Recruiter
                                        </span>
                                    </label>

                                </div>

                                {/* PROFILE */}
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
                                    />

                                </div>

                            </div>

                            {/* SIGN UP BUTTON */}
                            <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                Sign Up
                            </Button>

                            {/* LOGIN LINK */}
                            <div className="mt-5">
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