import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const PopularContests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch contests using TanStack Query
  const { data: contests = [], isLoading: loading } = useQuery({
    queryKey: ['contests', 'popular'],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/contests");
      // Filter only approved contests and sort by participants
      const approved = response.data
        .filter(c => c.status === 'approved')
        .sort((a, b) => (b.participants?.length || 0) - (a.participants?.length || 0));
      return approved.slice(0, 5); // Show top 6
    },
  });

  if (loading) return <p className="text-center mt-10">Loading contests...</p>;

  const handleDetailsClick = (id) => {
    if (user) {
      navigate(`/contests/${id}`);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-secondary text-center mb-4">Popular Contests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contests.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No popular contests available</p>
        ) : (
          contests.map((contest) => (
          <div key={contest._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
            <figure>
              <img src={contest.image} alt={contest.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{contest.name}</h3>
              <p className="text-gray-700 line-clamp-3">{contest.description}</p>
              <p className="text-sm text-gray-500">{contest.participants?.length || 0} Participants</p>
              <div className="card-actions mt-3 justify-end">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDetailsClick(contest._id)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-secondary px-10 py-2" onClick={() => navigate("/contests")}>
          Show All
        </button>
      </div>
    </div>
  );
};

export default PopularContests;
