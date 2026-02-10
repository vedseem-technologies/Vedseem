import { Reveal } from "../ui/RevealText";
import { motion } from "framer-motion";

interface ProjectsHeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ["Web Development", "Graphics Designing"];

export default function ProjectsHeader({
  activeCategory,
  onCategoryChange,
}: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
      <div className="max-w-3xl">
        <Reveal width="100%">
          <h1 className="text-6xl py-4 md:text-8xl font-black mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter leading-[0.9]">
            Our Projects
          </h1>
        </Reveal>

        <div className="flex items-center gap-6 mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            className="h-[2px] bg-blue-500 rounded-full"
          />
          <Reveal delay={0.2}>
            <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.2em] font-bold">
              Selected Case Studies
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl">
            A curation of high-impact digital solutions, where strategic design
            meets cutting-edge technology.
          </p>
        </Reveal>
      </div>

      {/* Category Tabs with sliding background */}
      <div className="relative flex items-center p-1.5 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-xl self-start md:self-auto shadow-2xl overflow-hidden">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative z-10 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors duration-300 focus:outline-none ${
              activeCategory === category
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className="relative z-20">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
