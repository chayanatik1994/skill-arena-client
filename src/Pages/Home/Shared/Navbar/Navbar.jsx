import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { FaSignInAlt, FaSignOutAlt, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import Logo from '../../../../components/logo/Logo';
import useAuth from '../../../../hooks/useAuth';
import Avatar from '../../../../components/Avatar';

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
          <NavLink to="/" className="flex items-center">
            <Logo size={36} />
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-2 items-center">
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/contests" className={linkClass}>All Contests</NavLink></li>
              <li><NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink></li>
            <li><NavLink to="/statistics" className={linkClass}>Statistics</NavLink></li>
             <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/extra" className={linkClass}>Extra Section</NavLink></li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn btn-ghost btn-square">
              <FaBars className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side: Theme Toggle, Profile/Login */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
            </button>

            {!loading && (
              user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <Avatar
                  name={user?.displayName || user?.name || 'User'}
             email={user?.email}
  photoURL={user?.photoURL || 'https://i.ibb.co/hRNkzFqh/smiling-redhaired-boy-illustrati.png'}
  className="w-10 h-10"
/>
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                    <li className="font-bold px-3 py-1">{user?.displayName || user?.name || 'User'}</li>
                    <li><Link to="/dashboard" className="px-3 py-1 hover:bg-base-200">Dashboard</Link></li>
                    <li>
                      <button
                          onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-3 py-1 hover:bg-base-200"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                    to="/auth/login"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="lg:hidden menu bg-white border-t shadow-sm p-4 gap-2">
          <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/contests" className={linkClass}>All Contests</NavLink></li>
          <li><NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink></li>
          <li><NavLink to="/statistics" className={linkClass}>Statistics</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
          <li><NavLink to="/extra" className={linkClass}>Extra Section</NavLink></li>
          {user && (
            <li>
              <NavLink to="/dashboard/my-participated-contests" className={linkClass}>
                Participated Users
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
