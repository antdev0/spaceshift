import { icons } from "lucide-react"

export type LucideIconNames = keyof typeof icons


interface IconProps {
    name: LucideIconNames
    size?: number
    color?: string
    className?: string
}

const Icon = ({ name, color = 'currentColor', size = 16, className }: IconProps) => {
    if (!name || !(name in icons)) {
        return null;
    }
    const LucideIcon = icons[name];
    return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;