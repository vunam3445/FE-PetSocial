// src/components/layout/MainContentTabs.tsx
import React from 'react';

type ActiveTab = 'posts' | 'health';
interface MainContentTabsProps {
  activeTab: ActiveTab;
  onTabClick: (tab: ActiveTab) => void;
}

export const MainContentTabs: React.FC<MainContentTabsProps> = ({ activeTab, onTabClick }) => {
  const getTabClasses = (tabName: ActiveTab): string => {
    const isActive = activeTab === tabName;
    return `tab-btn py-5 px-1 text-lg font-semibold border-b-2 ${
      isActive
        ? 'text-indigo-600 border-indigo-600'
        : 'text-gray-500 border-transparent hover:text-gray-700'
    }`;
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-4 px-8">
        <button
          className={getTabClasses('posts')}
          onClick={() => onTabClick('posts')}
        >
          Bài viết
        </button>
        <button
          className={getTabClasses('health')}
          onClick={() => onTabClick('health')}
        >
          Hồ sơ Sức khỏe
        </button>
      </nav>
    </div>
  );
};