import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaUser, FaInfoCircle, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Avatar from '../../../components/Avatar';

const MyProfile = () => {
  const { user, setUser } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState(user?.name || '');
   const [bio, setBio] = useState(user?.bio || '');
   const [address, setAddress] = useState(user?.address || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [winStats, setWinStats] = useState({ participated: 0, won: 0 });

  // Fetch win statistics
  useEffect(() => {
    const fetchStats = async () => {
    if (!user?._id) return;
      try {
        const [contestsRes] = await Promise.all([
          axiosSecure.get('/contests'),
        ]);
         const allContests = contestsRes.data;
        const participated = allContests.filter(c => c.participants?.includes(user._id));
          const won = allContests.filter(c => c.winnerId === user._id);
        setWinStats({ participated: participated.length, won: won.length });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, [user?._id, axiosSecure]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const response = await axios.post(imageAPI_URL, formData);
      // Use url (more reliable) with fallback to display_url
      const uploadedUrl = response.data?.data?.url || response.data?.data?.display_url;
      if (uploadedUrl) {
        setPhotoURL(uploadedUrl);
      } else {
        throw new Error('No URL returned from image upload');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      Swal.fire('Error', 'Failed to upload photo. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      // Ensure photoURL is not empty - use existing user photoURL as fallback
      const finalPhotoURL = photoURL || user?.photoURL || "https://i.ibb.co/hRNkzFqh/smiling-redhaired-boy-illustrati.png";
      const updateData = { name, bio, address, photoURL: finalPhotoURL };
      const res = await axiosSecure.patch(`/users/${user._id}`, updateData);
      
      if (res.data) {
        setUser(prev => ({ ...prev, ...updateData }));
        Swal.fire({
          icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile information has been successfully updated.',
          confirmButtonColor: '#14b8a6',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Unable to update profile. Please try again.',
        confirmButtonColor: '#14b8a6',
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Won', value: winStats.won },
    { name: 'Participated', value: winStats.participated - winStats.won },
  ];
  const COLORS = ['#00C49F', '#FF8042'];
  const winPercentage = winStats.participated > 0 
    ? ((winStats.won / winStats.participated) * 100).toFixed(1) 
    : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-teal-600 text-center flex items-center justify-center gap-2">
        <FaUser /> My Profile
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
          {/* Photo Upload */}
          <div className="mb-6 text-center">
            <div className="relative inline-block">
              <Avatar
                name={name || user?.displayName || user?.name}
                  email={user?.email}
                photoURL={photoURL || user?.photoURL}
                className="w-32 h-32 border-4 border-teal-200"
              />
              <label className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600">
                <FaCamera />
                <input
                  type="file"
                    accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-4 relative">
            <FaUser className="absolute top-3 left-3 text-teal-400" />
            <input
              className="pl-10 input input-bordered w-full border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>

          {/* Bio Field */}
          <div className="mb-4 relative">
            <FaInfoCircle className="absolute top-3 left-3 text-teal-400" />
            <textarea
                className="pl-10 textarea w-full border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell something about yourself..."
              rows={4}
            />
          </div>

          {/* Address Field */}
          <div className="mb-6 relative">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-teal-400" />
            <input
              className="pl-10 input input-bordered w-full border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Your Address"
            />
          </div>

          <button
            className="btn bg-teal-500 hover:bg-teal-600 text-white w-full font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? 'Updating...' : <>
              <FaUser /> Update Profile
            </>}
          </button>
        </div>

        {/* Right: Win Percentage Chart */}
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-teal-600">Win Statistics</h3>
          {winStats.participated > 0 ? (
            <>
              <div className="flex justify-center mb-4">
                <PieChart width={250} height={250}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                      cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                    <Tooltip />
                  <Legend />
                </PieChart>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-teal-600">{winPercentage}%</p>
                <p className="text-gray-600">Win Rate</p>
                <div className="flex justify-around mt-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{winStats.won}</p>
                    <p className="text-sm text-gray-600">Won</p>
                  </div>
                    <div>
                    <p className="text-2xl font-bold text-blue-600">{winStats.participated}</p>
                    <p className="text-sm text-gray-600">Participated</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No contests participated yet</p>
              <p className="text-sm mt-2">Start participating to see your stats!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
