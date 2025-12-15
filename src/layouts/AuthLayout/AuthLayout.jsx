import React from 'react';
import Logo from '../../components/logo/Logo';
import { Outlet, useLocation } from 'react-router';
import Loginimg from '../../assets/LoginImg.png';
import SignUpimg from '../../assets/SignUpImg.png';

const AuthLayout = () => {
  const location = useLocation();

  const isLogin = location.pathname.includes('login');

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* Logo Section */}
      <div className="py-6">
        <Logo size={50} />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Form Area */}
        <div className="w-full">
          <Outlet />
        </div>

        {/* Side Image */}
        <div className="flex justify-center">
          <img
            src={isLogin ? Loginimg : SignUpimg}
            alt="Auth Illustration"
            className="w-full max-w-md md:max-w-lg object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
