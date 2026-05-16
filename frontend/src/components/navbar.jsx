import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ onLogout, username, darkMode, setDarkMode }) {
  return (
    <nav className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 shadow-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            ✓
          </div>
          <span className="font-semibold text-lg">Task Manager</span>
        </div>

        
        <div className="flex items-center gap-4">

          <div className="text-sm text-gray-300">
            👤 {username}
          </div>
          <button
  onClick={() => setDarkMode(!darkMode)}
  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;