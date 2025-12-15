import React from 'react';
import { NavLink, Link } from 'react-router';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../../../components/logo/logo';
import useAuth from '../../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium ${
      isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
    }`;

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                <li><NavLink to="/contests" className={linkClass}>All Contests</NavLink></li>
                <li><NavLink to="/extra" className={linkClass}>Extra Section</NavLink></li>
              </ul>
            </div>

            <NavLink to="/" className="flex items-center">
              <Logo size={36} />
            </NavLink>
          </div>

          {/* Center */}
          <div className="hidden lg:flex gap-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/contests" className={linkClass}>All Contests</NavLink>
            <NavLink to="/extra" className={linkClass}>Extra Section</NavLink>
          </div>

          {/* Right */}
          <div>
            {!loading && (
              user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 h-10 px-4 rounded-md bg-teal-700 text-white text-sm hover:bg-gray-800 transition"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 h-10 px-4 rounded-md bg-teal-600 text-white text-sm hover:bg-teal-700 transition"
                >
                  <FaSignInAlt className="w-4 h-4" />
                  Login
                </Link>
              )
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
