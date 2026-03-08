import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div
      className="w-full flex flex-1 flex-col items-center justify-center p-16"
      style={{
        background: "rgba(7,9,14,0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-xs text-center space-y-5">
        {/* Floating icon */}
        <div className="flex justify-center mb-2">
          <div className="relative float-anim">
            {/* outer glow ring */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "rgba(79,142,247,0.08)",
                filter: "blur(16px)",
                transform: "scale(1.4)",
              }}
            />
            <div
              className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{
                background: "rgba(79,142,247,0.12)",
                border: "1px solid rgba(79,142,247,0.22)",
                boxShadow: "0 0 32px rgba(79,142,247,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <MessageSquare
                className="w-9 h-9"
                style={{ color: "#4f8ef7" }}
              />
            </div>
          </div>
        </div>

        <h2
          className="text-xl font-bold"
          style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
        >
          Welcome to WeChat
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.85rem",
            fontFamily: "'DM Mono', monospace",
            lineHeight: 1.65,
          }}
        >
          Select a conversation from the sidebar to start messaging
        </p>

        {/* subtle decorative dots */}
        <div className="flex justify-center gap-1.5 pt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full"
              style={{
                background: "#4f8ef7",
                opacity: 0.3 + i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
