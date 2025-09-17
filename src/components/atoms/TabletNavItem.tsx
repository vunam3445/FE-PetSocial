import React from 'react';

interface TabletNavItemProps {
  icon: string;
  href: string;
  label: string;
  isActive?: boolean;
}

const TabletNavItem: React.FC<TabletNavItemProps> = ({ 
  icon, 
  href, 
  label, 
  isActive = false 
}) => {
  const baseClasses = "flex items-center justify-center p-3 rounded-lg";
  const activeClasses = isActive 
    ? "text-purple-700 bg-purple-100" 
    : "text-gray-700 hover:bg-gray-100";

  return (
    <a 
      href={href} 
      className={`${baseClasses} ${activeClasses}`}
      title={label} // Tooltip for accessibility since text is hidden
    >
      <span className="text-xl">{icon}</span>
    </a>
  );
};

export default TabletNavItem;