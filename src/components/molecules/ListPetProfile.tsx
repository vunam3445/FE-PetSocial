import { useState, useEffect } from "react";
import { PetProfile } from "../atoms/PetProfile";
import { CreatePetModal } from "../modals/CreatePetModal";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../loadings/LoadingSpinner";
import api from "../../lib/axios";
import useUserId from "../../hooks/auth/useUserId";
export const ListPetProfile = () => {
  const { id } = useParams();
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const isOwner = useUserId(id);
  
  const fetchPets = async () => {
    try {
      if (!id) {
        return;
      }
      const res = await api.get(`pets/user/${id}`);
      setPets(res.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePet = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchPets();
  }, [id]);

  return (
    <div id="tab-pets">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Thú cưng của tôi
          </h2>
         {isOwner && ( <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            onClick={handleCreatePet}
          >
            <i className="mr-2 fas fa-plus"></i>Thêm thú cưng
          </button>)}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetProfile
              key={pet.pet_id}
              {...pet}
              onChange={() => fetchPets()}
            />
          ))}
        </div>
      </div>

      <CreatePetModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleCreate={(newPet) => {
          setPets((prevPets) => [...prevPets, newPet]); 
          setIsModalOpen(false);
        }}
      />
      {loading && <LoadingSpinner />}
      {pets.length === 0 && !loading && (
          <div className="py-10 text-center">
            <p className="font-medium text-gray-500">Người dùng này chưa có thú cưng nào.</p>
          </div>
      )}
    </div>
  );
};
