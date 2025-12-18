import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        fontFamily: '"Kumlien Pro"',
        background: 'linear-gradient(120deg, rgba(181, 181, 181, 0.64) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(181, 181, 181, 0.64) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
        backgroundPosition: '100%'
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
