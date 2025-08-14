import { useState } from "react";
import {PetEditModal} from "../modals/PetEditModal";
import ConfirmationDialog from "./ConfirmationDialog";
import api from "../../lib/axios";

export const PetProfile = ({
  pet_id,
  avatar_url,
  name,
  type,
  breed,
  gender,
  birthday,
  onChange,
}: {
  pet_id: string;
  avatar_url: string;
  name: string;
  type: string;
  breed: string;
  gender: string;
  birthday: string;
  onChange?:()=>void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogPen] = useState(false);
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () =>{
    setIsDialogPen(true);
  }

  const handleConfirmDelete = async() =>{
    try{
      await api.delete(`/pets/${pet_id}`)
      setIsDialogPen(false);
      onChange?.()
    }catch(error){
      console.log(error);
    }
    
  }
  return (
    <div className="relative overflow-hidden transition-all bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl hover:shadow-lg pet-card aspect-square">
      <div className="absolute inset-0 flex items-center justify-center text-6xl">
        {avatar_url ? (
          <img
            src={avatar_url}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          "🐕"
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="mb-1 text-lg font-semibold text-white">{name}</h3>
        <p className="mb-1 text-sm text-white/90">
          {type} - {breed}
        </p>
        <p className="mb-3 text-xs text-white/80">
          {birthday} • {gender}
        </p>
        <div className="flex gap-2">
          <button className="w-3/4 px-3 py-2 text-sm font-medium text-white border rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30" onClick={handleEdit}>
            <i className="mr-2 fas fa-edit"></i>Sửa
          </button>
          <button className="w-1/4 px-3 py-2 text-sm font-medium text-white border rounded-lg bg-red-500/30 backdrop-blur-sm hover:bg-red-500/50 border-white/30" onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      {isModalOpen && 
        <PetEditModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pet={{ pet_id, avatar_url, name, type, breed, gender, birthday }}
          onUpdated={onChange}
        />
      }

      {isDialogOpen && 
      <ConfirmationDialog 
        open = {isDialogOpen}
        onClose={()=> setIsDialogPen(false)}
        onConfirm={handleConfirmDelete}
      />
      }

    </div>
  );
};
