import React from "react";
import { FaRegSmile, FaLock, FaTrophy } from "react-icons/fa";

const ExtraSection = () => {
  return (
    <section className="p-12 bg-gray-100 rounded-lg shadow-lg mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose SkillArena?</h2>
        <p className="text-gray-600 mb-8 text-lg">
          SkillArena makes it easy for creators and participants to connect, compete, and win. 
          Explore exciting contests, showcase your talent, and get rewarded!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
            <FaRegSmile className="text-teal-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Participation</h3>
            <p className="text-gray-600">
              Join contests effortlessly and showcase your skills with just a few clicks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
            <FaLock className="text-teal-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Payments</h3>
            <p className="text-gray-600">
              Pay entry fees safely and know that your transactions are fully protected.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
            <FaTrophy className="text-yellow-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Real Rewards</h3>
            <p className="text-gray-600">
              Win exciting prizes and gain recognition for your talent across our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
