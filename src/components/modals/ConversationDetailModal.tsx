import { ConversationHeader } from "../chat/ConversationHeader";
import { ConversationMessages } from "../chat/ConversationMessages";
import { ConversationFooter } from "../chat/ConversationFooter";
import { useChat } from "../../contexts/ChatContext";
import { useEffect, useState } from "react";

interface Props {
  conversation: { id: string; title: string; avatarUrl: string };
}

export const ConversationDetailModal: React.FC<Props> = ({ conversation }) => {
  const { closeConversation, fetchMessages } = useChat();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (conversation.id) {
      setLoading(true);
      fetchMessages(conversation.id).finally(() => setLoading(false));
    }
  }, [conversation.id, fetchMessages]);

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xl w-96 h-96 rounded-t-xl">
      <ConversationHeader
        title={conversation.title}
        avatarUrl={conversation.avatarUrl}
        onClose={() => closeConversation(conversation.id)}
      />

      {/* loading state */}
      {loading ? (
        <div className="flex items-center justify-center flex-1 text-gray-500">
          Đang tải tin nhắn...
        </div>
      ) : (
        <ConversationMessages conversationId={conversation.id} />
      )}

      <ConversationFooter conversationId={conversation.id} />
    </div>
  );
};
