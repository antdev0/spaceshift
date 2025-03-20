// import { ArrowUpRight, ArrowDownRight } from "lucide-react"


const Dashboard = () => {
    // Sample data
    const stats = [
        { title: "Total Agents", value: "248", change: "+12%", trend: "up" },
        { title: "Active Schedules", value: "186", change: "+8%", trend: "up" },
        { title: "WFH Agents", value: "124", change: "-5%", trend: "down" },
        { title: "Onsite Agents", value: "62", change: "+18%", trend: "up" },
    ]

    const agentList = [
        {
            name: "John Doe",
            email: "john.doe@example.com",

            team: "TEAM A",
        },
        {
            name: "Sarah Lee",
            email: "sarah.lee@example.com",

            team: "TEAM A",
        },
        { name: "Mike Johnson", email: "mike.j@example.com", status: "Away", location: "Sales Department", team: "TEAM A" },
        { name: "Emily Chen", email: "emily.c@example.com", status: "Active", location: "Product Support", team: "TEAM A" },
        {
            name: "Robert Kim",
            email: "robert.k@example.com",

            team: "TEAM A",
        },
    ]
    return (
        <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Overview of your BPO agent management system</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${index % 4 === 0
                                            ? "bg-indigo-100 text-indigo-600"
                                            : index % 4 === 1
                                                ? "bg-purple-100 text-purple-600"
                                                : index % 4 === 2
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {index % 4 === 0 ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            ) : index % 4 === 1 ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            ) : index % 4 === 2 ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            ) : (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            )}
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                                        <dd>
                                            <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        {/* <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm flex items-center">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span className={`font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                                    {stat.change}
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>

            {/* Agent list */}
            <div className="bg-white shadow rounded-lg border border-gray-200 mb-6">
                <div className="px-6 py-5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">Agent List</h2>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                            View All
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Team
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {agentList.map((agent, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                                                {agent.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                                                <div className="text-sm text-gray-500">{agent.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${agent.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : agent.status === "Away"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {agent.status}
                                        </span>
                                    </td> */}
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.location}</td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="text-sm font-medium text-gray-900">{agent.team}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick actions */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white">Need to make changes to the schedule?</h3>
                        <p className="mt-1 text-sm text-indigo-100">
                            Use the quick actions to manage agent schedules and assignments.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 sm:w-auto">
                            Manage Schedules
                        </button>
                        <button className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 bg-opacity-30 hover:bg-opacity-40 sm:mt-0 sm:w-auto">
                            View Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;