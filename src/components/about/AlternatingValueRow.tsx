import { motion, useScroll, useTransform } from 'framer-motion';
import { memo, ReactNode, useRef } from 'react';

interface AlternatingValueRowProps {
  title: string;
  desc: string;
  icon: ReactNode;
  imageUrl: string;
  back: string;
  index: number;
}

const WordReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: delay + (i * 0.05),
            ease: [0.33, 1, 0.68, 1]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const AlternatingValueRow = ({
  title,
  desc,
  imageUrl,
  back,
  index
}: Omit<AlternatingValueRowProps, 'icon'>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isImageRight = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className={`flex flex-col ${isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 py-24 relative z-10`}
    >
      {/* Image Section - 45% (Increased for visibility) */}
      <div className="w-full lg:w-[45%] relative group perspective-[2000px]">
        <motion.div
           style={{ y: imageY }}
           className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-900/20"
        >
          <motion.img 
            initial={{ filter: 'blur(10px) brightness(0.5)', scale: 1.1 }}
            whileInView={{ filter: 'blur(0px) brightness(1)', scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-opacity duration-1000 opacity-90 group-hover:opacity-100"
          />
          
          {/* Lighter Fades for Premium Visibility */}
          <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-black/40 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/40 to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black/40 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black/40 to-transparent z-10" />

          {/* Softer Radial Hub */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] z-10" />
        </motion.div>
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-10 bg-blue-500/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </div>

      {/* Text Section - 55% (Reduced width) */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-4 lg:px-8">
        <motion.div
          initial={{ x: isImageRight ? -50 : 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="max-w-2xl mx-auto lg:mx-0"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-xl font-bold p-1 px-3 rounded-lg bg-blue-500/5">0{index + 1}</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent block">
              {title}
            </span>
          </h2>
          
          <div className="text-lg lg:text-xl text-gray-300/80 leading-relaxed mb-8 font-medium">
            <WordReveal text={desc} delay={0.4} />
          </div>
          
          <div className="relative p-8 lg:p-10 rounded-[28px] bg-white/[0.02] border border-white/5 backdrop-blur-xl group/box overflow-hidden shadow-2xl">
            <div className="relative z-10 text-gray-300 italic text-lg lg:text-xl leading-relaxed">
              <WordReveal text={back} delay={0.7} />
            </div>

            {/* Premium Accent Line */}
            <div className={`absolute ${isImageRight ? 'right-0' : 'left-0'} top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500 to-transparent opacity-40`} />
            
            {/* Box Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent opacity-0 group-hover/box:opacity-100 transition-all duration-700" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(AlternatingValueRow);
