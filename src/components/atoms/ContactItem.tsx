
import React from 'react';

interface ContactItemProps {
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ 
  name, 
  avatar, 
  isOnline, 
  lastSeen 
}) => {
  const handleMessageClick = () => {
    console.log(`Message ${name}`);
  };

  return (
    <div className="flex items-center p-3 space-x-4 cursor-pointer contact-item rounded-xl hover:bg-gray-50">
      <div className="relative">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full"
        />
        <div className={`absolute w-4 h-4 border-2 border-white rounded-full -bottom-1 -right-1 ${
          isOnline ? 'bg-green-500 online-indicator' : 'bg-gray-400'
        }`}></div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 truncate">{name}</h3>
        <p className={`text-sm font-medium ${
          isOnline ? 'text-green-600' : 'text-gray-500'
        }`}>
          {lastSeen}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={handleMessageClick}
          className="p-2 text-gray-600 rounded-full hover:bg-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;