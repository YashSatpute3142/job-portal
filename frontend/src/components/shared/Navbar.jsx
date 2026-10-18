import { Button } from "@/components/ui/button";
import React from "react";
import { PopoverContent, PopoverTrigger, Popover } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../ui/toast";
import { logoutUser } from "@/api/userApi";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = async () => {
        try {
            const res = await logoutUser();

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");

                toast.add({
                    title: "Success",
                    description: res.data.message,
                    type: "success",
                });
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

    const initial = user?.fullName?.trim().charAt(0).toUpperCase() || "U";
    const navLinkClass = "text-sm text-gray-700 transition-colors hover:text-[#6A38C2]";

    return (
        <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>
                </div>

                <div className="flex items-center gap-6 sm:gap-10">
                    <ul className="flex items-center gap-5 font-medium">
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <Link to="/admin/companies" className={navLinkClass}>
                                        <li>Companies</li>
                                    </Link>

                                    <Link to="/admin/jobs" className={navLinkClass}>
                                        <li>Jobs</li>
                                    </Link>
                                </>
                            ) : (
                                <>

                                    <Link to="/" className={navLinkClass}>
                                        <li>Home</li>
                                    </Link>

                                    <Link to="/jobs" className={navLinkClass}>
                                        <li>Jobs</li>
                                    </Link>

                                    <Link to="/browse" className={navLinkClass}>
                                        <li>Browse</li>
                                    </Link>
                                </>
                            )
                        }

                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" className="rounded-full border-gray-200 px-5 text-gray-700 transition-colors hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]">Login</Button>
                            </Link>

                            <Link to="/signup">
                                <Button className="rounded-full border border-[#6A38C2] bg-[#6A38C2] px-5 text-white shadow-md shadow-[#6A38C2]/25 transition-colors duration-300 hover:bg-white hover:text-[#6A38C2]">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#6A38C2]/20 transition hover:border-[#6A38C2]">
                                    {user?.profile?.profilePhoto ? (
                                        <AvatarImage src={user?.profile?.profilePhoto} className="object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-[#6A38C2]/10 text-sm font-semibold text-[#6A38C2]">
                                            {initial}
                                        </div>
                                    )}
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="z-50 w-80 rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 opacity-100 shadow-2xl">
                                <div className="flex items-center gap-4 space-y-0">
                                    <Avatar className="h-12 w-12 border-2 border-[#6A38C2]/20">
                                        {user?.profile?.profilePhoto ? (
                                            <AvatarImage src={user?.profile?.profilePhoto} className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-[#6A38C2]/10 text-base font-semibold text-[#6A38C2]">
                                                {initial}
                                            </div>
                                        )}
                                    </Avatar>

                                    <div className="min-w-0">
                                        <h4 className="truncate font-semibold text-gray-900">
                                            {user?.fullName}
                                        </h4>

                                        <p className="line-clamp-2 text-sm text-gray-500">
                                            {user?.profile?.bio}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-3 text-gray-600">
                                    {
                                        user && user.role === "student" && (
                                            <div className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 transition-colors hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]">
                                                <User2 className="h-5 w-5" />
                                                <Button variant="link" className="h-10 flex-1 justify-start px-1 text-inherit no-underline hover:no-underline">
                                                    <Link to="/profile">
                                                        View Profile
                                                    </Link>
                                                </Button>
                                            </div>

                                        )
                                    }


                                    <div className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 transition-colors hover:bg-red-50 hover:text-red-600">
                                        <LogOut className="h-5 w-5" />
                                        <Button
                                            variant="link"
                                            className="h-10 flex-1 justify-start px-1 text-inherit no-underline hover:no-underline"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );


};

export default Navbar;
