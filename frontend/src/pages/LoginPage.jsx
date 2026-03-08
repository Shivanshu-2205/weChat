import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 relative">
      {/* shared animated background */}
      <div className="app-bg" />

      {/* ── Left: Form ──────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md fade-up">
          {/* Glass card */}
          <div
            className="glass p-8 sm:p-10 space-y-7"
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
                  Welcome Back
                </h1>
                <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                  Sign in to your WeChat account
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button type="submit" className="btn-glow mt-2" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="text-center">
              <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#4f8ef7", textDecoration: "none", fontWeight: 600 }}
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Pattern ───────────────────────────────── */}
      <div className="relative z-10">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
};

export default LoginPage;