const ManageAgents = () => {
    // Sample data for agents
    const agents = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            status: "Active",
            location: "Technical Support",
            type: "Onsite",
            joinDate: "Jan 15, 2025",
            performance: "Excellent",
        },
        {
            name: "Sarah Lee",
            email: "sarah.lee@example.com",
            status: "Active",
            location: "Customer Experience",
            type: "WFH",
            joinDate: "Feb 3, 2025",
            performance: "Good",
        },
        {
            name: "Mike Johnson",
            email: "mike.j@example.com",
            status: "Away",
            location: "Sales Department",
            type: "Onsite",
            joinDate: "Dec 10, 2024",
            performance: "Average",
        },
        {
            name: "Emily Chen",
            email: "emily.c@example.com",
            status: "Active",
            location: "Product Support",
            type: "WFH",
            joinDate: "Mar 5, 2025",
            performance: "Excellent",
        },
        {
            name: "Robert Kim",
            email: "robert.k@example.com",
            status: "Inactive",
            location: "Technical Support",
            type: "WFH",
            joinDate: "Nov 22, 2024",
            performance: "Below Average",
        },
        {
            name: "Lisa Wang",
            email: "lisa.w@example.com",
            status: "Active",
            location: "Customer Experience",
            type: "Onsite",
            joinDate: "Jan 30, 2025",
            performance: "Good",
        },
        {
            name: "David Smith",
            email: "david.s@example.com",
            status: "Active",
            location: "Sales Department",
            type: "WFH",
            joinDate: "Feb 15, 2025",
            performance: "Excellent",
        },
        {
            name: "Jessica Brown",
            email: "jessica.b@example.com",
            status: "Away",
            location: "Product Support",
            type: "Onsite",
            joinDate: "Dec 5, 2024",
            performance: "Good",
        },
    ]
    return (
        <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Agents Management</h1>
                <p className="mt-1 text-sm text-gray-500">View and manage all BPO agents in your organization</p>
            </div>

            {/* Actions bar */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative max-w-xs w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search agents..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div className="flex gap-3">
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
                    </select>

                    <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-indigo-700 transition-colors">
                        Add Agent
                    </button>
                </div>
            </div>

            {/* Agents table */}
            <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Agent
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Join Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Performance
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {agents.map((agent, index) => (
                                <tr key={index} className="hover:bg-gray-50">
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
                                    <td className="px-6 py-4 whitespace-nowrap">
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
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${agent.type === "WFH" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                                                }`}
                                        >
                                            {agent.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.joinDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${agent.performance === "Excellent"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : agent.performance === "Good"
                                                        ? "bg-green-100 text-green-800"
                                                        : agent.performance === "Average"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {agent.performance}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
                                <span className="font-medium">24</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    8
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageAgents;