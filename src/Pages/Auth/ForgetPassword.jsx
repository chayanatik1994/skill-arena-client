import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FiMail, FiAlertCircle, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import ForgotImg from '../../assets/ForgetPassword.jpg';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (data) => {
    setMessage('');
    setError('');
    try {
      await resetPassword(data.email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse">
        {/* Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
          <img src={ForgotImg} alt="Forgot Password" className="max-w-md w-full object-cover" />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your email below and we’ll send you instructions to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit(handleReset)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className={`w-full rounded-lg border px-10 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <div className="mt-2 flex items-center gap-2 text-xs text-red-600 border-l-4 border-red-500 pl-2">
                  <FiAlertCircle />
                  <span>{errors.email.message}</span>
                </div>
              )}

              {/* Forgot Password Link */}
              <div className="mt-2 text-right">
                <Link
                  to="/login/auth/forget-password"
                  className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Error / Success Messages */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 border-l-4 border-red-500 pl-3">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="flex items-center gap-2 text-sm text-teal-700 border-l-4 border-teal-700 pl-3">
                <FiCheckCircle />
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-3 text-sm font-medium text-white hover:bg-teal-700 shadow-md transition flex items-center justify-center gap-2"
            >
              <FiMail />
              Send Reset Email
            </button>
          </form>

          {/* Back to Login */}
          <p className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
            <FiArrowLeft className="text-teal-500" />
            <Link
              to="/auth/login"
              className="font-medium text-teal-600 hover:text-teal-700 hover:underline transition"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
