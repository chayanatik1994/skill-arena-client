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
    `px-3 py-2 text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <Logo size={36} />
          </NavLink>

          {/* Menu */}
          <div className="hidden lg:flex gap-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/contests" className={linkClass}>All Contests</NavLink>
            <NavLink to="/extra" className={linkClass}>Extra Section</NavLink>
          </div>

          {/* Right: Profile / Login */}
          {!loading && (
            user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-2">
                  <li className="font-bold px-3 py-1">{user?.displayName || 'User'}</li>
                  <li>
                    <Link to="/dashboard" className="px-3 py-1 hover:bg-gray-100">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-1 hover:bg-gray-100"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
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
    </nav>
  );
};

export default Navbar;
