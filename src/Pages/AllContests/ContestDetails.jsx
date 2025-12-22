import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaTrophy, FaUser, FaDollarSign, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
  const queryClient = useQueryClient();
   const [imageError, setImageError] = useState(false);

  const [timeLeft, setTimeLeft] = useState('');
    const [taskLink, setTaskLink] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Fetch contest details using TanStack Query
  const { data: contest, isLoading } = useQuery({
    queryKey: ['contest', id],
    queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data.find(ct => ct._id === id);
    },
    enabled: !!id,
  });

  const registered = contest?.participants?.includes(user?._id) || false;

  // Submission mutation
  const submitMutation = useMutation({
    mutationFn: async (data) => {
        return await axiosSecure.post('/submissions', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contest', id]);
        Swal.fire('Success', 'Task submitted successfully!', 'success');
      setTaskLink('');
      setShowTaskModal(false);
    },
    onError: (err) => {
       console.error(err);
      Swal.fire('Error', 'Submission failed', 'error');
    },
  });

  // Countdown timer
  useEffect(() => {
      if (!contest?.deadline) return;

    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(contest.deadline);

      if (isNaN(deadline.getTime())) {
        setTimeLeft('Invalid deadline');
        clearInterval(interval);
        return;
      }

      const diff = deadline - now;
      if (diff <= 0) {
        setTimeLeft('Contest Ended');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  // Get winner info
  const { data: winnerInfo } = useQuery({
    queryKey: ['winner', contest?.winnerId],
    queryFn: async () => {
        if (!contest?.winnerId) return null;
      const res = await axiosSecure.get('/users');
      return res.data.find(u => u._id === contest.winnerId);
    },
    enabled: !!contest?.winnerId,
  });

  const handleRegister = () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    navigate(`/contests/${id}/payment`);
  };

  const handleSubmitTask = () => {
    if (!taskLink.trim()) {
      Swal.fire('Error', 'Please provide a task link', 'error');
      return;
    }
    submitMutation.mutate({
      contestId: id,
       userId: user._id,
      userName: user.name || user.displayName,
        userEmail: user.email,
      taskLink: taskLink.trim(),
    });
  };

    if (isLoading) return <p className="p-4 text-center">Loading contest...</p>;
  if (!contest) return <p className="p-4 text-center">Contest not found</p>;

  const isEnded = new Date(contest.deadline) < new Date();
  const isCreator = contest.creatorId === user?._id;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden">
{ imageError?  <img

  src={'../../assets/Placeholder_Contest.png'} // main image
  alt={'place-holder contest'}
  className="w-full h-80 object-cover"
/> :  <img

  src={contest.image} // main image
  alt={contest.name}
  className="w-full h-80 object-cover"
  onError={() => { setImageError(true)}}
/>}

        <div className="p-6">
          <h2 className="text-3xl font-bold text-teal-600 mb-2">{contest.name}</h2>
          <p className="text-gray-700 mb-4 text-lg">{contest.description}</p>

          {/* Contest Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card bg-teal-50 border border-teal-200">
              <div className="card-body p-4">
                  <FaDollarSign className="text-2xl text-teal-600 mb-1" />
                <p className="text-sm text-gray-600">Prize Money</p>
                <p className="text-xl font-bold text-teal-600">${contest.prizeMoney}</p>
              </div>
            </div>
              <div className="card bg-blue-50 border border-blue-200">
              <div className="card-body p-4">
                <FaUsers className="text-2xl text-blue-600 mb-1" />
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-xl font-bold text-blue-600">{contest.participants?.length || 0}</p>
              </div>
            </div>
            <div className="card bg-purple-50 border border-purple-200">
              <div className="card-body p-4">
                  <FaDollarSign className="text-2xl text-purple-600 mb-1" />
                <p className="text-sm text-gray-600">Entry Fee</p>
                <p className="text-xl font-bold text-purple-600">${contest.price}</p>
              </div>
            </div>
            <div className="card bg-orange-50 border border-orange-200">
              <div className="card-body p-4">
                   <FaCalendarAlt className="text-2xl text-orange-600 mb-1" />
               <p className="text-sm text-gray-600">Type</p>
                <p className="text-xl font-bold text-orange-600">{contest.type}</p>
              </div>
            </div>
          </div>

          {/* Winner Section */}
          {contest.winnerId && winnerInfo && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg">
             <div className="flex items-center gap-4">
                <FaTrophy className="text-4xl text-yellow-500" />
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-700 mb-1">Winner!</h3>
                  <div className="flex items-center gap-3">
                    <img
                      src={winnerInfo.photoURL || 'https://via.placeholder.com/150'}
                      alt={winnerInfo.name}
                      className="w-12 h-12 rounded-full border-2 border-yellow-500"
                    />
                    <div>
                      <p className="font-semibold text-lg">{winnerInfo.name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-600">{winnerInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Task Instructions */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Task Instructions</h3>
               <p className="text-gray-700 whitespace-pre-wrap">{contest.taskInstruction}</p>
          </div>

          {/* Deadline Countdown */}
          <div className={`mb-6 p-4 rounded-lg ${isEnded ? 'bg-red-50 border-2 border-red-300' : 'bg-teal-50 border-2 border-teal-300'}`}>
            <p className={`font-semibold text-lg ${isEnded ? 'text-red-600' : 'text-teal-600'}`}>
              {isEnded ? ' Contest Ended' : ` Time Left: ${timeLeft}`}
            </p>
          </div>

          {/* Action Buttons */}
          {!isCreator && (
            <>
              {!isEnded && !registered && (
                <button className="btn btn-primary w-full mb-4 btn-lg" onClick={handleRegister}>
                  <FaDollarSign /> Register / Pay ${contest.price}
                </button>
              )}

              {!isEnded && registered && (
                <button
                  className="btn btn-success w-full mb-4 btn-lg"
                  onClick={() => setShowTaskModal(true)}
                >
                  Submit Task
                </button>
              )}

              {isEnded && !registered && (
                <button className="btn btn-disabled w-full mb-4" disabled>
                  Contest Ended - Registration Closed
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Task Submission Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold text-teal-600 mb-4">Submit Your Task</h3>
            <p className="text-sm text-gray-600 mb-4">
              Provide the link to your completed task (e.g., GitHub repo, Figma link, Google Doc, etc.)
            </p>
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              value={taskLink}
              onChange={e => setTaskLink(e.target.value)}
              placeholder="Paste your task link here (e.g., https://github.com/username/project)"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowTaskModal(false);
                  setTaskLink('');
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                   onClick={handleSubmitTask}
                disabled={submitMutation.isPending || !taskLink.trim()}
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
