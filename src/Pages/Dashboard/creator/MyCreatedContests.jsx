import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaEye, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const MyCreatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch contests created by this user using TanStack Query
  const { data: contests = [], isLoading: loading } = useQuery({
    queryKey: ['contests', 'creator', user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data.filter(c => c.creatorId === user._id);
    },
    enabled: !!user?._id,
  });

  // Delete contest mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/contests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contests']);
      Swal.fire('Deleted!', 'Contest has been deleted.', 'success');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed the delete contest', 'error');

    },
  });

  // Delete pending contest
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
        icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge badge-success gap-2"><FaCheckCircle /> Approved</span>;
      case 'pending':
        return <span className="badge badge-warning gap-2"><FaClock /> Pending</span>;
      case 'rejected':
        return <span className="badge badge-error gap-2"><FaTimesCircle /> Rejected</span>;
      default:
        return <span className="badge badge-ghost">{status}</span>;
    }
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

  if (loading) return <p className="p-4">Loading contests...</p>;
  if (!contests.length) return <p className="p-4">No contests found. Create your first contest!</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-teal-600">My Created Contests</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-teal-50">
              <th>Contest Name</th>
              <th>Type</th>
              <th>Prize</th>
              <th>Deadline</th>
              <th>Participants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map(c => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{c.description}</div>
                </td>
                <td>{c.type || 'N/A'}</td>
                <td className="font-bold text-green-600">${c.prizeMoney}</td>
                <td className="text-sm">{formatDate(c.deadline)}</td>
                <td>{c.participants?.length || 0}</td>
                <td>{getStatusBadge(c.status)}</td>
                <td>
                  <div className="flex gap-2">
                    {c.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => navigate(`/dashboard/edit-contest/${c._id}`)}
                          title="Edit Contest"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(c._id)}
                          title="Delete Contest"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/dashboard/submissions/${c._id}`)}
                      title="View Submissions"
                    >
                      <FaEye /> Submissions
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContests;
