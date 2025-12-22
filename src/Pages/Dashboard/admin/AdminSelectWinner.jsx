import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
<<<<<<< HEAD
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

=======
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
const AdminSelectWinner = ({ contest }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState('');

  // Fetch all users to get participant details
  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

<<<<<<< HEAD
  // Get participants for this contest (filter out admin users)
=======
  // Get participants 
>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
  const participants = React.useMemo(() => {
    if (!contest?.participants || !allUsers.length) return [];
    
    return contest.participants
      .map(participantId => {
        const user = allUsers.find(u => u._id === participantId);
        return user;
      })
<<<<<<< HEAD
      .filter(user => user && user.role !== 'admin') // Filter out admin users
=======
      .filter(user => user && user.role !== 'admin') 
>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
      .filter(Boolean);
  }, [contest?.participants, allUsers]);

  const handleSelectWinner = async () => {
    if (!selectedUserId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select a participant'
      });
      return;
    }

    Swal.fire({
      title: 'Select Winner?',
      text: 'Are you sure you want to select this participant as the winner?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, select winner!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/contests/${contest._id}`, {
            winnerId: selectedUserId,
            status: 'completed'
          });

          // Refresh all relevant queries
          queryClient.invalidateQueries(['leaderboard']);
          queryClient.invalidateQueries(['contests']);
          queryClient.invalidateQueries(['winners']);
          queryClient.invalidateQueries(['contests', 'user-wins']);

          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Winner selected and leaderboard updated!'
          });
          setSelectedUserId(''); // Reset selection
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to select winner'
          });
        }
      }
    });
  };

  if (!contest) return null;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{contest.name}</h3>
      {participants.length === 0 ? (
        <p className="text-gray-500 mb-4">No participants available (excluding admins)</p>
      ) : (
        <>
          <select
            className="select select-bordered w-full mb-2"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select Winner</option>
            {participants.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name || p.displayName || p.email || 'Anonymous'}
              </option>
            ))}
          </select>
          <button 
            className="btn btn-primary w-full" 
            onClick={handleSelectWinner}
            disabled={!selectedUserId || contest.winnerId}
          >
            {contest.winnerId ? 'Winner Already Selected' : 'Select Winner'}
          </button>
          {contest.winnerId && (
            <p className="text-sm text-green-600 mt-2">
              Winner: {participants.find(p => p._id === contest.winnerId)?.name || 'Selected'}
            </p>
          )}
        </>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default AdminSelectWinner;
=======
export default AdminSelectWinner;
>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
