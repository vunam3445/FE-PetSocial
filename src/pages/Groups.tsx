import React from "react";
import { Sidebar } from "../components/groups/Sidebar";
import { GroupFeedContainer } from "../components/groups/GroupFeedContainer";

export const Groups = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden font-sans text-gray-800 bg-gray-100">
      {/* Inject FontAwesome & Custom Scrollbar Styles */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
      `}</style>

      {/* PHẦN 1: SIDEBAR (Component hóa) */}
      <Sidebar />

      {/* PHẦN 2: MAIN FEED */}
      <main className="w-[70%] bg-gray-100 h-full overflow-y-auto">
        <div className="max-w-3xl px-4 py-6 mx-auto">
          
          {/* <GroupFeedContainer /> */}

          <div className="flex justify-center py-4">
              <i className="text-2xl text-blue-500 fas fa-circle-notch fa-spin"></i>
          </div>
        </div>
      </main>
    </div>
  );
}