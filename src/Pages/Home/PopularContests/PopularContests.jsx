import React, { useState, useEffect } from 'react';

const PopularContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {

      const data = [
        { id: 1, name: "Photography Contest", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Capture the beauty of nature in your photos." },
        { id: 2, name: "Art Challenge", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Show off your artistic skills in this month-long challenge." },
        { id: 3, name: "Writing Contest", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Write a compelling short story based on the given theme." },
        { id: 4, name: "Coding Competition", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Solve challenging problems and showcase your coding skills." },
        { id: 5, name: "Gaming Tournament", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", description: "Compete with gamers around the world for the top spot." },
      ];
      setContests(data);
    };

    fetchContests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-secondary text-center mb-4">Popular Contests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contests.map((contest) => (
          <div key={contest.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
            <figure>
              <img src={contest.image} alt={contest.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{contest.name}</h3>
              <p>{contest.description.slice(0, 80)}…</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
          <button className="btn btn-secondary px-10 py-2">Show All</button>
      </div>
    </div>
  );
};

export default PopularContests;
