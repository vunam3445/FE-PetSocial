import { useChat } from "../../contexts/ChatContext";
import { ConversationDetailModal } from "../modals/ConversationDetailModal";

export const ChatModalsContainer = () => {
  const { openConversations } = useChat();

  return (
    <div className="fixed bottom-0 flex gap-4 right-4">
      {openConversations.map((conv) => (
        <ConversationDetailModal key={conv.id} conversation={conv} />
      ))}
    </div>
  );
};
