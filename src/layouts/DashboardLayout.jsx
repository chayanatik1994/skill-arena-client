import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { FaCog, FaUsers, FaPlus, FaTasks, FaHome } from 'react-icons/fa';
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

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-base-300 px-4">
          <div className="flex items-center justify-between w-full">
              <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="w-6 h-6">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
            <span className="ml-2 font-bold text-lg">SkillArena Dashboard</span>
            <button className="hidden lg:inline btn btn-ghost btn-sm" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            </button>
          </div>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className={`menu p-4 bg-base-200 h-full flex flex-col gap-2 transition-all ${collapsed ? 'w-20' : 'w-64'}`}>

          {/* Home */}
          <li>
             <NavLink to="/" className={linkClass}>
              <FaHome /> {!collapsed && <span>Home</span>}
            </NavLink>
          </li>

          {/* My Profile */}
          <li>
            <NavLink to="/dashboard/my-profile" className={linkClass}>
              <FaCog /> {!collapsed && <span>My Profile</span>}
            </NavLink>
          </li>

          {/* User Links */}
          {user?.role === 'user' && (
            <>
              <li>
                <NavLink to="/dashboard/my-participated-contests" className={linkClass}>
                  <FaUsers /> {!collapsed && <span>Participated Contests</span>}
                </NavLink>
              </li>
              <li>
                   <NavLink to="/dashboard/my-winning-contests" className={linkClass}>
                  <FaUsers /> {!collapsed && <span>Winning Contests</span>}
                </NavLink>
              </li>
            </>
          )}

          {/* Creator Links */}
          {user?.role === 'creator' && (
            <>
              <li>
                  <NavLink to="/dashboard/add-contest" className={linkClass}>
                  <FaPlus /> {!collapsed && <span>Add Contest</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-created-contests" className={linkClass}>
                  <FaTasks /> {!collapsed && <span>My Created Contests</span>}
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Links */}
          {user?.role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users" className={linkClass}>
                  <FaUsers /> {!collapsed && <span>Manage Users</span>}
                  </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-contests" className={linkClass}>
                      <FaTasks /> {!collapsed && <span>Manage Contests</span>}
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
