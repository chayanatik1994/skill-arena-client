import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
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
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError('Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row-reverse">

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
          <img
            src={ForgotImg}
            alt="Forgot Password"
            className="max-w-sm w-full"
          />
        </div>

        {/* Form Section */}
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
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-gray-900'
                }`}
                placeholder="Your Email Address"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Messages */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            {message && <p className="text-sm text-green-600 text-center">{message}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-teal-700 py-2.5 text-sm font-medium text-white hover:bg-teal-800 transition"
            >
              Send Reset Email
            </button>
          </form>

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-teal-800 hover:underline">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
