import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import AdminSelectWinner from './AdminSelectWinner';

const ManageContests = () => {
  const [expandedContest, setExpandedContest] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all contests using TanStack Query
  const { data: contests = [], isLoading: loading } = useQuery({
    queryKey: ['contests', 'admin'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data;
    },
  });

  // Approve contest 
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/contests/${id}/status`, { status: 'approved' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contests']);
      Swal.fire('Success', 'Contest approved!', 'success');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to approve contest', 'error');
    },
  });

  // Reject contest mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/contests/${id}/status`, { status: 'rejected' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contests']);
      Swal.fire('Success', 'Contest rejected!', 'success');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to reject contest', 'error');
    },
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
      Swal.fire('Error', 'Failed to delete contest', 'error');
    },
  });

  // Handle status change - Confirm (Approve)
  const handleConfirm = (id) => {
    approveMutation.mutate(id);
  };

  // Handle status change - Reject
  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  // Handle delete
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

  if (loading) return <p className="p-4">Loading contests...</p>;
  if (!contests.length) return <p className="p-4">No contests found.</p>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-teal-600 mb-2">Manage Contests</h2>
        <p className="text-gray-600">Approve, reject, and manage contests. Select winners for completed contests.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-teal-50">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map(c => (
              <React.Fragment key={c._id}>
                <tr className="hover:bg-gray-50">
                  <td className="font-semibold">{c.name}</td>
                  <td>
                    <span className={`badge ${
                      c.status === 'approved' ? 'badge-success' :
                      c.status === 'pending' ? 'badge-warning' :
                      c.status === 'rejected' ? 'badge-error' :
                      c.status === 'completed' ? 'badge-info' :
                      'badge-ghost'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {c.participants?.length || 0} participant{(c.participants?.length || 0) !== 1 ? 's' : ''}
                  </td>
                  <td className="space-x-2">
                    {c.status === 'pending' && (
                      <>
                        <button className="btn btn-sm btn-success" onClick={() => handleConfirm(c._id)}>Approve</button>
                        <button className="btn btn-sm btn-warning" onClick={() => handleReject(c._id)}>Reject</button>
                      </>
                    )}
                    {(c.status === 'approved' || c.status === 'completed') && c.participants?.length > 0 && !c.winnerId && (
                      <button 
                        className="btn btn-sm btn-info" 
                        onClick={() => setExpandedContest(expandedContest === c._id ? null : c._id)}
                      >
                        {expandedContest === c._id ? 'Hide' : 'Select Winner'}
                      </button>
                    )}
                    {c.winnerId && (
                      <span className="badge badge-success">Winner Selected</span>
                    )}
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(c._id)}>Delete</button>
                  </td>
                </tr>
                {expandedContest === c._id && (
                  <tr>
                    <td colSpan="4" className="p-4 bg-gray-50">
                      <AdminSelectWinner contest={c} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
