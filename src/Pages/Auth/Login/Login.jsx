import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInUser(data.email, data.password);
      const currentUser = userCredential.user;

      setUser({
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
      });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${currentUser.displayName || currentUser.email}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password", { required: "Password is required" })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}

            {/* Forgot Password Link */}
            <div className="mt-2 text-right">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-red-700 hover:text-red-800 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-teal-700'} transition`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-4"><SocialLogin /></div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account? <Link to="/auth/register" className="text-teal-700 hover:text-teal-800">Register</Link>
        </p>
<<<<<<< HEAD
=======
        <Link
        to="/"
       className="mt-4 inline-block text-sm text-teal-700 hover:underline items-center"
         >
         Back Home
       </Link>
>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
      </div>
       
    </div>
  );
};

export default Login;
