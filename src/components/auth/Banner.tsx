export const Banner = () => {
  return (
    <div className="relative items-center justify-center hidden overflow-hidden lg:flex lg:w-1/2 pet-bg">
      {/* Logo + tên thương hiệu */}
      <div className="absolute flex items-center top-6 left-6">
             <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <span className="text-lg font-bold text-white">🐾</span>
            </div>
        <span className="ml-3 text-xl font-bold text-blue-900">PetConnect</span>
      </div>

      {/* Nội dung banner */}
      <div className="max-w-md px-6 text-center">
        {/* Hiển thị ảnh logo lớn */}
        <div className="mx-auto mb-8 overflow-hidden bg-white rounded-full shadow-2xl w-80 h-80">
          <img
            src="/logo_login.png" // ảnh trong thư mục public
            alt="PetConnect"
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-blue-900">
          Chào mừng bạn đến với PetSocial
        </h1>
        <p className="text-lg text-blue-700">
          Chia sẻ khoảnh khắc cùng thú cưng của bạn.
        </p>
      </div>
    </div>
  );
};
