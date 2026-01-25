import { useState } from "react";
import { About } from "./About";
import { AboutPets } from "./AboutPets";

export const ProfileLeftSidebar = ({
  bio,
  setBio,
  pets,
  onViewAllPet,
}: {
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  pets: Array<{ id: string; name: string; avatar_url: string }>;
  onViewAllPet: () => void;
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6 lg:sticky lg:top-6 sticky-sidebar">
        <About bio={bio} setBio={setBio} />
        <AboutPets pets={pets} onViewAllPet={onViewAllPet} />
      </div>
    </div>
  );
};
