import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  pageReady: boolean;
  onComplete: () => void;
}

const TARGET_TEXT = "VEDSEEM";
const BOOT_SEQUENCE = [
  "> INITIALIZING KERNEL...",
  "> LOADING MODULES...",
  "> VERIFYING SECURITY...",
  "> SYSTEM READY."
];
const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Loader({ pageReady, onComplete }: LoaderProps) {
  const [displayText, setDisplayText] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bootLine, setBootLine] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);

  // Boot Sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setBootLine(prev => {
        if (prev < BOOT_SEQUENCE.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setShowMainContent(true), 200); // Trigger main content
        return prev;
      });
    }, 150); // Speed of boot lines

    return () => clearInterval(interval);
  }, []);

  // Decoding Effect (Triggers after boot)
  useEffect(() => {
    if (!showMainContent) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        TARGET_TEXT
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= TARGET_TEXT.length) { 
        clearInterval(interval);
      }
      
      iteration += 1/3; 
    }, 30);

    return () => clearInterval(interval);
  }, [showMainContent]);

  // Progress Bar
  useEffect(() => {
    if (!showMainContent) return;
    
    const timer = setInterval(() => {
        setProgress(old => {
            if (old >= 90) return old;
            const diff = Math.random() * 10;
            return Math.min(old + diff, 90);
        });
    }, 200);

    return () => clearInterval(timer);
  }, [showMainContent]);

  // Completion Logic
  useEffect(() => {
    if (pageReady && showMainContent) {
        setProgress(100);
        const timeout = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1000);
        }, 1200);
        return () => clearTimeout(timeout);
    }
  }, [pageReady, showMainContent, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
           transition={{ duration: 0.8 }}
           className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden font-sans"
        >
            {/* Boot Sequence Overlay (fades out when main content appears) */}
            <AnimatePresence>
                {!showMainContent && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-10 left-10 font-mono text-xs text-blue-500/50 flex flex-col items-start gap-1"
                    >
                        {BOOT_SEQUENCE.slice(0, bootLine + 1).map((line, i) => (
                            <span key={i}>{line}</span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Entrance */}
            {showMainContent && (
                <div className="z-10 relative text-center">
                    <motion.div
                        initial={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-widest mb-8 mix-blend-difference select-none">
                            {displayText || "VEDSEEM"}
                        </h1>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-72 md:w-96 h-1 bg-gray-900 rounded-full overflow-hidden mx-auto mb-3 relative">
                            <motion.div 
                                className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between w-72 md:w-96 mx-auto text-[10px] md:text-xs font-mono text-blue-500/60 uppercase tracking-widest">
                            <span>Initializing Core...</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Background decorators */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,20,0.2)_50%,rgba(0,0,0,0)_100%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
