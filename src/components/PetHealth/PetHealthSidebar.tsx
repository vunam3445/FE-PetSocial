// src/components/sidebar/ProfileSidebar.tsx
import React from 'react';
import { ProfileInfoCard } from './ProfileInfoCard';
import type { PetInfo } from '../../types/Pet';
// Giả sử bạn có kiểu dữ liệu Pet và HealthSummary


interface PetHealthSidebarProps {
  pet: PetInfo;
}

export const PetHealthSidebar: React.FC<PetHealthSidebarProps> = ({ pet }) => {
  return (
    <div className="sticky space-y-8 top-5">
      <ProfileInfoCard pet={pet} />
      {/* <HealthSummaryCard healthSummary={healthSummary} /> */}
    </div>
  );
};