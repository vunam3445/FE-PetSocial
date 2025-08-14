import { useState } from "react";
import EditNameModal from "../modals/EditNameModal";

export const Profileheader = ({
  name,
  followers,
  following,
  
}: {
  name: string;
  followers: number;
  following: number;
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [nameUser, setNameUser] = useState<string>(name);
    
    const hanleEdit = ()=>{
        setOpenModal(true);
    }
  return (
    <div className="px-6 pt-20 pb-4 bg-white rounded-b-lg shadow-sm md:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">{nameUser}</h1>
            <button
              onClick={hanleEdit}
              className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
              title="Edit name"
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <span>
              <i className="mr-1 fas fa-user-friends"></i>
              {followers} followers
            </span>
            <span>
              <i className="mr-1 fas fa-user-check"></i>
              {following} following
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <i className="mr-2 fas fa-user-plus"></i>Theo dõi
          </button>
          <button className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
            <i className="mr-2 fas fa-comment"></i>Nhắn tin
          </button>
        </div>
      </div>
      { openModal && 
        <EditNameModal
          open = {openModal}
          onClose={()=>setOpenModal(false)}
          currentName={nameUser}
          onChange={(newName)=>setNameUser(newName)}
        />
      }
    </div>
  );
};
