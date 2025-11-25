"use client";
import type { Tech } from "../types";

export default function TechStackHologram() {
  const tech: Tech[] = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "📘" },
    { name: "Python", icon: "🐍" },
    { name: "AWS", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "GraphQL", icon: "◈" },
    { name: "Kubernetes", icon: "☸️" },
    { name: "Redis", icon: "🔴" },
    { name: "Next.js", icon: "▲" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(#0a0a0a_1px,transparent_1px),linear-gradient(90deg,#0a0a0a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-center text-5xl font-black text-white mb-12">
          Holographic{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Tech Stack
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {tech.map((t, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border border-blue-400/20 bg-white/5 backdrop-blur-md
              hover:shadow-[0_0_25px_rgba(0,199,255,0.4)] 
              hover:border-cyan-400/50 
              transform transition-all duration-300 hover:-translate-y-2"
              style={{
                animation: `floatY ${4 + (i % 4)}s ease-in-out infinite`,
              }}
            >
              <div className="text-5xl mb-3 group-hover:scale-125 transition-all">
                {t.icon}
              </div>
              <div className="text-white text-lg font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
