import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useRole } from "../../context/RoleContext";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { role, setRole } = useRole();

    return (
        <nav className="w-full border-b border-[var(--border)] bg-[var(--bg)]">
            <div className="container-app flex items-center justify-between py-4">

                {/* 🔹 Logo */}
                <span className="logo-text text-2xl font-bold">
                    Fin<span className="text-blue-500">Track</span>
                </span>

                {/* 🔹 Center Navigation (Pill) */}
                <div className="hidden md:flex items-center bg-[var(--card)] border border-[var(--border)] rounded-full p-1 shadow-sm">
                    <NavItem to="/" label="Dashboard" />
                    <NavItem to="/transactions" label="Transactions" />
                    <NavItem to="/reports" label="Reports" />
                </div>

                {/* 🔹 Right Controls (Pill) */}
                <div className="flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] rounded-full px-3 py-1 shadow-sm">

                    {/* Role */}
                    <select
                        className="bg-transparent text-sm outline-none"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                    </select>

                    {/* Divider */}
                    <div className="w-px h-5 bg-[var(--border)]" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="text-lg hover:scale-110 transition"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ to, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
        px-4 py-1.5 rounded-full text-sm font-medium transition
        ${isActive
                    ? "bg-gray-900 text-white"
                    : "text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-gray-800"
                }
        `
            }
        >
            {label}
        </NavLink>
    );
};

export default Navbar;