import { useState } from "react";
import { Header } from "../components/atoms/Header";
import ContactsSidebar from "../components/molecules/ContactsSidebar";
import { CreatePost } from "../components/molecules/CreatePost";
import Sidebar from "../components/molecules/Sidebar";
import TabletSidebar from "../components/molecules/TabletSidebar";
import type { Post } from "../types/ResponsePost";
import HomePostContainer from "../components/molecules/HomePostContainer";

export const Home = () => {
  const [newPost, setNewPost] = useState<Post>();
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="min-h-screen pt-16">
        <div className="flex mx-auto max-w-7xl">
          <Sidebar />
          <TabletSidebar />

          <main className="flex-1 p-4 lg:w-1/2 lg:p-6">
            <CreatePost onPostCreated={(post) => setNewPost(post)} />
            <HomePostContainer newPost={newPost} />
          </main>

          <ContactsSidebar />
        </div>
      </div>
    </div>
  );
};
