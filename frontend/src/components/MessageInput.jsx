import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div
      className="px-4 py-3 flex-shrink-0"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(239,68,68,0.8)",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#fff",
              }}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input row */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2.5">
        {/* Attach image button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200"
          style={{
            background: imagePreview ? "rgba(79,142,247,0.18)" : "rgba(255,255,255,0.05)",
            border: imagePreview
              ? "1px solid rgba(79,142,247,0.35)"
              : "1px solid rgba(255,255,255,0.08)",
            color: imagePreview ? "#4f8ef7" : "#6b7280",
          }}
        >
          <Image size={16} />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Text input */}
        <div className="flex-1 relative">
          <input
            type="text"
            className="glass-input"
            style={{ borderRadius: "999px", paddingLeft: "1.2rem", paddingRight: "1.2rem" }}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200"
          style={{
            background: canSend ? "#4f8ef7" : "rgba(255,255,255,0.05)",
            border: canSend
              ? "1px solid rgba(79,142,247,0.5)"
              : "1px solid rgba(255,255,255,0.08)",
            color: canSend ? "#fff" : "#6b7280",
            boxShadow: canSend ? "0 0 16px rgba(79,142,247,0.3)" : "none",
            cursor: canSend ? "pointer" : "not-allowed",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (canSend) e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
