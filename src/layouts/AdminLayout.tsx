import { useState } from "react"
import Icon from "@components/Icon"
import { Outlet } from "react-router-dom"
import { useAuthContext } from "@hooks/contexts/useAuthContext"
import AdminNavigation from "@features/navigation/AdminNavigation"



const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const { logout, logoutLoading } = useAuthContext()
    return (
        <div className="flex h-screen bg-gray-50">
            {
                showLogoutModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"

                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Icon name="LogOut" className="h-5 w-5 text-indigo-600" />
                                    Confirm
                                </h3>
                                <button onClick={() => setShowLogoutModal(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
                                    <Icon name="X" size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-600">Are you sure you want to logout?</p>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowLogoutModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => logout()}
                                    disabled={logoutLoading}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                                >
                                    <Icon name="LogOut" className="h-4 w-4" />
                                    {logoutLoading ? "Logging out..." : "Logout"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                            N
                        </div>
                        <span className="ml-2 text-xl font-bold text-gray-800">SpaceShift</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">
                        <Icon name="X" className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="p-4">

                    <AdminNavigation />

                </div>

                {/* User */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                            A
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Admin User</p>
                            <p className="text-xs text-gray-500">admin@example.com</p>
                        </div>
                        <button onClick={() => setShowLogoutModal(true)} className="ml-auto text-gray-400 hover:text-gray-500">
                            <Icon name="LogOut" className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Header */}
                <header className="bg-white border-b shadow-sm">
                    <div className="flex items-center justify-end h-16 px-4 md:px-6">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500">
                            <Icon name="Menu" className="h-6 w-6" />
                        </button>



                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:flex items-center gap-1 text-sm text-gray-500">
                                <Icon name="Clock" className="h-4 w-4" />
                                <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>

                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                                <Icon name="Bell" className="h-6 w-6" />
                            </button>

                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                                    A
                                </div>
                                <button onClick={() => setShowLogoutModal(true)} className="ml-auto text-gray-400 hover:text-gray-500">
                                    <Icon name="LogOut" className="h-4 w-4 ml-1 text-gray-500 hidden md:block" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}




export default AdminLayout;