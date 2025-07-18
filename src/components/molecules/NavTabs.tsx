import { useState } from "react";
import { NavTab } from "../atoms/NavTab";

const Tabs = ["Posts", "Photos", "Videos", "Pets"];
export const NavTabs = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <nav className="nav-tabs">
      {Tabs.map((tab) => {
        return (
          <NavTab
            key={tab}
            title={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        );
      })}
    </nav>
  );
};
