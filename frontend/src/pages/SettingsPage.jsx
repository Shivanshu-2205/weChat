import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen w-full relative">
      <div className="app-bg" />
      <div className="relative z-10 h-full overflow-y-auto pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8 fade-up">

          {/* Theme selector */}
          <div
            className="glass p-6 space-y-5"
            style={{ borderRadius: "20px" }}
          >
            <div>
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
              >
                Theme
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "4px", fontFamily: "'DM Mono', monospace" }}>
                Choose a theme for your chat interface
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200"
                  style={{
                    background: theme === t ? "rgba(79,142,247,0.12)" : "rgba(255,255,255,0.03)",
                    border: theme === t
                      ? "1px solid rgba(79,142,247,0.3)"
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: theme === t ? "0 0 12px rgba(79,142,247,0.12)" : "none",
                  }}
                >
                  <div className="relative h-8 w-full rounded-lg overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary" />
                      <div className="rounded bg-secondary" />
                      <div className="rounded bg-accent" />
                      <div className="rounded bg-neutral" />
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-medium truncate w-full text-center"
                    style={{ color: theme === t ? "#4f8ef7" : "#6b7280", fontFamily: "'DM Mono', monospace" }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div
            className="glass p-6"
            style={{ borderRadius: "20px" }}
          >
            <h3
              className="text-base font-bold mb-4"
              style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
            >
              Preview
            </h3>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Mock Chat Header */}
              <div
                className="px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: "#4f8ef7" }}
                >
                  J
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
                  >
                    John Doe
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#00e5b0", fontFamily: "'DM Mono', monospace" }}
                  >
                    ● Online
                  </p>
                </div>
              </div>

              {/* Mock Messages */}
              <div
                className="p-4 space-y-3 min-h-[160px] max-h-[160px] overflow-y-auto"
                style={{ background: "rgba(7,9,14,0.4)" }}
              >
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[75%] rounded-2xl px-3.5 py-2"
                      style={
                        message.isSent
                          ? {
                              background: "rgba(79,142,247,0.2)",
                              border: "1px solid rgba(79,142,247,0.32)",
                            }
                          : {
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(255,255,255,0.09)",
                            }
                      }
                    >
                      <p style={{ color: "#e8eaf2", fontSize: "0.82rem", fontFamily: "'DM Mono', monospace" }}>
                        {message.content}
                      </p>
                      <p style={{ color: "#6b7280", fontSize: "0.65rem", marginTop: "3px", fontFamily: "'DM Mono', monospace" }}>
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock Input */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex-1 px-4 py-2 rounded-full text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#6b7280",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  This is a preview
                </div>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "#4f8ef7", boxShadow: "0 0 12px rgba(79,142,247,0.35)" }}
                >
                  <Send size={14} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
