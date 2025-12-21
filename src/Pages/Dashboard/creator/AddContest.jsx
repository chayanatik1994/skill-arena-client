import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaPlus, FaImage, FaDollarSign, FaTrophy, FaFileAlt, FaTag, FaCalendar } from 'react-icons/fa';

const AddContest = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Create contest 
  const createContestMutation = useMutation({
    mutationFn: async (contestData) => {
      return await axiosSecure.post('/contests', contestData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contests']);
       Swal.fire('Success', 'Contest submitted for approval!', 'success');
      reset();
      navigate('/dashboard/my-created-contests');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to submit contest', 'error');
    },
  });

  const onSubmit = (data) => {
    // Format deadline to ISO string
    const deadline = new Date(data.deadline).toISOString();
    
    const contestData = {
      name: data.name.trim(),
      image: data.image.trim(),
        description: data.description.trim(),
      price: Number(data.price),
      prizeMoney: Number(data.prizeMoney),
      taskInstruction: data.taskInstruction.trim(),
       type: data.type.trim(),
      deadline: deadline,
      creatorId: user._id,
      creatorName: user.name || user.email,
      status: 'pending',
      participants: []
    };

    createContestMutation.mutate(contestData);
  };

  // date to today
  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-teal-600 flex items-center gap-2">
        <FaPlus /> Add New Contest
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Contest Name */}
          <div>
            <label className="label">
                <span className="label-text font-semibold">Contest Name *</span>
            </label>
            <input
              {...register('name', { required: 'Contest name is required' })}
              placeholder="Enter contest name"
               className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaImage /> Image URL *
               </span>
            </label>
            <input
              {...register('image', { required: 'Image URL is required' })}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Description *</span>
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Describe your contest..."
                className="textarea textarea-bordered w-full"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaDollarSign /> Participation Fee ($) *
                </span>
              </label>
              <input
                {...register('price', { required: 'Price is required', min: 0 })}
                type="number"
                  step="0.01"
                placeholder="0.00"
                className="input input-bordered w-full"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Prize Money */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                    <FaTrophy /> Prize Money ($) *
                </span>
              </label>
              <input
                {...register('prizeMoney', { required: 'Prize money is required', min: 0 })}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="input input-bordered w-full"
              />
              {errors.prizeMoney && <p className="text-red-500 text-sm mt-1">{errors.prizeMoney.message}</p>}
            </div>
          </div>

          {/* Task Instructions */}
          <div>
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaFileAlt /> Task Instructions *
              </span>
            </label>
            <textarea
              {...register('taskInstruction', { required: 'Task instructions are required' })}
              placeholder="Provide detailed instructions for participants..."
              className="textarea textarea-bordered w-full"
              rows={5}
            />
            {errors.taskInstruction && <p className="text-red-500 text-sm mt-1">{errors.taskInstruction.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contest Type */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaTag /> Contest Type *
                </span>
              </label>
              <select
                {...register('type', { required: 'Contest type is required' })}
                className="select select-bordered w-full"
              >
                <option value="">Select type</option>
                <option value="Web Development">Web Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                   <option value="Content Writing">Content Writing</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Photography">Photography</option>
                <option value="Other">Other</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

            {/* Deadline */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaCalendar /> Submission Deadline *
                </span>
              </label>
              <input
                {...register('deadline', { required: 'Deadline is required' })}
                type="datetime-local"
                  min={today}
                className="input input-bordered w-full"
              />
              {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
            </div>
          </div>

          <button 
            type="submit" 
             className="btn btn-primary w-full mt-6"
            disabled={createContestMutation.isPending}
          >
            {createContestMutation.isPending ? 'Submitting...' : <><FaPlus /> Submit Contest for Approval</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
