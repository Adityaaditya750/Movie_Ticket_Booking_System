import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa6";
import { MdTheaters, MdSchedule } from "react-icons/md";
import { MdMovieFilter } from "react-icons/md";

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <RxDashboard />,
    },
    {
      name: "Users",
      path: "/admin/adminuser",
      icon: <FaUser />,
    },
    {
      name: "Movies",
      path: "/admin/movie",
      icon: <BiSolidMoviePlay />,
    },
    {
      name: "Show Timings",
      path: "/admin/showtiming",
      icon: <MdSchedule />,
    },
    {
      name: "Theatres",
      path: "/admin/theatre",
      icon: <MdTheaters />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-xl">
      {/* Logo / Header */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-extrabold tracking-wide text-red-500 flex gap-2">
          <MdMovieFilter className="mt-1 text-amber-50"/> MovieAdmin
        </h1>
        <p className="text-xs text-gray-400 mt-1">Manage your cinema</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
              ${
                isActive
                  ? "bg-red-600 shadow-lg scale-[1.02]"
                  : "hover:bg-gray-700 hover:translate-x-1"
              }`}
            >
              <span
                className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`font-medium tracking-wide ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 py-2.5 rounded-lg font-semibold
          hover:bg-red-700 hover:shadow-lg transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
