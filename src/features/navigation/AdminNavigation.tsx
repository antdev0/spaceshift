import Icon, { LucideIconNames } from "@components/Icon"
import { Link } from "react-router-dom";



const AdminNavigation = () => {
    const navLinks: {
        link: string;
        icon: LucideIconNames;
        label: string;
        ref: string;
    }[] = [
            {
                link: "/admin",
                icon: "House",
                label: "Dashboard",
                ref: "",
            },
            {
                link: "/admin/agents",
                icon: "Users",
                label: "Agents",
                ref: "agents",
            },
            {
                link: "/admin/schedules",
                icon: "Calendar",
                label: "Schedules",
                ref: "schedules",
            },
            {
                link: "/admin/reports",
                icon: "ChartColumn",
                label: "Reports",
                ref: "reports",
            },
            {
                link: "/admin/settings",
                icon: "Settings",
                label: "Settings",
                ref: "settings",
            },
        ]


    return (
        <nav className="flex flex-col gap-1">
            {
                navLinks.map((link, index) => (
                    <Link
                        key={index}
                        to={link.link}
                        className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <Icon name={link.icon} className="h-5 w-5 mr-3" />
                        {link.label}
                    </Link>
                ))
            }

        </nav>
    )
}

export default AdminNavigation;