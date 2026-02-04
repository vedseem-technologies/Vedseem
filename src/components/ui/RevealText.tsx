"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export const RevealText = ({ 
  children, 
  className, 
  delay = 0, 
  width = "fit-content" 
}: RevealTextProps) => {
  return (
    <div style={{ width }} className={cn("overflow-hidden relative inline-block", className)}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay: delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const Reveal = ({ 
    children, 
    className, 
    delay = 0, 
    width = "fit-content" 
  }: RevealTextProps) => {
    return (
      <div style={{ width }} className={cn("relative", className)}>
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  };
