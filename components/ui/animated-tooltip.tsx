"use client";

import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-45, 45], { clamp: true });

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {items.map((item, idx) => (
        <div
          key={item.name + idx}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            style={{ x, rotate }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.2 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 h-px -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute left-10 right-10 h-px -top-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="text-white font-bold">{item.name}</div>
                <div className="text-gray-400 text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}; 