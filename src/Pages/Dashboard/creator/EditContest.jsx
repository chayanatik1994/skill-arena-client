import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaEdit, FaImage, FaDollarSign, FaTrophy, FaFileAlt, FaTag, FaCalendar } from 'react-icons/fa';

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // Fetch contest using TanStack Query
  const { data: contest, isLoading: loading } = useQuery({
    queryKey: ['contest', id, 'edit'],
      queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data.find(c => c._id === id);
    },
    enabled: !!id,
  });

  // Update contest 
  const updateContestMutation = useMutation({
    mutationFn: async (contestData) => {
      return await axiosSecure.patch(`/contests/${id}`, contestData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contests']);
         queryClient.invalidateQueries(['contest', id]);
      Swal.fire('Success', 'Contest updated successfully!', 'success');
      navigate('/dashboard/my-created-contests');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed the update contest', 'error');
    },
  });

  useEffect(() => {
    if (contest) {
      if (contest.status !== 'pending') {
          Swal.fire('Error', 'You can only edit pending contests', 'error');
        navigate('/dashboard/my-created-contests');
        return;
      }

      setValue('name', contest.name);
       setValue('image', contest.image);
      setValue('description', contest.description);
      setValue('price', contest.price);
        setValue('prizeMoney', contest.prizeMoney);
      setValue('taskInstruction', contest.taskInstruction);
      setValue('type', contest.type);
      
      if (contest.deadline) {
        const deadlineDate = new Date(contest.deadline);
         const formatted = deadlineDate.toISOString().slice(0, 16);
        setValue('deadline', formatted);
      }
    }
  }, [contest, setValue, navigate]);

  const onSubmit = (data) => {
    const deadline = new Date(data.deadline).toISOString();
    
    const contestData = {
      name: data.name.trim(),
      image: data.image.trim(),
      description: data.description.trim(),
        price: Number(data.price),
      prizeMoney: Number(data.prizeMoney),
       taskInstruction: data.taskInstruction.trim(),
      type: data.type.trim(),
      deadline: deadline
    };

    updateContestMutation.mutate(contestData);
  };

  const today = new Date().toISOString().slice(0, 16);

  if (loading) return <p className="p-4 text-center">Loading contest...</p>;
  if (!contest) return <p className="p-4 text-center">Contest not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-teal-600 flex items-center gap-2">
        <FaEdit /> Edit Contest
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label className="label">
              <span className="label-text font-semibold">Contest Name *</span>
              </label>
            <input
              {...register('name', { required: 'Contest name is required' })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                <FaImage /> Image URL *
              </span>
            </label>
            <input
              {...register('image', { required: 'Image URL is required' })}
              className="input input-bordered w-full"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Description *</span>
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="textarea textarea-bordered w-full"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="input input-bordered w-full"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

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
                className="input input-bordered w-full"
              />
              {errors.prizeMoney && <p className="text-red-500 text-sm mt-1">{errors.prizeMoney.message}</p>}
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaFileAlt /> Task Instructions *
              </span>
            </label>
            <textarea
              {...register('taskInstruction', { required: 'Task instructions are required' })}
               className="textarea textarea-bordered w-full"
              rows={5}
            />
            {errors.taskInstruction && <p className="text-red-500 text-sm mt-1">{errors.taskInstruction.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-created-contests')}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary flex-1" 
              disabled={updateContestMutation.isPending}
            >
              {updateContestMutation.isPending ? 'Updating...' : <><FaEdit /> Update Contest</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContest;
