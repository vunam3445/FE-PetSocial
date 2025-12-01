// IntroCard.jsx
export const IntroCard = ({ description}: { description?: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-2 text-lg font-bold">Giới thiệu</h2>
      <p className="mb-4 text-sm text-gray-600">{description || ""}</p>
      <hr className="my-3"/>
      <ul className="space-y-3 text-sm text-gray-600">
        {/* <li className="flex items-center"><i className="w-6 mr-2 text-center text-gray-500 fas fa-globe-americas"></i> <span>Công khai</span></li>
        <li className="flex items-center"><i className="w-6 mr-2 text-center text-gray-500 fas fa-eye"></i> <span>Hiển thị</span></li>
        <li className="flex items-center"><i className="w-6 mr-2 text-center text-gray-500 fas fa-clock"></i> <span>Lịch sử</span></li> */}
      </ul>
    </div>
  );
};