import { useState, useEffect } from "react"
import { api, AxiosError } from "@services/api"
import { X } from "lucide-react"
import { useInputChange } from "@hooks/inputs";
import toast from "react-hot-toast";


interface AgentData {
    id: string,
    employee_id: string,
    first_name: string,
    last_name: string,
    email: string,
    job_role: string,
    team_id: string,
    date_hired: string

}

interface AddEmployeeResponse {
    message: string,
    id: string
}


const ManageAgents = () => {

    const [agentData, setAgentData] = useState<AgentData[]>([]);
    const [fetchLoading, setFetchLoading] = useState<boolean>(true)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const { inputs, handleChange } = useInputChange({
        employee_id: { required: true },
        email: { required: true, validation: "email" },
        first_name: { required: true, validation: "letters_only" },
        last_name: { required: true, validation: "letters_only" },
        job_role: { required: true },
        team_name: { required: true },
        date_hired: { required: true },
        system_role: { required: true }
    });




    useEffect(() => {
        const fetchAgentData = async () => {
            setFetchLoading(true)
            try {
                const res = await api.get("/admin/employees")
                setAgentData(res.data.data)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setFetchLoading(false)
            }
        }

        fetchAgentData();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const allErrorsNull = Object.values(inputs).every(input => input.error === null);
        if (!allErrorsNull) return;

        try {
            setSubmitLoading(true)

            const res = await api.post<{ status: number; message: string; data: AddEmployeeResponse }>("/admin/employees/store", {
                employee_id: inputs.employee_id.value,
                first_name: inputs.first_name.value,
                last_name: inputs.last_name.value,
                email: inputs.email.value,
                system_role: inputs.system_role.value,
                job_role: inputs.job_role.value,
                team_id: inputs.team_name.value,
                date_hired: inputs.date_hired.value
            })
            if (res.status === 201) {
                const { id, message } = res.data.data
                setAgentData([...agentData,
                {
                    id,
                    employee_id: inputs.employee_id.value,
                    first_name: inputs.first_name.value,
                    last_name: inputs.last_name.value,
                    email: inputs.email.value,
                    job_role: inputs.job_role.value,
                    team_id: inputs.team_name.value,
                    date_hired: inputs.date_hired.value
                }])
                toast.success(message)
                setShowModal(false)
            } else {
                throw new Error("Something went wrong.")
            }


        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message ?? "Error adding employee")
            }
            console.error(error)
        } finally {
            setSubmitLoading(false)
        }



    }

    // console.log(agentData)


    return (
        <div className="max-w-7xl mx-auto">
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800">Add Agent</h3>
                                <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="p-6 max-h-[70vh] overflow-y-auto">
                                    <p className="mb-3 text-gray-500">The <strong>Employee ID</strong> is the initial password of the Agent for the Workspace Portal</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Employee ID */}
                                        <div className="space-y-2">
                                            <label htmlFor="employee_id" className="text-sm font-medium text-gray-700 block">
                                                Employee ID
                                            </label>
                                            <input
                                                id="employee_id"
                                                name="employee_id"
                                                type="text"
                                                value={inputs.employee_id.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.employee_id.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                placeholder="EMP001"
                                                required
                                            />
                                            {inputs.employee_id.error && <p className="text-red-500 text-xs mt-1">{inputs.employee_id.error}</p>}
                                        </div>

                                        {/* First Name */}
                                        <div className="space-y-2">
                                            <label htmlFor="first_name" className="text-sm font-medium text-gray-700 block">
                                                First Name
                                            </label>
                                            <input
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                value={inputs.first_name.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.first_name.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                placeholder="John"
                                                required
                                            />
                                            {inputs.first_name.error && <p className="text-red-500 text-xs mt-1">{inputs.first_name.error}</p>}
                                        </div>

                                        {/* Last Name */}
                                        <div className="space-y-2">
                                            <label htmlFor="last_name" className="text-sm font-medium text-gray-700 block">
                                                Last Name
                                            </label>
                                            <input
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                value={inputs.last_name.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.last_name.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                placeholder="Doe"
                                                required
                                            />
                                            {inputs.last_name.error && <p className="text-red-500 text-xs mt-1">{inputs.last_name.error}</p>}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={inputs.email.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.email.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                placeholder="john.doe@example.com"
                                                required
                                            />
                                            {inputs.email.error && <p className="text-red-500 text-xs mt-1">{inputs.email.error}</p>}
                                        </div>

                                        {/* Job Role */}
                                        <div className="space-y-2">
                                            <label htmlFor="job_role" className="text-sm font-medium text-gray-700 block">
                                                Job Role
                                            </label>
                                            <input
                                                id="job_role"
                                                name="job_role"
                                                type="text"
                                                value={inputs.job_role.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.job_role.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                placeholder="Customer Support Agent"
                                                required
                                            />
                                            {inputs.job_role.error && <p className="text-red-500 text-xs mt-1">{inputs.job_role.error}</p>}
                                        </div>

                                        {/* Team Name */}
                                        <div className="space-y-2">
                                            <label htmlFor="team_name" className="text-sm font-medium text-gray-700 block">
                                                Team Name
                                            </label>
                                            <input
                                                id="team_name"
                                                name="team_name"
                                                type="text"
                                                value={inputs.team_name.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.team_name.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                placeholder="Technical Support"
                                                required
                                            />
                                            {inputs.team_name.error && <p className="text-red-500 text-xs mt-1">{inputs.team_name.error}</p>}
                                        </div>

                                        {/* Date Hired */}
                                        <div className="space-y-2">
                                            <label htmlFor="date_hired" className="text-sm font-medium text-gray-700 block">
                                                Date Hired
                                            </label>
                                            <input
                                                id="date_hired"
                                                name="date_hired"
                                                type="date"
                                                value={inputs.date_hired.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.date_hired.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                                required
                                            />
                                            {inputs.date_hired.error && <p className="text-red-500 text-xs mt-1">{inputs.date_hired.error}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="system_role" className="text-sm font-medium text-gray-700 block">
                                                System Role
                                            </label>
                                            <select
                                                name="system_role"
                                                id="system_role"
                                                value={inputs.system_role.value}
                                                onChange={handleChange}
                                                className={`block w-full px-3 py-2 border ${inputs.system_role.error ? "border-red-300 ring-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`} required>
                                                <option value="">Select</option>
                                                <option value="agent">Agent</option>
                                            </select>
                                            {inputs.system_role.error && <p className="text-red-500 text-xs mt-1">{inputs.system_role.error}</p>}

                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
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
                                        {submitLoading ? "Submitting..." : "Add Employee"}

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Agents Management</h1>
                <p className="mt-1 text-sm text-gray-500">View and manage all BPO agents.</p>
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

                    <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-indigo-700 transition-colors">
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
                                    Employee ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Job Role
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date Hired
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {
                            fetchLoading ? <p>Fetching data</p> :
                                <tbody className="bg-white divide-y divide-gray-200">

                                    {
                                        agentData.map((agent, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                                                            {agent?.first_name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{agent.first_name} {agent.last_name}</div>
                                                            <div className="text-sm text-gray-500">{agent.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.employee_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.job_role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.date_hired}</td>

                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                        }

                    </table>
                </div>

                {/* Pagination */}
                {/* <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                </div> */}
            </div>
        </div>
    );
}

export default ManageAgents;