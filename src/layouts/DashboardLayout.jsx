import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { FaHome, FaCog, FaUsers } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-200 ${
      isActive ? 'bg-teal-500 text-white' : 'text-black'
    }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 px-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
              <span className="ml-4 font-bold text-lg">SkillArena Dashboard</span>
            </div>

            {/* Collapse toggle for large screens */}
            <button
              className="hidden lg:inline btn btn-ghost btn-sm"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul
          className={`menu p-4 bg-base-200 h-full flex flex-col gap-2 transition-all ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Dashboard */}
          <li>
            <NavLink to="/" className={linkClass}>
              <FaHome />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>

          {/* Participated Users */}
          {user && (
            <li>
              <NavLink to="/dashboard/my-participated-contests" className={linkClass}>
                <FaUsers />
                {!collapsed && <span>Participated Users</span>}
              </NavLink>
            </li>
          )}

          {/* Settings */}
          <li>
            <NavLink to="/dashboard/settings" className={linkClass}>
              <FaCog />
              {!collapsed && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
