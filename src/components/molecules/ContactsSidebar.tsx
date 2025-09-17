import React from 'react';
import ContactItem from '../atoms/ContactItem';

const ContactsSidebar: React.FC = () => {
  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Online'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Online'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '2 min ago'
    },
    // Add more contacts as needed
  ];

  return (
    <aside className="sticky hidden w-1/4 h-screen overflow-y-auto bg-white border-l border-gray-200 lg:block top-16">
      <div className="p-6">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Recent Contacts</h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              name={contact.name}
              avatar={contact.avatar}
              isOnline={contact.isOnline}
              lastSeen={contact.lastSeen}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ContactsSidebar;