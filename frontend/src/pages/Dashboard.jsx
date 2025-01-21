import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  // Protect the route
  React.useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Add logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.get("/api/logout");
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      sessionStorage.clear();
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl lg:hidden"
          >
            &#9776;
          </button>
          <span className="text-xl font-bold">
            Contract <span className="text-blue-400">Portal</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="text-white text-lg relative">
              <span className="material-icons">🔔</span>
              <span className="absolute top-0 right-0 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                5
              </span>
            </button>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              <img
                src="https://placehold.co/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{user.username || "User"}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 z-10">
                <ul className="text-gray-800">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    User Preferences
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Account Settings
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-600 ${
                      isLoggingOut ? "opacity-50" : ""
                    }`}
                    onClick={!isLoggingOut ? handleLogout : undefined}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
          <button className="flex flex-col items-center text-blue-400">
            <span className="material-icons text-2xl">📱</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl">🔎</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl">🧔</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl">💼</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl">📅</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl">📝</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl">🗨</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons text-2xl"></span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 grid grid-cols-2 gap-4 p-6 bg-gray-100">
          <div className="bg-white rounded shadow p-4">Content Box 1</div>
          <div className="bg-white rounded shadow p-4">Content Box 2</div>
          <div className="bg-white rounded shadow p-4">Content Box 3</div>
          <div className="bg-white rounded shadow p-4">Content Box 4</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
