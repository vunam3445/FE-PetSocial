import React from 'react'
import { About } from './About'
import { AboutPets } from './AboutPets'
import { FriendsSection } from './FriendsSection'

export const ProfileLeftSidebar = ({bio , pets,onViewAllPet}:{bio:string , pets:Array<{id:string , name:string ,avatar_url:string}>,onViewAllPet:()=>void}) => {
  return (
     <div className="lg:col-span-1">
                <div className="space-y-6 lg:sticky lg:top-6 sticky-sidebar">
                    <About bio={bio}/>
                    <AboutPets pets={pets} onViewAllPet={onViewAllPet}/>
                    {/* <FriendsSection /> */}
                </div>
    </div>
  )
}
