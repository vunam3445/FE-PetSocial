import { ConversationHeader } from "../chat/ConversationHeader";
import { ConversationMessages } from "../chat/ConversationMessages";
import { ConversationFooter } from "../chat/ConversationFooter";
import { useChat } from "../../contexts/ChatContext";
import { useEffect, useState } from "react";
import { ConversationMemberModal } from "./ConversationMemberModal";
import { AddMemberModal } from "./AddMemberModal";
import EditConversationModal from "./EditConversationModal";
interface Props {
  conversation: {
    id: string;
    title: string;
    avatarUrl: string;
    is_group: boolean;
    my_role: string;
  };
}

export const ConversationDetailModal: React.FC<Props> = ({ conversation }) => {
  const { closeConversation, fetchMessages } = useChat();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpenModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(conversation);
  useEffect(() => {
    setCurrentConversation(conversation);
  }, [conversation]);
  const handleUpdateUI = (newName: string, newAvatarUrl: string) => {
    setCurrentConversation(prev => ({
      ...prev,
      title: newName,
      avatarUrl: newAvatarUrl
    }));
  };
  useEffect(() => {
    if (conversation.id) {
      setLoading(true);
      fetchMessages(conversation.id).finally(() => setLoading(false));
    }
  }, [conversation.id, fetchMessages]);
  const handleOpenGroupMember = () => {
    setIsOpenModal(true);
  };
  const handleOpenAddMember = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xl w-96 h-96 rounded-t-xl">
      <ConversationHeader
        conversationId={conversation.id}
        title={currentConversation.title} // Dùng dữ liệu từ state
        avatarUrl={currentConversation.avatarUrl} // Dùng dữ liệu từ state
        onClose={() => closeConversation(conversation.id)}
        is_group={conversation.is_group}
        onOpenModal={handleOpenGroupMember}
        my_role={conversation.my_role}
        onAddMember={handleOpenAddMember}
        onEditConversation={()=>{setOpenEditModal(true)}}
      />

      {/* loading state */}
      {loading ? (
        <div className="flex items-center justify-center flex-1 text-gray-500">
          Đang tải tin nhắn...
        </div>
      ) : (
        <ConversationMessages conversationId={conversation.id} is_group={conversation.is_group}/>
      )}

      <ConversationFooter conversationId={conversation.id} />

      <ConversationMemberModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpenModal(false);
        }}
        conversationId={conversation.id}
        created_by={conversation.created_by}
      />
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        conversationId={conversation.id}
        
      />
      {openEditModal&&(
        <EditConversationModal
          isOpen={openEditModal}
          onClose={()=>{setOpenEditModal(false)}}
          conversation={{conversationId:conversation.id,conversationName:conversation.title,conversationAvatar:conversation.avatarUrl}}
          onSave={handleUpdateUI}
        />
      )}
    </div>
  );
};
