import React from 'react';
import { FaSearch, FaCreditCard, FaUpload, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router';

const steps = [
  {
    icon: <FaSearch />,
    title: 'Explore Contests',
    description: 'Discover verified contests filtered by category, deadline, and popularity.',
    color: 'bg-teal-400 text-white',
  },
  {
    icon: <FaCreditCard />,
    title: 'Register Securely',
    description: 'Join contests through a secure and transparent payment system.',
    color: 'bg-teal-400 text-white',
  },
  {
    icon: <FaUpload />,
    title: 'Submit Your Work',
    description: 'Upload your completed task before the submission deadline.',
    color: 'bg-teal-400 text-white',
  },
  {
    icon: <FaTrophy />,
    title: 'Win & Get Recognized',
    description: 'Winners are selected and featured across the platform.',
    color: 'bg-teal-400 text-white',
  },
];

const HowSkillArenaWorks = () => {
  return (
    <section className="relative py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            SkillArena Made Simple
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            A simple, structured process designed to help you compete, submit, and succeed with confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white border border-slate-200 rounded-2xl p-8 
                         hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 text-center"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-md transform transition-transform duration-300 hover:scale-110 ${step.color} text-3xl`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Call-to-action button */}
        <div className="text-center mt-16">
          <Link to="/auth/register" className="px-8 py-4 bg-teal-400 text-white font-semibold rounded-full shadow-lg hover:bg-teal-500 transition">
            Join a Contest Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowSkillArenaWorks;
