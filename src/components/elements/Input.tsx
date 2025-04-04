import Icon from "@components/Icon";
import { icons } from "lucide-react";


interface InputProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    icon?: keyof typeof icons | null;
}

const Input = ({ label, icon = null, value, onChange, placeholder, error = null, name, type = "text" }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 block">
                {label}
            </label>
            <div className="relative">
                {
                    icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name={icon} className="h-5 w-5 text-gray-400" />
                    </div>
                }

                <input
                    id={name}
                    name={name}
                    type={type}
                    onChange={onChange}
                    value={value}
                    className={`block w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder={placeholder}
                />

            </div>
            <p className="text-red-500 text-sm italic">{error}</p>
        </div>
    );
}

export default Input;