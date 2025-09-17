import React from "react";
import { About } from "./About";
import { AboutPets } from "./AboutPets";
import { AboutImage } from "./AboutImage";
import { AboutPetCommuntities } from "./AboutPetCommuntities";

export const ProfileSidebar = () => {
  return (
    <div className="sidebar">
      <About />

      <AboutPets />

      <AboutImage />

      <AboutPetCommuntities />
    </div>
  );
};
