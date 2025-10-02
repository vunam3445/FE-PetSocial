import React, { useState, useEffect } from "react";
import ContactItem from "../atoms/ContactItem";
import { useGetRecentConversation } from "../../hooks/chat/useGetRecentConversation";
import { useChat } from "../../contexts/ChatContext";
import { useCreateConversation } from "../../hooks/chat/useCreateConversation";

const ContactsSidebar: React.FC = () => {
  const { fetchRecentConversations } = useGetRecentConversation();
  const [contacts, setContacts] = useState<any[]>([]);
  const { onlineUsers, openConversation } = useChat(); 
  const { createConversation } = useCreateConversation();
  const currentUserId = localStorage.getItem("user_id");

  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchRecentConversations();
      const mapped = data.map((conv: any) => {
        const user = conv.participants.find(
          (p: any) => p.user_id !== currentUserId
        );
        return {
          userId: user.user_id,
          conversationId: conv.conversation_id,
          name: user.name,
          avatar: user.avatar_url,
        };
      });
      setContacts(mapped);
    };
    loadContacts();
  }, [ currentUserId]);

  // 👉 Khi click vào contact
  const handleMessage = async (contact: any) => {
    try {
      // nếu đã có conversationId thì dùng luôn
      let convId = contact.conversationId;
      let convData;

      if (!convId) {
        // nếu chưa có thì tạo mới
        const res = await createConversation({ participant_ids: [contact.userId] });
        convData = res.data;
        convId = convData.conversation_id;
      }

      const newConv = {
        id: convId,
        title: contact.name,
        avatarUrl: contact.avatar,
      };

      openConversation(newConv);
    } catch (error) {
      console.error("Open chat failed:", error);
    }
  };

  return (
    <aside className="sticky hidden w-1/4 h-screen overflow-y-auto bg-white border-l border-gray-200 lg:block top-16">
      <div className="p-6">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Recent Contacts
        </h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.userId}
              name={contact.name}
              avatar={contact.avatar}
              isOnline={onlineUsers.includes(contact.userId)}
              onClick={() => handleMessage(contact)} // ✅ truyền contact
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ContactsSidebar;
