import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const contestData = [
  { id: 1, type: "Image Design", name: "Photography Contest", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Capture the beauty of nature in your photos." },
  { id: 2, type: "Image Design", name: "Art Challenge", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Show off your artistic skills in this month-long challenge." },
  { id: 3, type: "Article Writing", name: "Writing Contest", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Write a compelling short story based on the given theme." },
  { id: 4, type: "Coding", name: "Coding Competition", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Solve challenging problems and showcase your coding skills." },
  { id: 5, type: "Gaming", name: "Gaming Tournament", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Compete with gamers around the world for the top spot." },
];

const AllContests = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [filteredContests, setFilteredContests] = useState(contestData);
  const navigate = useNavigate();

  const types = ["All", ...new Set(contestData.map(c => c.type))];

  useEffect(() => {
    if (selectedType === "All") setFilteredContests(contestData);
    else setFilteredContests(contestData.filter(c => c.type === selectedType));
  }, [selectedType]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-secondary text-center mb-4">All Contests</h2>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-md border ${
              selectedType === type ? "bg-teal-700 text-white border-teal-700" : "bg-white text-gray-700 border-gray-300"
            } transition`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredContests.map(contest => (
          <div key={contest.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
            <figure>
              <img src={contest.image} alt={contest.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{contest.name}</h3>
              <p>{contest.description.slice(0, 80)}…</p>
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/contests/${contest.id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContests;
