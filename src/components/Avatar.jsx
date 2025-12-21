import React, { useState } from 'react';
const Avatar = ({ name, email, photoURL, className = '', ring = false }) => {
  const [imageError, setImageError] = useState(false);
  const getInitial = () => {
    const base = name || email || '';
    const trimmed = base.trim();
    if (!trimmed) return '?';
    return trimmed.charAt(0).toUpperCase();
  };

  const wrapperClasses = [
    className || 'w-10 h-10',
    'rounded-full',
    ring ? 'ring-2 ring-teal-500' : '',
    'bg-teal-600',
     'text-white',
    'flex items-center justify-center text-center leading-none',
    'overflow-hidden',
  ]
    .filter(Boolean)
    .join(' ');

  const shouldShowImage = photoURL && !imageError;

  return (
    <div className={wrapperClasses}>
      {shouldShowImage ? (
        <img
           src={photoURL}
          alt={name || email || 'User avatar'}
            className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-semibold text-lg">
            {getInitial()}
        </span>
      )}
    </div>
  );
};

export default Avatar;

