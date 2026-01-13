
interface GroupItemProps {
  name: string;
  image: string;
  href: string;
}
export const GroupItem = ({ name,image, href }: GroupItemProps) => (
  <a href={href} className="flex items-center p-2 transition rounded-lg cursor-pointer hover:bg-gray-100 group">
    <img src={image} alt={name} className="object-cover w-12 h-12 mr-3 rounded-lg shadow-sm" />
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-semibold text-gray-900 truncate transition group-hover:text-blue-600">{name}</h3>
      {/* <p className="text-xs text-gray-500 truncate">{meta}</p> */}
    </div>
  </a> 
);