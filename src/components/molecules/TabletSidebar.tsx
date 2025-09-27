import React from 'react';
import TabletNavItem from '../atoms/TabletNavItem';

const TabletSidebar: React.FC = () => {
  const userId = localStorage.getItem('user_id') || '';
  const navigationItems = [
    { icon: '👥', href: '/', label: 'Feeds' },
    { icon: '👥', href: `/profile/${userId}`, label: 'Profile' },
    { icon: '🎥', href: '#', label: 'Videos' },
    // { icon: '🛒', href: '#', label: 'Marketplace' },
    // { icon: '📅', href: '#', label: 'Events' },
    // { icon: '🐕', href: '#', label: 'Pets' },
    // { icon: '📸', href: '#', label: 'Memories' },
    // { icon: '⚙️', href: '#', label: 'Settings' },
  ];

  return (
    <aside className="sticky hidden w-16 h-screen bg-white border-r border-gray-200 md:block lg:hidden top-16">
      <nav className="p-2 space-y-2">
        {navigationItems.map((item, index) => (
          <TabletNavItem
            key={index}
            icon={item.icon}
            href={item.href}
            label={item.label}
          />
        ))}
      </nav>
    </aside>
  );
};

export default TabletSidebar;