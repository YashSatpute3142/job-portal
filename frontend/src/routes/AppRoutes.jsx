import { JobDescription } from "@/components/jobs/JobDescription";
import MainLayout from "@/components/shared/MainLayout";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Browse } from "@/pages/student/Browse";
import { Home } from "@/pages/student/Home";
import { Jobs } from "@/pages/student/Jobs";
import { Profile } from "@/pages/student/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Register />,
            },
            {
                path:"/jobs",
                element:<Jobs />
            },
            {
                path:"/description/:id",
                element:<JobDescription />
            },
            {
                path:"/browse",
                element:<Browse />
            },
            {
                path:"/profile",
                element:<Profile />
            }
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;