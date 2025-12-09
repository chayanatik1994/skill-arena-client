import React from 'react';
import { FaFacebook, FaLinkedin, FaGithub, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import footerImg from '../../../../assets/skill arena-horizontal.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Top Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* 1. Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/all-contests" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">All Contests</a></li>
              <li><a href="/leaderboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Leaderboard</a></li>
              <li><a href="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* 2. Contest Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Contest Skills
            </h4>
            <ul className="space-y-3">
              <li><a href="/category/writing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Writing</a></li>
              <li><a href="/category/coding" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Coding & Technical</a></li>
              <li><a href="/category/design" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Design</a></li>
              <li><a href="/category/gaming" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Gaming</a></li>
              <li><a href="/category/achievement" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Achievement</a></li>
            </ul>
          </div>

          {/* 3. About & Community */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              About & Community
            </h4>
            <ul className="space-y-3">
              <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="/creators" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">For Creators</a></li>
              <li><a href="/careers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="/support" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* 4. Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Contact
            </h4>
            <ul className="space-y-3">
              <li><a href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="md:col-span-1 flex flex-col items-start md:items-end">
            <div className="flex items-center mb-4">
              {/* Rounded Logo */}
              <img 
                src={footerImg} 
                alt="SkillArena Logo" 
                className="h-10 w-10 rounded-full object-cover mr-3"
              />
              <span className="text-sm text-black dark:text-indigo-400">Connect with SkillArena via Social Apps</span>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors" aria-label="Facebook"><FaFacebook className="w-6 h-6" /></a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors" aria-label="LinkedIn"><FaLinkedin className="w-6 h-6" /></a>
              <a href="#" className="text-gray-800 hover:text-gray-900 transition-colors" aria-label="GitHub"><FaGithub className="w-6 h-6" /></a>
              <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors" aria-label="Twitter"><FaTwitter className="w-6 h-6" /></a>
              <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors" aria-label="Instagram"><FaInstagram className="w-6 h-6" /></a>
              <a href="#" className="text-red-600 hover:text-red-800 transition-colors" aria-label="YouTube"><FaYoutube className="w-6 h-6" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-8 border-t border-gray-300 dark:border-gray-700 flex flex-wrap justify-between items-center text-sm">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="/imprint" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Imprint/Legal</a>
            <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Security</a>
            <a href="/sitemap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Site Map</a>
            <a href="/cookies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Preferences</a>
          </div>
          <p>&copy; 2025 SkillArena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
