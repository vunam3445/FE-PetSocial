import React from 'react'
import { CoverImage } from '../components/atoms/CoverImage'
import { ProfileSidebar } from '../components/molecules/ProfileSidebar'
import { Profileheader } from '../components/molecules/Profileheader'
import { NavTabs } from '../components/molecules/NavTabs'
import { CreatePost } from '../components/molecules/CreatePost'
import { Post } from '../components/molecules/Post'
import '../assets/css/profile.css'
export const ProfilePage = () => {
  return (
    <div className='container'>
        <CoverImage imageURL='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'/>
        <Profileheader imageURL='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' name='Nguyễn Văn An' followers={100} following={200}/>

        <NavTabs />
        <div className="main-content">
                <ProfileSidebar />
                <div className='content'>
                    <CreatePost />
                    <Post />
                </div>
        </div>
    </div>
  )
}
