import React from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrophy, FaUser, FaEnvelope, FaLink, FaCalendar, FaCheckCircle } from 'react-icons/fa';

const Submissions = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch contest using TanStack Query
  const { data: contest } = useQuery({
    queryKey: ['contest', contestId],
    queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data.find(ct => ct._id === contestId);
    },
    enabled: !!contestId,
  });

  // Fetch submissions using TanStack Query
  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions', contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${contestId}`);
      return res.data;
    },
    enabled: !!contestId,
  });

  // Fetch users using TanStack Query
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Declare winner
  const declareWinnerMutation = useMutation({
    mutationFn: async ({ contestId, winnerId }) => {
      return await axiosSecure.patch(`/contests/${contestId}/status`, {
        winnerId,
        status: 'ended'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contest', contestId]);
      queryClient.invalidateQueries(['contests']);
      queryClient.invalidateQueries(['leaderboard']);
      queryClient.invalidateQueries(['winners']);
      Swal.fire('Winner Declared!', 'The winner has been successfully declared!', 'success');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to declare winner', 'error');
    },
  });

  const handleDeclareWinner = (submission) => {
    Swal.fire({
      title: 'Declare Winner?',
      text: `Are you sure you want to declare ${submission.userName || submission.userEmail} as the winner?`,
      icon: 'question',
        showCancelButton: true,
      confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, declare winner!'
    }).then((result) => {
      if (result.isConfirmed) {
        declareWinnerMutation.mutate({
          contestId,
          winnerId: submission.userId
        });
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getParticipantInfo = (submission) => {
    const user = users.find(u => u.email === submission.userEmail || u._id === submission.userId);
    return {
      name: user?.name || submission.userName || 'Unknown',
      email: user?.email || submission.userEmail || 'N/A',
      photo: user?.photoURL || '',
      role: user?.role || 'user'
    };
  };

  if (!contest) return <p className="p-4">Loading contest...</p>;

  // Filter out submissions from admin users
  const filteredSubmissions = submissions.filter(s => {
    const participant = getParticipantInfo(s);
    return participant.role !== 'admin';
  });

  const winner = filteredSubmissions.find(s => s.userId === contest.winnerId);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-teal-600 mb-2">{contest.name} - Submissions</h2>
          <p className="text-gray-600">Total Submissions: {filteredSubmissions.length} (excluding admins)</p>
        {contest.status === 'ended' && winner && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <FaTrophy className="text-2xl" />
              <div>
                <p className="font-bold text-lg">Winner Declared!</p>
                <p className="text-sm">{getParticipantInfo(winner).name} ({getParticipantInfo(winner).email})</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
           <p className="text-gray-500 text-lg">No submissions yet</p>
          <p className="text-gray-400 text-sm mt-2">Participants will appear here once they submit their tasks (admin submissions are excluded)</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubmissions.map(s => {
            const participant = getParticipantInfo(s);
            const isWinner = contest.winnerId === s.userId;

            return (
              <div
                key={s._id}
                className={`card bg-base-100 shadow-lg border-2 ${
                  isWinner ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                          <img src={participant.photo || 'https://via.placeholder.com/150'} alt={participant.name} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {participant.name}
                         {isWinner && <FaTrophy className="text-yellow-500" />}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaEnvelope className="text-xs" />
                        {participant.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaLink className="text-blue-500" />
                      <a
                        href={s.taskLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        View Submission
                      </a>
                    </div>

                    {s.submittedAt && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendar />
                        Submitted: {formatDate(s.submittedAt)}
                      </div>
                    )}

                    {s.taskInfo && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                        <p className="font-semibold mb-1">Task Info:</p>
                        <p className="text-gray-700">{s.taskInfo}</p>
                      </div>
                    )}
                  </div>

                  {contest.status !== 'ended' && !isWinner && (
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleDeclareWinner(s)}
                      >
                        <FaTrophy /> Declare Winner
                      </button>
                    </div>
                  )}

                  {isWinner && (
                    <div className="mt-4 p-2 bg-green-100 rounded flex items-center gap-2 text-green-700">
                      <FaCheckCircle />
                      <span className="font-semibold">Winner</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Submissions;
