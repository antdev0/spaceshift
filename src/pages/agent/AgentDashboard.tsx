
import { useState, useEffect } from "react"
import { useAuthContext } from "@hooks/contexts/useAuthContext"
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Building,
    MapPin,
    CalendarIcon,
    X,
    // ChevronDown,
    User,
    Bell,
    LogOut,
    Menu,
    Clock,
    Users,
    Calendar,
    MessageSquare,
    // Search,
} from "lucide-react"

import { api } from "@services/api"


interface StatisticsProps {
    totalOnsite: number;
    totalWfh: number;
    totalTeam: number;
    totalWorkDays: number;
    monthlyStatsWfh: number;
    monthlyStatsOnsite: number;
}

const AgentDashboard = () => {
    const { user, loading, logout, logoutLoading } = useAuthContext();
    const [showLogoutModal, setShowLogoutModal] = useState(false)



    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showModal, setShowModal] = useState(false)
    // const [currentView, setCurrentView] = useState<"month" | "week">("month")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [scheduleData, setScheduleData] = useState<Record<string, Schedule>>({})
    const [fetchLoading, setFetchLoading] = useState(false)
    const [statistics, setStatistics] = useState<StatisticsProps>({
        totalOnsite: 0,
        totalWfh: 0,
        totalTeam: 0,
        totalWorkDays: 0,
        monthlyStatsWfh: 0,
        monthlyStatsOnsite: 0,
    })


    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        const monthNumber = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const fetchData = async () => {
            try {
                setFetchLoading(true);
                const response = await api.get(`/my-schedule/${user?.id}/${monthNumber}/${year}`);

                setStatistics({
                    totalOnsite: response.data.data.total_onsite,
                    totalWfh: response.data.data.total_wfh,
                    totalTeam: response.data.data.total_users_in_team,
                    totalWorkDays: response.data.data.total_working_days,
                    monthlyStatsWfh: isNaN(Number(((response.data.data.total_wfh / response.data.data.total_working_days) * 100).toFixed(2)))
                        ? 0
                        : Number(((response.data.data.total_wfh / response.data.data.total_working_days) * 100).toFixed(2)),

                    monthlyStatsOnsite: isNaN(Number(((response.data.data.total_onsite / response.data.data.total_working_days) * 100).toFixed(2)))
                        ? 0
                        : Number(((response.data.data.total_onsite / response.data.data.total_working_days) * 100).toFixed(2))
                });
                setScheduleData(response.data.data.schedule);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setFetchLoading(false);
            }
        }
        fetchData();

    }, [user, currentDate]);





    type ScheduleType = "wfh" | "onsite";

    interface Schedule {
        type: ScheduleType;
        area?: string;
        desk?: string;
        floor?: string;
        team?: string;
    }

    // const upcomingSchedules = [{}
    //     // { date: "Mar 19", day: "Wed", type: "onsite", area: "Customer Experience", desk: "CE-22" },
    //     // { date: "Mar 20", day: "Thu", type: "onsite", area: "Product Support", desk: "PS-11" },
    //     // { date: "Mar 21", day: "Fri", type: "wfh" },
    //     // { date: "Mar 24", day: "Mon", type: "onsite", area: "Technical Support", desk: "TS-05" },
    // ]

    // // Sample team members
    // const teamMembers = [{}
    //     // { name: "Alex Johnson", status: "onsite", area: "Technical Support" },
    //     // { name: "Maria Garcia", status: "wfh" },
    //     // { name: "James Smith", status: "onsite", area: "Customer Experience" },
    //     // { name: "Sarah Lee", status: "wfh" },
    // ]

    // // Sample notifications
    // const notifications = [{}
    //     // { message: "Schedule changed for March 24", time: "2 hours ago" },
    //     // { message: "New team assignment for next week", time: "Yesterday" },
    //     // { message: "Office closure on March 31", time: "2 days ago" },
    // ]

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const formatDateKey = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        setSelectedDate(clickedDate)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const isToday = (day: number) => {
        const today = new Date()
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        )
    }

    const renderCalendar = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOfMonth = getFirstDayOfMonth(year, month)

        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-28 bg-gray-50/50 rounded-xl"></div>)
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day)
            const dateKey = formatDateKey(date)
            const hasSchedule = dateKey in scheduleData
            const scheduleType = hasSchedule ? scheduleData[dateKey as keyof typeof scheduleData].type : null

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`h-24 md:h-28 p-2 rounded-xl border border-gray-100 transition-all hover:shadow-md cursor-pointer relative group ${isToday(day) ? "ring-2 ring-indigo-500 ring-offset-2" : ""
                        } ${hasSchedule ? "bg-white shadow-sm" : "bg-gray-50/50"}`}
                >
                    <div className="flex justify-between items-start">
                        <span
                            className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${isToday(day) ? "bg-indigo-500 text-white" : hasSchedule ? "bg-gray-100" : ""
                                }`}
                        >
                            {day}
                        </span>

                        {hasSchedule && (
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${scheduleType === "wfh" ? "bg-teal-100" : "bg-violet-100"
                                    }`}
                            >
                                {scheduleType === "wfh" ? (
                                    <Home size={16} className="text-teal-600" />
                                ) : (
                                    <Building size={16} className="text-violet-600" />
                                )}
                            </div>
                        )}
                    </div>

                    {hasSchedule && scheduleType === "onsite" && scheduleData[dateKey]?.area && (
                        <div className="mt-2 text-xs text-gray-600 font-medium truncate">
                            {scheduleData[dateKey]?.area}
                        </div>
                    )}

                    {hasSchedule && (
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div
                                className={`text-xs px-2 py-1 rounded-full text-center font-medium ${scheduleType === "wfh" ? "bg-teal-100 text-teal-700" : "bg-violet-100 text-violet-700"
                                    }`}
                            >
                                {scheduleType === "wfh" ? "Work from Home" : "Onsite"}
                            </div>
                        </div>
                    )}
                </div>,
            )
        }

        return days
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    // const [showDropdown, setShowDropdown] = useState(false);

    // const handleSelectView = (view: "month" | "week") => {
    //     setCurrentView(view);
    //     setShowDropdown(false);
    // };

    const selectedSchedule = selectedDate
        ? scheduleData[formatDateKey(selectedDate)] as Schedule | undefined
        : undefined;

    if (loading) return <p>Loading...</p>;
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
                                    <LogOut className="h-5 w-5 text-indigo-600" />
                                    Confirm
                                </h3>
                                <button onClick={() => setShowLogoutModal(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
                                    <X size={20} />
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
                                    <LogOut className="h-4 w-4" />
                                    {logoutLoading ? "Logging out..." : "Logout"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 fixed w-full z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <CalendarIcon className="h-8 w-8 text-indigo-600" />
                                <span className="ml-2 text-xl font-bold text-gray-800">SpaceShift</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <a
                                    href="#"
                                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="#"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Schedule
                                </a>
                                <a
                                    href="#"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Team
                                </a>
                                <a
                                    href="#"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Reports
                                </a>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                            <div className="relative">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock size={16} />
                                    <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                </div>
                            </div>

                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                                <Bell size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <User size={16} className="text-indigo-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{user?.first_name} {user?.last_name}</span>
                            </div>

                            <button onClick={() => setShowLogoutModal(true)} className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                                <LogOut size={20} />
                            </button>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <a
                                href="#"
                                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Dashboard
                            </a>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Schedule
                            </a>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Team
                            </a>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Reports
                            </a>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <User size={20} className="text-indigo-600" />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">John Doe</div>
                                    <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
                                </div>
                                <button className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500">
                                    <Bell size={20} />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Your Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Settings
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main content */}
            <div className="pt-16 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Dashboard header */}
                    <div className="mb-8 mt-16">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome back, {user?.first_name}</h1>
                        <p className="text-gray-500">Here's your schedule for March 2025</p>
                    </div>

                    {/* Quick stats */}
                    {
                        fetchLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                {/* Skeleton for the "This Month" card */}
                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100"></div>
                                        <div className="flex flex-col">
                                            <div className="w-24 h-4 bg-gray-200 mb-2"></div>
                                            <div className="w-32 h-6 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skeleton for the "Work from Home" card */}
                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-teal-100"></div>
                                        <div className="flex flex-col">
                                            <div className="w-24 h-4 bg-gray-200 mb-2"></div>
                                            <div className="w-32 h-6 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skeleton for the "Onsite Work" card */}
                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-violet-100"></div>
                                        <div className="flex flex-col">
                                            <div className="w-24 h-4 bg-gray-200 mb-2"></div>
                                            <div className="w-32 h-6 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skeleton for the "Team Members" card */}
                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-100"></div>
                                        <div className="flex flex-col">
                                            <div className="w-24 h-4 bg-gray-200 mb-2"></div>
                                            <div className="w-32 h-6 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Calendar size={20} className="text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">This Month</p>
                                            <p className="text-xl font-semibold">{statistics?.totalWorkDays} Work Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                            <Home size={20} className="text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Work from Home</p>
                                            <p className="text-xl font-semibold">{statistics?.totalWfh} Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                                            <Building size={20} className="text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Onsite Work</p>
                                            <p className="text-xl font-semibold">{statistics?.totalOnsite} Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                            <Users size={20} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Team Members</p>
                                            <p className="text-xl font-semibold">{statistics?.totalTeam} People</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    {/* Main calendar */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Schedule Calendar</h2>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                                                <span>WFH</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                                                <span>Onsite</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={handlePrevMonth}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <h2 className="text-xl font-semibold">
                                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                            </h2>
                                            <button
                                                onClick={handleNextMonth}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>


                                    </div>
                                </div>

                                {
                                    fetchLoading ? (
                                        <div className="p-4 md:p-6 bg-white">
                                            <div className="grid grid-cols-7 gap-3 md:gap-4">
                                                {/* Skeleton for the days of the week */}
                                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                                    <div key={day} className="h-10 flex items-center justify-center font-medium text-gray-500">
                                                        {day}
                                                    </div>
                                                ))}
                                                {/* Skeleton for the calendar days */}
                                                {Array.from({ length: 42 }).map((_, index) => (
                                                    <div key={index} className="h-20 flex items-center justify-center bg-gray-200 animate-pulse">
                                                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 md:p-6 bg-white">
                                            <div className="grid grid-cols-7 gap-3 md:gap-4">
                                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                                    <div key={day} className="h-10 flex items-center justify-center font-medium text-gray-500">
                                                        {day}
                                                    </div>
                                                ))}
                                                {renderCalendar()}
                                            </div>
                                        </div>
                                    )
                                }


                            </div>

                            {/* Team schedule */}
                            {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">Team Schedule</h2>
                                    <button className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">View All</button>
                                </div>

                                <div className="p-6">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Search className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                                            placeholder="Search team members"
                                        />
                                    </div>

                                    <div className="mt-4 divide-y">
                                        {teamMembers.map((member, index) => (
                                            <div key={index} className="py-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <User size={18} className="text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{member.name}</p>
                                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                                            {member.status === "wfh" ? (
                                                                <>
                                                                    <Home size={14} className="text-teal-500" />
                                                                    <span>Working from home</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Building size={14} className="text-violet-500" />
                                                                    <span>{member.area}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="space-y-6">
                            {/* Upcoming schedule */}
                            {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800">Upcoming Schedule</h2>
                                </div>

                                <div className="p-4">
                                    <div className="space-y-3">
                                        {upcomingSchedules.map((schedule, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                                                <div className="flex flex-col items-center justify-center min-w-[50px] bg-gray-100 rounded-lg p-2">
                                                    <span className="text-sm font-bold text-gray-700">{schedule.date}</span>
                                                    <span className="text-xs text-gray-500">{schedule.day}</span>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        {schedule.type === "wfh" ? (
                                                            <div className="flex items-center gap-1 text-teal-600 bg-teal-50 px-2 py-1 rounded-full text-xs font-medium">
                                                                <Home size={12} />
                                                                <span>WFH</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1 text-violet-600 bg-violet-50 px-2 py-1 rounded-full text-xs font-medium">
                                                                <Building size={12} />
                                                                <span>Onsite</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {schedule.type === "onsite" && (
                                                        <div className="mt-1">
                                                            <p className="text-sm font-medium">{schedule.area}</p>
                                                            <p className="text-xs text-gray-500">Desk: {schedule.desk}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> */}

                            {/* Notifications */}
                            {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                                    <button className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">
                                        Mark all as read
                                    </button>
                                </div>

                                <div className="p-4">
                                    <div className="space-y-1">
                                        {notifications.map((notification, index) => (
                                            <div key={index} className="p-3 hover:bg-gray-50 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                                        <Bell size={16} className="text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{notification.message}</p>
                                                        <p className="text-xs text-gray-500">{notification.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> */}

                            {/* Monthly stats */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800">Monthly Stats</h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium">Work from Home</span>
                                                <span className="text-sm font-medium">{statistics?.monthlyStatsWfh}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${statistics?.monthlyStatsWfh}%` }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium">Onsite Work</span>
                                                <span className="text-sm font-medium">{statistics?.monthlyStatsOnsite}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-violet-500 h-2 rounded-full" style={{ width: `${statistics?.monthlyStatsOnsite}%` }}></div>
                                            </div>
                                        </div>

                                        {/* <div className="pt-4">
                                            <h3 className="text-sm font-medium mb-3">Onsite Areas</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs">Technical Support</span>
                                                    <span className="text-xs font-medium">4 days</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs">Customer Experience</span>
                                                    <span className="text-xs font-medium">3 days</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs">Sales Department</span>
                                                    <span className="text-xs font-medium">2 days</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs">Product Support</span>
                                                    <span className="text-xs font-medium">1 day</span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Quick actions */}
                            {/* <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm font-medium backdrop-blur-sm transition-all">
                                            Request WFH
                                        </button>
                                        <button className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm font-medium backdrop-blur-sm transition-all">
                                            Swap Schedule
                                        </button>
                                        <button className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm font-medium backdrop-blur-sm transition-all">
                                            Report Issue
                                        </button>
                                        <button className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm font-medium backdrop-blur-sm transition-all">
                                            View Team
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for schedule details */}
            {showModal && selectedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-semibold">
                                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                            </h3>
                            <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            {formatDateKey(selectedDate) in scheduleData ? (
                                <div>
                                    {scheduleData[formatDateKey(selectedDate) as keyof typeof scheduleData].type === "wfh" ? (
                                        <div className="flex flex-col items-center py-8 text-center">
                                            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                                                <Home size={28} className="text-teal-600" />
                                            </div>
                                            <h4 className="text-xl font-medium mb-2">Work From Home</h4>
                                            <p className="text-gray-500 mb-6">You're scheduled to work remotely on this day</p>

                                            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                                <button className="flex items-center justify-center gap-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-4 transition-colors">
                                                    <Calendar size={16} />
                                                    <span>Add to Calendar</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-2 text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg py-2 px-4 transition-colors">
                                                    <MessageSquare size={16} />
                                                    <span>Request Change</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                                                    <Building size={24} className="text-violet-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-medium">Onsite Work</h4>
                                                    <p className="text-gray-500">Office attendance required</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="text-gray-400 mt-0.5" size={18} />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Area</p>
                                                        <p className="font-medium">
                                                            {selectedSchedule?.area && <p className="font-medium">{selectedSchedule.area}</p>}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <MapPin className="text-gray-400 mt-0.5" size={18} />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Desk</p>
                                                        <p className="font-medium">
                                                            {selectedSchedule?.desk && <p className="font-medium">{selectedSchedule.desk}</p>}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Building className="text-gray-400 mt-0.5" size={18} />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Location</p>
                                                        <p className="font-medium">
                                                            {selectedSchedule?.floor && <p className="font-medium">{selectedSchedule.floor}</p>}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Users className="text-gray-400 mt-0.5" size={18} />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Team</p>
                                                        <p className="font-medium">
                                                            {selectedSchedule?.team && <p className="font-medium">{selectedSchedule.team}</p>}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button className="flex items-center justify-center gap-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-4 transition-colors">
                                                    <Calendar size={16} />
                                                    <span>Add to Calendar</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-2 text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg py-2 px-4 transition-colors">
                                                    <MessageSquare size={16} />
                                                    <span>Request Change</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-8 text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <CalendarIcon size={28} className="text-gray-400" />
                                    </div>
                                    <h4 className="text-xl font-medium mb-2">No Schedule</h4>
                                    <p className="text-gray-500">You don't have any assignments for this date</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgentDashboard;