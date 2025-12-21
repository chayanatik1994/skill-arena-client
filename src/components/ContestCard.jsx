import React from 'react';
import { useNavigate } from 'react-router';

const ContestCard = ({ contest }) => {
  const navigate = useNavigate();

  if (!contest) return null; 

  const name = contest?.name || 'Untitled Contest';
    const description = contest?.description ? contest.description.slice(0, 100) : 'No description available.';
  const image = contest?.image || 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition cursor-pointer">
      <figure>
          <img src={image} alt={name} className="h-48 w-full object-cover" />
        </figure>
      <div className="card-body">
          <h3 className="card-title">{name}</h3>
        <p>{description}{contest?.description && description.length >= 100 && '...'}</p>
        <div className="card-actions justify-end">
            <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/contests/${contest._id}`)}
          >
            Details
           </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
