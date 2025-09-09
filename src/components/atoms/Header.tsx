
export const Header = () => {
  return (
         <header className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-blue-600">🐾 PetBook</h1>
            </div>
            <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search pets, posts, or friends..." 
                        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 transition-all duration-200 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="text-gray-400 fas fa-search"></i>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="text-gray-600 fas fa-bell"></i>
                </button>
                <button className="p-2 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="text-gray-600 fas fa-user"></i>
                </button>
            </div>
        </div>
    </header>

  )
}
