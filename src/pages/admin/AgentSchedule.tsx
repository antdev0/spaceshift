import { Calendar } from "lucide-react"
import { useState } from "react"
import { api, AxiosError } from "@services/api"
import { X } from "lucide-react"
import { useInputChange } from "@hooks/inputs";
import toast from "react-hot-toast";

interface Schedule {
    schedules: object
}

const AgentSchedule = () => {
    // Sample data for schedules
    // const schedules = [
    //     {
    //         id: 1,
    //         name: "Morning Shift",
    //         startTime: "08:00 AM",
    //         endTime: "04:00 PM",
    //         agents: 45,
    //         locations: ["Technical Support", "Customer Experience"],
    //         type: "Onsite",
    //     },
    //     {
    //         id: 2,
    //         name: "Afternoon Shift",
    //         startTime: "04:00 PM",
    //         endTime: "12:00 AM",
    //         agents: 38,
    //         locations: ["Sales Department", "Product Support"],
    //         type: "Mixed",
    //     },
    //     {
    //         id: 3,
    //         name: "Night Shift",
    //         startTime: "12:00 AM",
    //         endTime: "08:00 AM",
    //         agents: 22,
    //         locations: ["Technical Support", "Customer Experience"],
    //         type: "WFH",
    //     },
    //     {
    //         id: 4,
    //         name: "Weekend Shift",
    //         startTime: "10:00 AM",
    //         endTime: "06:00 PM",
    //         agents: 15,
    //         locations: ["Sales Department"],
    //         type: "Onsite",
    //     },
    //     {
    //         id: 5,
    //         name: "Flexible Hours",
    //         startTime: "Varies",
    //         endTime: "Varies",
    //         agents: 30,
    //         locations: ["Product Support", "Technical Support"],
    //         type: "WFH",
    //     },
    // ]

    // // Sample upcoming schedule changes
    // const upcomingChanges = [
    //     {
    //         date: "Mar 25, 2025",
    //         description: "Holiday schedule adjustment",
    //         affectedShifts: ["Morning Shift", "Afternoon Shift"],
    //     },
    //     {
    //         date: "Apr 1, 2025",
    //         description: "New rotation pattern begins",
    //         affectedShifts: ["All shifts"],
    //     },
    //     {
    //         date: "Apr 15, 2025",
    //         description: "Temporary staff increase",
    //         affectedShifts: ["Night Shift"],
    //     },
    // ]

    const [showModal, setShowModal] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    const { inputs, handleChange } = useInputChange({
        month: { required: true, validation: "numbers_only" },
        year: { required: true, validation: "numbers_only" },
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allErrorsNull = Object.values(inputs).every(input => input.error === null);
        if (!allErrorsNull) return;

        try {
            setSubmitLoading(true)
            const res = await api.post<{ status: number; message: string; data: Schedule }>(`/admin/schedule/generate/${inputs.month.value}/${inputs.year.value}`)
            if (res.status === 200) {
                toast.success(res.data.message)
                setShowModal(false)
            }
            else {
                throw new Error("Something went wrong.")
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message ?? "Error generating schedule")
            }
            console.error(error)
        } finally {
            setSubmitLoading(false)
        }
    }




    return (
        <div className="max-w-7xl mx-auto">
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800">Generate Schedule</h3>
                                <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="p-6 max-h-[70vh] overflow-y-auto">
                                    <div className="space-y-2 mb-3">
                                        <label htmlFor="month" className="text-sm font-medium text-gray-700 block">
                                            Month
                                        </label>
                                        <select
                                            name="month"
                                            id="month"
                                            value={inputs.month.value}
                                            onChange={handleChange}
                                            className={`block w-full px-3 py-2 border ${inputs.month.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`} required>
                                            <option value="">Select</option>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>
                                        {inputs.month.error && <p className="text-red-500 text-xs mt-1">{inputs.month.error}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="month" className="text-sm font-medium text-gray-700 block">
                                            Year
                                        </label>
                                        <select
                                            name="year"
                                            id="year"
                                            value={inputs.year.value}
                                            onChange={handleChange}
                                            className={`block w-full px-3 py-2 border ${inputs.year.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`} required>
                                            <option value="">Select</option>
                                            <option value="2025">2025</option>

                                        </select>
                                        {inputs.year.error && <p className="text-red-500 text-xs mt-1">{inputs.year.error}</p>}
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitLoading}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        {submitLoading ? "Generating..." : "Generate"}

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
                <p className="mt-1 text-sm text-gray-500">View and manage all BPO agent schedules</p>
            </div>

            {/* Actions bar */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Create Schedule</span>
                    </button>
                    {/* <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 font-medium hover:bg-gray-50 transition-colors">
                        Import
                    </button>
                    <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 font-medium hover:bg-gray-50 transition-colors">
                        Export
                    </button> */}
                </div>

                {/* <div className="flex gap-3">
                    <select className="border border-gray-300 rounded-lg bg-gray-50 text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="">All Locations</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="customer-experience">Customer Experience</option>
                        <option value="sales-department">Sales Department</option>
                        <option value="product-support">Product Support</option>
                    </select>

                    <select className="border border-gray-300 rounded-lg bg-gray-50 text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="">All Types</option>
                        <option value="wfh">WFH</option>
                        <option value="onsite">Onsite</option>
                        <option value="mixed">Mixed</option>
                    </select>
                </div> */}
            </div>

            {/* Schedules grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {schedules.map((schedule) => (
                    <div key={schedule.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">{schedule.name}</h3>
                            <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === "WFH"
                                        ? "bg-green-100 text-green-800"
                                        : schedule.type === "Onsite"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {schedule.type}
                            </span>
                        </div>
                        <div className="px-6 py-4">
                            <div className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-500">Time</span>
                                    <span className="text-sm font-medium">
                                        {schedule.startTime} - {schedule.endTime}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-500">Agents</span>
                                    <span className="text-sm font-medium">{schedule.agents}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Locations</span>
                                    <span className="text-sm font-medium text-right">{schedule.locations.join(", ")}</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View Details</button>
                                <div>
                                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            {/* Upcoming changes */}
            {/* <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Schedule Changes</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {upcomingChanges.map((change, index) => (
                        <div key={index} className="px-6 py-4 flex items-start">
                            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2 text-indigo-600">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{change.description}</p>
                                <p className="text-sm text-gray-500">Date: {change.date}</p>
                                <p className="text-sm text-gray-500">Affected: {change.affectedShifts.join(", ")}</p>
                            </div>
                            <button className="ml-auto text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Calendar preview */}
            {/* <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Calendar Preview</h3>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Open Full Calendar</button>
                </div>
                <div className="p-6">
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center">
                            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">Calendar view will be displayed here</p>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                                Load Calendar
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default AgentSchedule;