import React from "react";
import { motion } from "framer-motion";

export function Card({ children, className = "", onClick, expanded = false }) {
  return (
<motion.div
  layout
  className={`rounded-xl bg-gradient-to-br from-zinc-800 to-gray-700 shadow-xl overflow-hidden ${className}`}
  onClick={onClick}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  style={{
    isolation: "isolate", //  breaks layout sharing between  items
  }}
>
      <motion.div
        className="relative overflow-hidden"
        whileHover={expanded ? {} : { scale: 1.02 }} // Slight hover effect if not expanded
        style={{ transformOrigin: "center" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div
      className={`p-6 bg-zinc-800 bg-opacity-80 rounded-xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
