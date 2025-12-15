import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleRegistration = async (data) => {
    setAuthError('');

    try {
      // Upload image if provided
      let photoURL = '';
      const profileFile = data.photoURL?.[0];
      if (profileFile) {
        const formData = new FormData();
        formData.append('image', profileFile);

        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const response = await axios.post(imageAPI_URL, formData);
        photoURL = response.data.data.url;
        console.log('Uploaded image URL:', photoURL);
      }

      // Register user
      const result = await registerUser(data.email, data.password);
      console.log('User registered:', result.user);

      // Update profile
      const profile = { displayName: data.name, photoURL };
      await updateUserProfile(profile);
      console.log('User profile updated complete');

    } catch (error) {
      setAuthError(error.response?.data?.message || error.message || 'Unable to create account. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome to SkillArena</h1>
          <p className="mt-2 text-sm text-gray-500">Start your SkillArena journey</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1
                  ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'}`}
                placeholder="Full Name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <input
                type="file"
                {...register("photoURL")}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 border-gray-300 focus:ring-gray-900 file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:rounded-md file:text-sm file:cursor-pointer"
                accept="image/*"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1
                  ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'}`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).+$/, message: "Include uppercase & lowercase letters" }
                  })}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1
                    ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'}`}
                  placeholder="Create a secure password"
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

            {/* Auth Error */}
            {authError && <p className="text-sm text-red-600 text-center">{authError}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-teal-700 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Register
            </button>
          </form>

          {/* Social Login */}
          <SocialLogin />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-gray-900 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
