import { useParams } from "react-router-dom";
import useUserId from "../../hooks/auth/useUserId";
import EditBioModal from "../modals/EditBioModal";
import { useState } from "react";
export const About = ({ bio }: { bio: string }) => {
  const [bioUser, setBioUser] = useState<string>(bio);
  const [openModal, setOpenModal] = useState(false);
  const {id}= useParams();
  const isOwner = useUserId(id);
  const handleEdit = () => {
    setOpenModal(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Giới thiệu</h3>
        {isOwner &&  <button
          className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          onClick={handleEdit}
        >
          <i className="mr-1 fas fa-edit"></i>Sửa
        </button>}
       
      </div>
      <div className="text-sm text-gray-700 break-words">
        <p>{bioUser}</p>
      </div>

      {openModal && (
        <EditBioModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          currentBio={bioUser}
          onSave={(newBio: string) => setBioUser(newBio)}
        />
      )}
    </div>
  );
};
