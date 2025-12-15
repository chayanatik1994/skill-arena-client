import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    setAuthError('');
    try {
      let photoURL = '';

      // Upload image if exists
      const profileFile = data.photoURL?.[0];
      if (profileFile) {
        const formData = new FormData();
        formData.append('image', profileFile);
        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const response = await axios.post(imageAPI_URL, formData);
        photoURL = response.data.data.url;
      }

      // Register user
      const result = await registerUser(data.email, data.password);

      // Update profile
      await updateUserProfile({ displayName: data.name, photoURL });

      // Navigate after registration
      navigate('/');
    } catch (error) {
      setAuthError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border rounded-md px-3 py-2"
              />
              {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <input
                type="file"
                {...register("photoURL")}
                accept="image/*"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border rounded-md px-3 py-2"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required", minLength: 6 })}
                className="w-full border rounded-md px-3 py-2"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs mt-1">
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>

            {/* Error */}
            {authError && <p className="text-sm text-red-600 text-center">{authError}</p>}

            <button type="submit" className="w-full py-2 rounded-md bg-teal-700 text-white">Register</button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account? <Link to="/login" className="text-teal-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
