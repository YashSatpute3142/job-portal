
import { CompanyCreate } from "@/components/company/CompanyCreate";
import { JobDescription } from "@/components/jobs/JobDescription";
import MainLayout from "@/components/shared/MainLayout";
import { AdminJobs } from "@/pages/admin/AdminJobs";
import { Companies } from "@/pages/admin/Companies";
import { CompanySetup } from "@/pages/admin/CompanySetup";
import { PostJob } from "@/pages/admin/PostJob";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Browse } from "@/pages/student/Browse";
import { Home } from "@/pages/student/Home";
import { Jobs } from "@/pages/student/Jobs";
import { Profile } from "@/pages/student/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

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
                element: <GuestRoute />,
                children: [
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/signup",
                        element: <Register />,
                    },
                ],
            },
            {
                path: "/jobs",
                element: <Jobs />,
            },
            {
                path: "/description/:id",
                element: <JobDescription />,
            },
            {
                path: "/browse",
                element: <Browse />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                    {
                        path: "/admin/companies",
                        element: <Companies />,
                    },
                    {
                        path: "/admin/companies/create",
                        element: <CompanyCreate />,
                    },
                    {
                        path: "/admin/companies/:id",
                        element: <CompanySetup />,
                    },
                    {
                        path: "/admin/jobs",
                        element: <AdminJobs />,
                    },
                    {
                        path: "/admin/jobs/create",
                        element: <PostJob />,
                    },
                ],
            },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
