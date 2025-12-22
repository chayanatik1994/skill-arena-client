import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const navigate = useNavigate();

  // Check if admin exists
  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        const existingAdmin = res.data.find(u => u.role === 'admin');
        setShowAdmin(!existingAdmin); 
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleRegistration = async (data) => {
    setLoading(true);
    try {
      const trimmedName = data.name?.trim() || '';
      const name = trimmedName || data.email.trim().split('@')[0] || 'User';
      const email = data.email.trim();
      const password = data.password;
      const defaultAvatar = "https://i.ibb.co/hRNkzFqh/smiling-redhaired-boy-illustrati.png";
      let photoURL = defaultAvatar;

      // Upload profile photo if provided
      const profileFile = data.photoURL?.[0];
      if (profileFile) {
        try {
          const formData = new FormData();
          formData.append('image', profileFile);
          const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
          const response = await axios.post(imageAPI_URL, formData);
          photoURL = response.data?.data?.url || response.data?.data?.display_url || defaultAvatar;
        } catch (imageError) {
          console.warn('Image upload failed, using default avatar:', imageError);
          Swal.fire({
            icon: 'warning',
            title: 'Image Upload Failed',
            text: 'Using default avatar. You can update your photo later in profile settings.',
            timer: 3000,
            showConfirmButton: false
          });
        }
      }

      // Firebase registration
      const userCredential = await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });

      // Save user to backend
      const selectedRole = data.role || 'user';
      const userData = { email: userCredential.user.email, name, photoURL, role: selectedRole, bio: '' };
      await axios.post('http://localhost:3000/users', userData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        html: `
          <p>Welcome, <strong>${name}</strong>!</p>
          <p>Registered as: <strong>${selectedRole}</strong></p>
          <img src="${photoURL}" alt="Avatar" class="rounded-full mt-2" style="width:80px;height:80px;">
        `,
        showConfirmButton: true
      });

      navigate('/auth/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full border rounded-md px-3 py-2"
              />
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs mt-1"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password.type === 'minLength'
                    ? 'Password must be at least 6 characters'
                    : errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Register As *</label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all">
                  <input
                    type="radio"
                    {...register("role", { required: "Please select a role" })}
                    value="user"
                    defaultChecked
                    className="radio radio-primary radio-sm mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">User</div>
                    <p className="text-xs text-gray-600 mt-1">Participate in contests, submit tasks, and win prizes</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all">
                  <input
                    type="radio"
                    {...register("role", { required: "Please select a role" })}
                    value="creator"
                    className="radio radio-info radio-sm mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Contest Creator</div>
                    <p className="text-xs text-gray-600 mt-1">Create contests, manage submissions, and declare winners</p>
                  </div>
                </label>

                {/* Admin option - only visible if no admin exists */}
                {showAdmin && (
                  <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-400 hover:bg-red-50 transition-all">
                    <input
                      type="radio"
                      {...register("role", { required: "Please select a role" })}
                      value="admin"
                      className="radio radio-error radio-sm mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Admin</div>
                      <p className="text-xs text-red-600 mt-1">Full system access. Only allowed if no admin exists.</p>
                    </div>
                  </label>
                )}
              </div>
              {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-teal-700'}`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account? <Link to="/auth/login" className="text-teal-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
