import { NavTab } from "../atoms/NavTab";

const Tabs = ["Posts", "Photos", "Videos", "Friends", "Pets"];
export const NavTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void; }) => {
  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm">
      <nav className="flex px-6 space-x-8 md:px-8">
        {Tabs.map((tab) => {
          return (
            <NavTab
              key={tab}
              title={tab}
              isActive={activeTab === tab}
              onClick={() => onTabChange(tab)}
            />
          );
        })}
      </nav>
    </div>
  );
};
