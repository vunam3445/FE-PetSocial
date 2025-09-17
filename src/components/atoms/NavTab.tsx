interface NavTabProps {
  title: string;
    isActive: boolean;
    onClick: () => void;
}

export const NavTab = ({ title, isActive , onClick}: NavTabProps) => {
  return (
    <button className={`py-4 font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={onClick}>
      {title}
    </button>

  )
}
