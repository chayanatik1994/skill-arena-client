import React from 'react';
import logo from '../../assets/skill arena-horizontal.png';

const Logo = ({ size = 12, alt = 'SkillArena Logo' }) => {
  // size in Tailwind units, e.g., 12 => h-12 w-12
  const className = `h-${size} w-${size} rounded-full object-cover`;

  return (
    <div className="flex items-center">
      <img src={logo} alt={alt} className={className} />
    </div>
  );
};

export default Logo;
