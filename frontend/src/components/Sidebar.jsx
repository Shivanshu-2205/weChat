import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="slide-left h-full w-20 lg:w-72 flex flex-col transition-all duration-200 relative z-10"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="w-full p-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(79,142,247,0.15)", border: "1px solid rgba(79,142,247,0.2)" }}
          >
            <Users className="size-4" style={{ color: "#4f8ef7" }} />
          </div>
          <span
            className="font-semibold hidden lg:block"
            style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2", fontSize: "0.95rem" }}
          >
            Contacts
          </span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2.5 group">
            <div
              className="relative w-9 h-5 rounded-full transition-colors duration-200"
              style={{
                background: showOnlineOnly ? "rgba(79,142,247,0.5)" : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full transition-transform duration-200"
                style={{
                  background: showOnlineOnly ? "#4f8ef7" : "#6b7280",
                  transform: showOnlineOnly ? "translateX(17px)" : "translateX(2px)",
                  boxShadow: showOnlineOnly ? "0 0 8px rgba(79,142,247,0.6)" : "none",
                }}
              />
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
            </div>
            <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>Online only</span>
          </label>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              color: "#4f8ef7",
              background: "rgba(79,142,247,0.12)",
              border: "1px solid rgba(79,142,247,0.2)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="w-full p-3 flex items-center gap-3 transition-all duration-200 group relative"
            style={{
              background:
                selectedUser?._id === user._id
                  ? "rgba(79,142,247,0.12)"
                  : "transparent",
              borderLeft:
                selectedUser?._id === user._id
                  ? "2px solid #4f8ef7"
                  : "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (selectedUser?._id !== user._id) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedUser?._id !== user._id) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {/* Avatar + online indicator */}
            <div className="relative mx-auto lg:mx-0 flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-11 object-cover rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0">
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{
                      background: "#00e5b0",
                      boxShadow: "0 0 6px #00e5b0",
                      border: "1.5px solid #07090e",
                    }}
                  />
                </span>
              )}
            </div>

            {/* User info — larger screens */}
            <div className="hidden lg:flex flex-col text-left min-w-0 flex-1">
              <div
                className="font-medium truncate text-sm"
                style={{ color: "#e8eaf2", fontFamily: "'Syne', sans-serif" }}
              >
                {user.fullName}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{
                  color: onlineUsers.includes(user._id) ? "#00e5b0" : "#6b7280",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {onlineUsers.includes(user._id) ? "● Online" : "○ Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div
            className="text-center py-8 px-4"
            style={{ color: "#6b7280", fontSize: "0.82rem", fontFamily: "'DM Mono', monospace" }}
          >
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
