const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 relative overflow-hidden">
      {/* decorative background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      <div className="max-w-sm text-center relative z-10">
        {/* animated 3x3 glass tile grid */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl"
              style={{
                background:
                  i % 2 === 0
                    ? "rgba(79,142,247,0.12)"
                    : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                animation: i % 2 === 0 ? `tile-pulse ${1.6 + i * 0.15}s ease-in-out infinite alternate` : "none",
                boxShadow: i % 2 === 0 ? "0 0 18px rgba(79,142,247,0.1)" : "none",
              }}
            />
          ))}
        </div>

        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf2" }}
        >
          {title}
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.65 }}>{subtitle}</p>
      </div>

      <style>{`
        @keyframes tile-pulse {
          from { opacity: 0.5; transform: scale(0.97); }
          to   { opacity: 1;   transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;
