import { CalendarIcon, Eye, Lock, Mail } from "lucide-react"
import { useInputChange } from "@hooks/inputs";
import { useAuthContext } from "@hooks/contexts/useAuthContext";
import toast from "react-hot-toast";

const Login = () => {

    const { login, loginLoading } = useAuthContext();


    const { inputs, handleChange } = useInputChange({
        email: { required: true, validation: "email" },
        password: { required: true },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await login(inputs.email.value, inputs.password.value);

        if (!response) return;


        if (response?.system_role === "admin") {
            window.location.href = "/admin";
        } else if (response?.system_role === "agent") {
            window.location.href = "/agent";
        } else {
            toast.error("Invalid role received");
        }
    };


    // console.log(loading)



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center p-4 md:p-8">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-b-[30%] opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-violet-400 rounded-full blur-3xl opacity-10"></div>

            <div className="w-full max-w-md z-10">
                {/* Logo and branding */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-4">
                        <CalendarIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">SpaceShift</h1>
                    <p className="text-gray-500 mt-1">Workspace Portal</p>
                </div>

                {/* Login card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
                        <p className="text-gray-500 mb-6">Please sign in to your account</p>

                        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
                            {/* Email field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        value={inputs.email.value}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="john.doe@example.com"
                                    />

                                </div>
                                <p className="text-red-500 text-sm italic">{inputs.email.error}</p>
                            </div>

                            {/* Password field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                        Password
                                    </label>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        value={inputs.password.value}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none">
                                            <Eye className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-red-500 text-sm italic">{inputs.password.error}</p>
                            </div>

                            {/* Remember me checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            {/* Sign in button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loginLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                                >
                                    {
                                        loginLoading ? "Signing in..." : "Sign in"
                                    }
                                </button>
                            </div>
                        </form>

                        {/* SSO options */}
                        {/* <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div> */}
                    </div>

                    {/* Sign up section */}
                    {/* <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </a>
                        </p>
                    </div> */}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">&copy; 2025 SpaceShift. All rights reserved.</p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                            Terms
                        </a>
                        <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                            Privacy
                        </a>
                        <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                            Help
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;