import React, { useState } from "react";
import { useNavigate } from "react-router";
import bannerImg from "../../../../assets/BannerImage.jpg";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/contests?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/contests');
    }
  };

  return (
    <div
      className="relative w-full h-[70vh] rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Discover Contests That Match Your Skills
        </h1>

        <p className="text-white/90 text-lg md:text-xl mb-6">
          Join, compete and showcase your talent
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white w-full max-w-xl p-3 rounded-xl shadow-lg flex items-center gap-3">
          <input
            type="text"
            placeholder="Search contest type (e.g., Image Design, Article Writing)..."
            className="w-full outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
