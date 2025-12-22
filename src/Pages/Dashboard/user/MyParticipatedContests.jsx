import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa';

const MyParticipatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('deadline'); 

  // Fetch contests using TanStack Query
  const { data: allContests = [] } = useQuery({
    queryKey: ['contests', 'user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data;
    },
    enabled: !!user?._id,
  });

  // Fetch submissions using TanStack Query
  const { data: userSubmissions = [] } = useQuery({
    queryKey: ['submissions', 'user', user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/user/${user._id}`);
      return res.data;
    },
    enabled: !!user?._id,
  });

  // Fetch payments using TanStack Query
  const { data: userPayments = [] } = useQuery({
    queryKey: ['payments', 'user', user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user._id}`);
      return res.data;
    },
    enabled: !!user?._id,
  });

  // Process and sort contests
  const contests = useMemo(() => {
    const participatedContests = allContests
      .filter(c => c.participants?.includes(user?._id))
      .map(contest => {
        const submission = userSubmissions.find(s => s.contestId === contest._id);
        const payment = userPayments.find(p => p.contestId === contest._id);
        return {
          ...contest,
          submission,
          paymentStatus: payment?.status || (submission ? 'paid' : 'pending')
        };
      });

    // Sort by deadline or name
    participatedContests.sort((a, b) => {
      if (sortBy === 'deadline') {
        const dateA = new Date(a.deadline || 0);
        const dateB = new Date(b.deadline || 0);
        return dateA - dateB;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return participatedContests;
  }, [allContests, userSubmissions, userPayments, user?._id, sortBy]);

  const loading = !allContests.length && !userSubmissions.length;

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

  const getTimeRemaining = (deadline) => {
    if (!deadline) return 'N/A';
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!contests.length) return <p className="p-4">You have not participated in any contests yet.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Participated Contests</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered"
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.map(contest => (
          <div
            key={contest._id}
              className="card bg-base-100 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate(`/contests/${contest._id}`)}
          >
            <figure>
              <img src={contest.image} alt={contest.name} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">{contest.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{contest.description}</p>
              
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-green-600" />
                  <span className="text-sm">Fee: ${contest.price}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {contest.paymentStatus === 'paid' ? (
                    <>
                      <FaCheckCircle className="text-green-600" />
                      <span className="text-sm text-green-600">Payment: Paid</span>
                    </>
                  ) : (
                    <>
                      <FaClock className="text-yellow-600" />
                      <span className="text-sm text-yellow-600">Payment: Pending</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  <span className="text-sm">
                    Deadline: {formatDate(contest.deadline)}
                  </span>
                </div>

                <div className="badge badge-info">
                  {getTimeRemaining(contest.deadline)}
                </div>
              </div>

              {contest.submission && (
                <div className="mt-2">
                  <a
                    href={contest.submission.taskLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Submission →
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParticipatedContests;
