import React from 'react';
import Logo from '../../../../components/logo/logo';
import { NavLink } from 'react-router';

const Navbar = () => {
  const links = (
    <>
      <li><NavLink to=''>Home</NavLink></li>
      <li><NavLink to=''>All Contests</NavLink></li>
      <li><NavLink to=''>Extra Section</NavLink></li>
    
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <a href="#" className="normal-case text-xl flex items-center">
          <Logo className="h-10 w-10 rounded-full" />
          <span className="ml-2 font-bold">SkillArena</span>
        </a>
      </div>

      {/* Navbar Center (Desktop Links) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <a href="#" className="btn btn-secondary">
          Button
        </a>
      </div>
    </div>
  );
};

export default Navbar;
