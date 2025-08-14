
export const Header = () => {
  return (
        <header className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-blue-600">🐾 PetBook</h1>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="text-gray-600 fas fa-bell"></i>
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="text-gray-600 fas fa-user"></i>
                </button>
            </div>
        </div>
    </header>
  )
}
