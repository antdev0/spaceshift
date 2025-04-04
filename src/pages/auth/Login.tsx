import { CalendarIcon } from "lucide-react"
import { useInputChange } from "@hooks/inputs";
import { useAuthContext } from "@hooks/contexts/useAuthContext";
import toast from "react-hot-toast";
import { Input, Button } from "@components/elements";

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
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={inputs.email.value}
                                onChange={handleChange}
                                error={inputs.email.error}
                                icon="Mail"
                            />

                            {/* Password field */}
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={inputs.password.value}
                                onChange={handleChange}
                                error={inputs.password.error}
                                icon="Lock"
                            />


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
                                <Button
                                    disabled={loginLoading}
                                    type="submit"
                                    variant="primary">
                                    {
                                        loginLoading ? "Signing in..." : "Sign in"
                                    }
                                </Button>
                            </div>
                        </form>


                    </div>

                </div>


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