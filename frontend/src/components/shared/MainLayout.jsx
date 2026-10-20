import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import Navbar from "./Navbar";
import { Footer } from "./Footer";


const MainLayout = () => {
   const { pathname } = useLocation();
   return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-1">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                    >
                        <Outlet />
                    </motion.div>
                </main>

                <Footer />
            </div>
        </MotionConfig>
    );
};

export default MainLayout;