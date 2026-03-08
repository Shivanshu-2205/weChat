import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative">
      {/* shared animated background */}
      <div className="app-bg" />

      {/* ── Left: Form ──────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md fade-up">
          <div
            className="glass p-8 sm:p-10 space-y-6"
            style={{ borderRadius: "20px" }}
          >
            {/* Logo */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(79,142,247,0.15)",
                    border: "1px solid rgba(79,142,247,0.25)",
                    boxShadow: "0 0 24px rgba(79,142,247,0.15)",
                  }}
                >
                  <MessageSquare className="w-7 h-7" style={{ color: "#4f8ef7" }} />
                </div>
                <h1
                  className="text-2xl font-bold mt-1"
                  style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
                >
                  Create Account
                </h1>
                <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                  Get started with your free WeChat account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-medium uppercase tracking-wider"
                  style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4" style={{ color: "#6b7280" }} />
                  </div>
                  <input
                    type="text"
                    className="glass-input"
                    style={{ paddingLeft: "2.5rem" }}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-medium uppercase tracking-wider"
                  style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4" style={{ color: "#6b7280" }} />
                  </div>
                  <input
                    type="email"
                    className="glass-input"
                    style={{ paddingLeft: "2.5rem" }}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-medium uppercase tracking-wider"
                  style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4" style={{ color: "#6b7280" }} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="glass-input"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: "#6b7280" }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-glow mt-1" disabled={isSigningUp}>
                {isSigningUp ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center">
              <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#4f8ef7", textDecoration: "none", fontWeight: 600 }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Pattern ───────────────────────────────── */}
      <div className="relative z-10">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default SignUpPage;