import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";

const ContestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contestData = [
      { id: 1, name: "Photography Contest", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", participants: 10, prizeMoney: 500, description: "Capture the beauty of nature in your photos.", task: "Submit 5 best photos" },
      { id: 2, name: "Art Challenge", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", participants: 8, prizeMoney: 300, description: "Show off your artistic skills.", task: "Create an original painting" },
      { id: 3, name: "Writing Contest", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", participants: 15, prizeMoney: 200, description: "Write a compelling short story.", task: "Submit a 2000-word story" },
      { id: 4, name: "Coding Competition", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", participants: 12, prizeMoney: 400, description: "Solve challenging problems.", task: "Complete 5 coding challenges" },
      { id: 5, name: "Gaming Tournament", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp", participants: 20, prizeMoney: 600, description: "Compete globally for the top spot.", task: "Win 3 matches" },
    ];

    const found = contestData.find(c => c.id === parseInt(id));
    setContest(found || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-ring loading-lg"></span></div>;
  if (!contest) return <div className="text-center mt-10"><p>Contest not found.</p><button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>Go Back</button></div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">{contest.name}</h2>

      <div className="mb-6">
        <img src={contest.image} alt={contest.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
      </div>

      <div className="flex gap-6 mb-6 justify-center text-gray-700">
        <div className="flex items-center gap-2"><FaUsers /> <span>{contest.participants} Participants</span></div>
        <div className="flex items-center gap-2"><FaMoneyBillWave /> <span>${contest.prizeMoney}</span></div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{contest.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Task Details</h3>
        <p className="text-gray-700">{contest.task}</p>
      </div>

      <div className="text-center">
        <button className="btn btn-primary px-8 py-2" onClick={() => navigate(`/contests/${id}/payment`)}>
          Join Contest
        </button>
      </div>
    </div>
  );
};

export default ContestDetailsPage;
