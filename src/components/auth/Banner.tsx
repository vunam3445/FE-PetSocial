export const Banner = () => {
  return (
    <div className="relative items-center justify-center hidden overflow-hidden lg:flex lg:w-1/2 pet-bg">
      <div className="absolute flex items-center top-6 left-6">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </div>
        <span className="ml-3 text-xl font-bold text-blue-900">PetMatch</span>
      </div>

      <div className="max-w-md px-6 text-center">
        <div className="mx-auto mb-8 bg-gray-300 rounded-full shadow-2xl w-80 h-80" />
        <h1 className="mb-4 text-4xl font-bold text-blue-900">Chào mừng bạn đến với PetMatch</h1>
        <p className="text-lg text-blue-700">Chia sẻ khoảnh khắc & tìm sản phẩm cho thú cưng của bạn.</p>
      </div>
    </div>
  );
};
