export const AboutPets = ({
  pets,
  onViewAllPet
}: {
  pets: Array<{ id: string; name: string; avatar_url: string }>;
  onViewAllPet:()=>void;
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Thú cưng của tôi</h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700" onClick={onViewAllPet}>
          Xem tất cả
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.isArray(pets) &&
          pets.map((pet) => (
            <div
              key={pet.petId}
              className="relative overflow-hidden transition-colors bg-gray-200 rounded-lg cursor-pointer aspect-square pet-card hover:bg-gray-300"
            >
              <img
                src={pet.avatar_url}
                alt={pet.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<span class="absolute inset-0 flex items-center justify-center text-3xl">🐾</span>';
                  }
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-sm font-medium text-center text-white bg-gradient-to-t from-black/70 to-transparent">
                {pet.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
