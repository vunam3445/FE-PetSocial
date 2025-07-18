interface NavTabProps {
  title: string;
    isActive: boolean;
    onClick: () => void;
}

export const NavTab = ({ title, isActive , onClick}: NavTabProps) => {
  return (
    <a href="#" className={`nav-tab ${isActive ? 'active' : ''}`} onClick={onClick}>
      {title}
    </a>

  )
}
