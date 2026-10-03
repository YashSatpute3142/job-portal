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

return (
    <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
            <div>
                <h1 className="text-2xl font-bold">
                    Job<span className="text-[#F83002]">Portal</span>
                </h1>
            </div>

            <div className="flex gap-10 items-center">
                <ul className="flex font-medium items-center gap-5">
                    <Link to="/">
                        <li>Home</li>
                    </Link>

                    <Link to="/jobs">
                        <li>Jobs</li>
                    </Link>

                    <Link to="/browse">
                        <li>Browse</li>
                    </Link>
                </ul>

                {!user ? (
                    <div className="flex item-center gap-2">
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>

                        <Link to="/signup">
                            <Button className="bg-[#F83002] text-white hover:bg-white hover:text-[#F83002] hover:border-[#F83002] transition-colors duration-500">
                                Signup
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.profile?.profilePhoto} />
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="w-80">
                            <div className="flex gap-4 space-y-0">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                </Avatar>

                                <div>
                                    <h4 className="font-medium">
                                        {user?.fullName}
                                    </h4>

                                    <p className="text-sm text-muted-foreground">
                                        {user?.profile?.bio}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col text-gray-600">
                                <div className="flex w-fit items-center gap-1 cursor-pointer">
                                    <User2 />
                                    <Button variant="link">
                                        <Link to="/profile">
                                            View Profile
                                        </Link>
                                    </Button>
                                </div>

                                <div className="flex w-fit items-center gap-1 cursor-pointer">
                                    <LogOut />
                                    <Button
                                        variant="link"
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
