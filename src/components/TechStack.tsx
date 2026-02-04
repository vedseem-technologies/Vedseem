"use client";
import type { Tech } from "../types";

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

export default function TechStackHologram() {
  return (
    <section
      id="technologies"
      className="relative py-28 bg-black overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-center text-5xl font-extrabold text-white mb-16">
          Tech Stack{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            We Trust
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {tech.map((t) => (
            <div
              key={t.name}
              className="
                group relative rounded-2xl border border-white/10
                bg-white/[0.04]
                p-6 text-center
                transition-transform duration-200 ease-out
                hover:-translate-y-1
                hover:border-cyan-400/40
              "
            >
              <div className="mx-auto mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                {t.icon}
              </div>

              <div className="text-white/90 font-medium tracking-wide">
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
