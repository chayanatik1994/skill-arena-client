import React from 'react';
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import footerImg from '../../../../assets/skill arena-horizontal.png';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Platform */}
          <div>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/all-contests">All Contests</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          {/* Contest Skills */}
          <div>
            <h4 className="footer-title">Contest Skills</h4>
            <ul className="footer-links">
              <li><a href="/category/writing">Writing</a></li>
              <li><a href="/category/coding">Coding & Technical</a></li>
              <li><a href="/category/design">Design</a></li>
              <li><a href="/category/gaming">Gaming</a></li>
              <li><a href="/category/achievement">Achievement</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="footer-title">About & Community</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/creators">For Creators</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Brand + Social */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={footerImg}
                alt="SkillArena"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                SkillArena
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with us on social platforms
            </p>

            <div className="flex gap-4">
              <SocialIcon href="#" label="Facebook"><FaFacebook /></SocialIcon>
              <SocialIcon href="#" label="LinkedIn"><FaLinkedin /></SocialIcon>
              <SocialIcon href="#" label="GitHub"><FaGithub /></SocialIcon>
              <SocialIcon href="#" label="Twitter"><FaTwitter /></SocialIcon>
              <SocialIcon href="#" label="Instagram"><FaInstagram /></SocialIcon>
              <SocialIcon href="#" label="YouTube"><FaYoutube /></SocialIcon>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center text-sm">
          <div className="flex flex-wrap gap-4">
            <a href="/imprint">Imprint</a>
            <a href="/privacy">Privacy</a>
            <a href="/security">Security</a>
            <a href="/sitemap">Site Map</a>
            <a href="/cookies">Cookies</a>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            © 2025 SkillArena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xl"
  >
    {children}
  </a>
);

export default Footer;
