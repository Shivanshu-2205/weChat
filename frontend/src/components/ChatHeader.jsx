import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div
      className="px-5 py-3.5 flex-shrink-0"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(79,142,247,0.15)",
        boxShadow: "0 1px 0 rgba(79,142,247,0.08)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left: avatar + info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover"
              style={{ border: "1.5px solid rgba(255,255,255,0.12)" }}
            />
            {isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{
                    background: "#00e5b0",
                    border: "1.5px solid #07090e",
                    boxShadow: "0 0 6px #00e5b0",
                  }}
                />
              </span>
            )}
          </div>

          <div>
            <h3
              className="font-semibold text-sm leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
            >
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isOnline ? (
                <>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00e5b0", boxShadow: "0 0 5px #00e5b0" }}
                  />
                  <span
                    style={{
                      color: "#00e5b0",
                      fontSize: "0.72rem",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Online
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "#6b7280" }}
                  />
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "0.72rem",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Offline
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#6b7280",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.12)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
