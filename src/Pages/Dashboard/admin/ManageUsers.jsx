import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Avatar from '../../../components/Avatar';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users using TanStack Query
  const { data: users = [], isLoading: loading } = useQuery({
      queryKey: ['users'],
     queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  // Role change mutation
  const roleChangeMutation = useMutation({
     mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Success', 'Role changed successfully', 'success');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to change role', 'error');
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to delete user', 'error');
    },
  });

  // Handle role change
  const handleRoleChange = (id, role) => {
    roleChangeMutation.mutate({ id, role });
  };

  // Handle delete user
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
        deleteUserMutation.mutate(id);
      }
    });
  };

  if (loading) return <p className="p-4">Loading users...</p>;
  if (!users.length) return <p className="p-4">No users found.</p>;

  const getRoleBadge = (role) => {
    const badges = {
      admin: <span className="badge badge-error">Admin</span>,
        creator: <span className="badge badge-info">Creator</span>,
      user: <span className="badge badge-primary">User</span>
    };
    return badges[role] || <span className="badge badge-ghost">{role}</span>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
          <h2 className="text-3xl font-bold text-teal-600 mb-2">Manage Users</h2>
        <p className="text-gray-600">Change user roles and manage user accounts</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-teal-50">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Current Role</th>
                  <th>Change Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                         <Avatar
                          name={u.name || u.displayName}
                          email={u.email}
                          photoURL={u.photoURL}
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{u.name || 'No Name'}</div>
                        {u.bio && <div className="text-xs text-gray-500">{u.bio}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{u.email}</td>
                  <td>{getRoleBadge(u.role || 'user')}</td>
                  <td>
                    <div className="flex gap-2 flex-wrap">
                      <button
                          className={`btn btn-xs ${u.role === 'user' ? 'btn-primary btn-active' : 'btn-outline btn-primary'}`}
                        onClick={() => handleRoleChange(u._id, 'user')}
                        disabled={u.role === 'user'}
                          title="Normal user - can participate in contests"
                      >
                        User
                      </button>
                      <button
                        className={`btn btn-xs ${u.role === 'creator' ? 'btn-info btn-active' : 'btn-outline btn-info'}`}
                        onClick={() => handleRoleChange(u._id, 'creator')}
                            disabled={u.role === 'creator'}
                        title="Creator - can create and manage contests"
                      >
                        Creator
                      </button>
                      <button
                        className={`btn btn-xs ${u.role === 'admin' ? 'btn-error btn-active' : 'btn-outline btn-error'}`}
                           onClick={() => handleRoleChange(u._id, 'admin')}
                        disabled={u.role === 'admin'}
                        title="Admin - full system access"
                      >
                        Admin
                      </button>
                    </div>
                  </td>
                    <td>
                    <button
                      className="btn btn-sm btn-error btn-outline"
                      onClick={() => handleDelete(u._id)}
                      title="Delete user account"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Information */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 mb-2">Role Permissions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="badge badge-primary mr-2">User</span>
            <span className="text-blue-800">Can participate in contests, view profile, see winning contests</span>
            </div>
          <div>
            <span className="badge badge-info mr-2">Creator</span>
            <span className="text-blue-800">Can create contests, manage own contests, view submissions</span>
          </div>
             <div>
            <span className="badge badge-error mr-2">Admin</span>
            <span className="text-blue-800">Full access - manage users, approve/reject contests</span>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="btn btn-sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm"
               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
