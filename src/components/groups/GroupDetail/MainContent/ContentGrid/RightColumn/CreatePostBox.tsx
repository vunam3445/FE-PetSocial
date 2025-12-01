// CreatePostBox.jsx
export const CreatePostBox = ({ onOpenModal }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40/b4d2ff/333333?text=A" alt="Avatar"/>
        <button 
            onClick={onOpenModal}
            className="w-full px-4 py-2 text-left text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200">
            Bạn đang nghĩ gì?
        </button>
      </div>
      <hr className="my-3"/>
      <div className="flex justify-around">
        <button className="flex-1 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100"><i className="mr-2 text-red-500 fas fa-video"></i>Trực tiếp</button>
        <button className="flex-1 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100"><i className="mr-2 text-green-500 fas fa-images"></i>Ảnh/video</button>
        <button className="flex-1 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100"><i className="mr-2 text-blue-500 fas fa-flag"></i>Sự kiện</button>
      </div>
    </div>
  );
};