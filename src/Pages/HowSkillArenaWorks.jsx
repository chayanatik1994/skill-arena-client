import React from 'react';
import { FaSearch, FaCreditCard, FaUpload, FaTrophy } from 'react-icons/fa';

const HowSkillArenaWorks = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How SkillArena Works
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            A simple, structured process designed to help you compete, submit,
            and succeed with confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8
                          hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center
                            rounded-lg bg-indigo-50 text-indigo-600 text-2xl mb-6">
              <FaSearch />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Explore Contests
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover verified contests filtered by category, deadline, and popularity.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8
                          hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center
                            rounded-lg bg-indigo-50 text-indigo-600 text-2xl mb-6">
              <FaCreditCard />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Register Securely
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Join contests through a secure and transparent payment system.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8
                          hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center
                            rounded-lg bg-indigo-50 text-indigo-600 text-2xl mb-6">
              <FaUpload />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Submit Your Work
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upload your completed task before the submission deadline.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8
                          hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center
                            rounded-lg bg-indigo-50 text-indigo-600 text-2xl mb-6">
              <FaTrophy />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Win & Get Recognized
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Winners are selected and featured across the platform.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowSkillArenaWorks;
