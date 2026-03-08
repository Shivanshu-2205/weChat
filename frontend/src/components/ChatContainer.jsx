import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{
        background: "rgba(7,9,14,0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <ChatHeader />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex items-end gap-2.5 ${isSent ? "flex-row-reverse" : "flex-row"} ${
                isSent ? "msg-sent" : "msg-received"
              }`}
              ref={messageEndRef}
            >
              {/* Avatar */}
              <img
                src={
                  isSent
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile"
                className="size-8 rounded-full object-cover flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />

              {/* Bubble + timestamp */}
              <div className={`flex flex-col gap-1 max-w-[68%] ${isSent ? "items-end" : "items-start"}`}>
                {/* Timestamp */}
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "0.68rem",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {formatMessageTime(message.createdAt)}
                </span>

                {/* Bubble */}
                <div
                  className="rounded-2xl px-4 py-2.5"
                  style={
                    isSent
                      ? {
                          background: "rgba(79,142,247,0.2)",
                          border: "1px solid rgba(79,142,247,0.32)",
                          borderBottomRightRadius: "4px",
                          boxShadow: "0 2px 12px rgba(79,142,247,0.12)",
                        }
                      : {
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderBottomLeftRadius: "4px",
                          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                        }
                  }
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-xl mb-2"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  )}
                  {message.text && (
                    <p
                      style={{
                        color: "#e8eaf2",
                        fontSize: "0.88rem",
                        fontFamily: "'DM Mono', monospace",
                        lineHeight: 1.55,
                      }}
                    >
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
