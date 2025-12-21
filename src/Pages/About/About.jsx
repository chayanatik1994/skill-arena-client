import React from 'react';
import { Link } from 'react-router';
import { FaTrophy, FaUsers, FaLightbulb, FaRocket, FaShieldAlt, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
          <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-teal-600 mb-4">About SkillArena</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering creativity through competitive excellence
          </p>
        </div>

        {/* Mission Section */}
        <div className="card bg-white shadow-xl mb-8">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-teal-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
                SkillArena is a dynamic platform designed to connect talented individuals with exciting 
                creative challenges. We believe in fostering innovation, recognizing excellence, and creating 
              opportunities for creators to showcase their skills while competing for meaningful rewards.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <FaTrophy className="text-4xl text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Fair Competition</h3>
              <p className="text-gray-600">
                 Transparent judging process ensures every participant gets a fair chance to win.
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <FaUsers className="text-4xl text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Community Driven</h3>
              <p className="text-gray-600">
                  Join a vibrant community of creators, participants, and contest organizers.
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <FaLightbulb className="text-4xl text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Diverse Contests</h3>
                <p className="text-gray-600">
                From design to writing, gaming to business ideas - contests for every skill set.
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <FaRocket className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Career Growth</h3>
                <p className="text-gray-600">
                Build your portfolio, gain recognition, and advance your creative career.
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <FaShieldAlt className="text-4xl text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                      Your data and payments are protected with industry-standard security measures.
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <FaHeart className="text-4xl text-red-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Supportive Environment</h3>
              <p className="text-gray-600">
                We're committed to creating a positive, inclusive space for all creators.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="card bg-white shadow-xl mb-8">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-teal-600 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-teal-600">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Browse Contests</h3>
                <p className="text-gray-600">
                  Explore a wide variety of contests that match your interests and skills.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Participate</h3>
                <p className="text-gray-600">
                  Register for contests, submit your work, and compete for prizes.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">3</span>
                   </div>
                <h3 className="font-bold text-lg mb-2">Win & Grow</h3>
                <p className="text-gray-600">
                  Get recognized, earn rewards, and build your reputation in the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
               Join thousands of creators competing and winning on SkillArena
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contests" className="btn btn-primary btn-lg">
              Browse Contests
            </Link>
              <Link to="/auth/register" className="btn btn-outline btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

