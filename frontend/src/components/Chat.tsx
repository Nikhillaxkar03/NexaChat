import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInputs from "./MessageInputs";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
const {getMessages, messages, isChatsLoading, selectedUser} = useChatStore()

useEffect (()=> {
  getMessages(selectedUser._id)
}, [selectedUser._id, getMessages])

if(isChatsLoading) {
  return <div className="flex flex-col flex-1 overflow-auto">
    <ChatHeader />
    <MessageSkeleton />
    <MessageInputs />
  </div>
}
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />

      messages

      <MessageInputs />
      
    </div>
  );
};
export default ChatContainer;