import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ContestCard from '../../components/ContestCard';

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedType, setSelectedType] = useState('All');

  // Categories
  const categories = [

     'All',
  'Web Development',
  'Graphic Design',
  'Content Writing',
  'Video Editing',
  'Photography',
  'Other'

    'All',
    'Content Writing',
    'Web Development',
    'Photography',
    'Video Editing',
    'Other'

  ];

  // Fetch contests using TanStack Query with search
  const { data: contests = [], isLoading: loading } = useQuery({
    queryKey: ['contests', 'all', selectedType, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedType !== 'All') params.append('type', selectedType);
      if (searchQuery) params.append('search', searchQuery);
      
      const res = await axiosSecure.get(`/contests?${params.toString()}`);
      // Filter only approved contests
      return res.data.filter(c => c.status === 'approved');
    },
  });

  // Filter contests based on selected type
  const filteredContests =
    selectedType === 'All' ? contests : contests.filter(c => c.type === selectedType);

  if (loading) return <p className="p-4">Loading contests...</p>;
  if (!contests.length) return <p className="p-4">No contests available.</p>;

  return (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Contests</h2>
      {searchQuery && (
        <p className="text-gray-600 mb-4">
          Search results for: <span className="font-semibold">"{searchQuery}"</span>
        </p>
      )}

      {/* Tabs */}
      <div className="tabs mb-4 flex flex-wrap gap-2">
          {categories.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`tab tab-bordered ${selectedType === type ? 'tab-active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Contest Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContests.map(contest => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default AllContests;
