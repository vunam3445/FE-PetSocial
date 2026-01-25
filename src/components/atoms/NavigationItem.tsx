import React from 'react';

interface NavigationItemProps {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  icon, 
  label, 
  href, 
  isActive = false,
  onClick
}) => {
  const baseClasses = "flex items-center p-3 space-x-3 rounded-lg nav-item";
  const activeClasses = isActive 
    ? "text-purple-700 bg-purple-50" 
    : "text-gray-700";

  return (
    <a href={href} className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
};

export default NavigationItem;