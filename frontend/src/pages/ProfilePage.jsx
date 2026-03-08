import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen w-full relative">
      <div className="app-bg" />
      <div className="relative z-10 h-full overflow-y-auto pt-20 pb-8 px-4">
        <div className="max-w-xl mx-auto fade-up">
          <div
            className="glass p-8 space-y-8"
            style={{ borderRadius: "20px" }}
          >
            {/* Header */}
            <div className="text-center">
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
              >
                Profile
              </h1>
              <p style={{ color: "#6b7280", fontSize: "0.82rem", marginTop: "4px" }}>
                Your account information
              </p>
            </div>

            {/* Avatar upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-28 rounded-full object-cover"
                  style={{ border: "2px solid rgba(79,142,247,0.3)", boxShadow: "0 0 24px rgba(79,142,247,0.15)" }}
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                  style={{
                    background: "#4f8ef7",
                    border: "2px solid #07090e",
                    boxShadow: "0 0 14px rgba(79,142,247,0.4)",
                  }}
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.78rem", fontFamily: "'DM Mono', monospace" }}>
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Info fields */}
            <div className="space-y-4">
              {/* Full name */}
              <div className="space-y-1.5">
                <div
                  className="flex items-center gap-2 text-xs uppercase tracking-wider"
                  style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}
                >
                  <User className="w-3.5 h-3.5" />
                  Full Name
                </div>
                <div
                  className="px-4 py-2.5 rounded-xl text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e8eaf2",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {authUser?.fullName}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <div
                  className="flex items-center gap-2 text-xs uppercase tracking-wider"
                  style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Address
                </div>
                <div
                  className="px-4 py-2.5 rounded-xl text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e8eaf2",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Account info */}
            <div
              className="rounded-xl p-5 space-y-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h2
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
              >
                Account Information
              </h2>
              <div
                className="flex items-center justify-between py-2.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: "#6b7280", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace" }}>
                  Member Since
                </span>
                <span style={{ color: "#e8eaf2", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace" }}>
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: "#6b7280", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace" }}>
                  Account Status
                </span>
                <span
                  className="flex items-center gap-1.5"
                  style={{ color: "#00e5b0", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace" }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00e5b0", boxShadow: "0 0 5px #00e5b0" }}
                  />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
