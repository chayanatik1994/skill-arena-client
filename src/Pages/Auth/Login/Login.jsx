import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setAuthError('');
    try {
      await signInUser(data.email, data.password);
      navigate('/'); 
    } catch {
      setAuthError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome to SkillArena</h1>
          <p className="mt-2 text-sm text-gray-500">Access your account</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", { required: "Password is required" })}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-xs text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            {authError && <p className="text-sm text-red-600 text-center">{authError}</p>}

            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-gray-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <SocialLogin />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="font-medium text-gray-900 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
