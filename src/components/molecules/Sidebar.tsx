import React from 'react';
import NavigationItem from '../atoms/NavigationItem';

const Sidebar: React.FC = () => {
  const userId = localStorage.getItem("user_id"); // lấy id từ localStorage
  const navigationItems = [
    { icon: '👥', label: 'Feeds', href: '/' },
    { icon: '👤', label: 'Profile', href: `/profile/${userId}` }, // đổi thành route đúng
    // { icon: '🎥', label: 'Videos', href: '/videos' },
    // { icon: '🛒', label: 'Marketplace', href: '/marketplace' },
    // { icon: '📅', label: 'Events', href: '/events' },
    // { icon: '🐕', label: 'Pets', href: '/pets', isActive: true },
    // { icon: '📸', label: 'Memories', href: '/memories' },
    // { icon: '⚙️', label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="sticky hidden w-1/4 h-screen overflow-y-auto bg-white border-r border-gray-200 lg:block top-16">
      <nav className="p-6 space-y-3">
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
