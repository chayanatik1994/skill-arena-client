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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row-reverse">

        {/* Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
          <img
            src={ForgotImg}
            alt="Forgot Password"
            className="max-w-sm w-full"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Forgot Password</h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit(handleReset)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-1 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-teal-700'
                  }`}
                  placeholder="you@example.com"
                />
              </div>

              {/* Red error line */}
              {errors.email && (
                <div className="mt-2 flex items-center gap-1 text-xs text-red-600 border-l-4 border-red-500 pl-2">
                  <FiAlertCircle />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Global messages */}
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-teal-700 py-2.5 text-sm font-medium text-white hover:bg-teal-800 transition flex items-center justify-center gap-2"
            >
              <FiMail />
              Send Reset Email
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm text-teal-600 flex items-center justify-center gap-1">
            <FiArrowLeft />
            <Link to="/login" className="font-medium text-teal-800 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
