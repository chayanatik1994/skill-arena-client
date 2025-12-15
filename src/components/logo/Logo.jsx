import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/skill arena-horizontal.png';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-end gap-2">
        <img 
          src={logo} 
          alt="SkillArena Logo" 
          className="w-10 h-10 object-cover rounded-full"
        />
        <h3 className="text-3xl font-bold">SkillArena</h3>
      </div>
    </Link>
  );
};

export default Logo;
