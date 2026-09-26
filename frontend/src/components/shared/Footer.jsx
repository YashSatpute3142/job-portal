export const Footer = () => {
     return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-6">

                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div>
                        <h2 className="text-xl font-bold">
                            Job<span className="text-red-500">Portal</span>
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Find your dream job today.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        <a
                            href="/"
                            className="hover:text-red-500 transition-colors"
                        >
                            Home
                        </a>

                        <a
                            href="/jobs"
                            className="hover:text-red-500 transition-colors"
                        >
                            Jobs
                        </a>

                        <a
                            href="/login"
                            className="hover:text-red-500 transition-colors"
                        >
                            Login
                        </a>

                        <a
                            href="/signup"
                            className="hover:text-red-500 transition-colors"
                        >
                            Sign Up
                        </a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-100 mt-5 pt-4 text-center">
                    <p className="text-sm text-gray-500">
                        © 2026 JobPortal. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}