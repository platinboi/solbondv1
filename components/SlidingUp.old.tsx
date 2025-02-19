import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SlidingUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const SlidingUp: React.FC<SlidingUpProps> = ({ isOpen, onClose, children, title = 'Details' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="relative w-[95%] max-w-6xl h-[80vh] mb-20 rounded-t-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative h-full w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: 0.1 }}
            >
        {/* Glass effect container with even rounded corners */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/60 to-black/50 backdrop-blur-xl border border-white/[0.15] shadow-2xl" />
        
        {/* Inner glass reflection */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.18] to-transparent" />
        
        {/* Content wrapper with fixed header */}
        <div className="relative h-full rounded-2xl flex flex-col overflow-hidden">
          {/* Fixed header with glass effect */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.15] bg-white/[0.03] backdrop-blur-sm">
            <h2 className="text-xl font-medium tracking-tight text-white/95 select-none">
              {title}
            </h2>
            <button
              onClick={handleClose}
              className="p-2.5 rounded-full bg-white/[0.1] hover:bg-white/[0.15] backdrop-blur-md border border-white/[0.15] transition-all duration-200 focus:outline-none group"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-8 py-6 hide-scrollbar">
            <div className="prose prose-invert prose-lg max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Optimize typography */
        .prose {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }
        .prose h1, .prose h2, .prose h3, .prose h4 {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
          letter-spacing: -0.025em;
          margin-top: 2em;
          margin-bottom: 0.75em;
        }
        .prose p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
        }
        .prose strong {
          color: rgba(255, 255, 255, 0.95);
        }
        .prose-lg {
          font-size: 1.125rem;
        }
        
        /* Card styles */
        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 1rem;
          padding: 1.75rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease-in-out;
          overflow: visible;
          position: relative;
          z-index: 1;
        }
        .card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px -1px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
        .card:before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.2) 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        /* Ensure content inside cards is visible */
        .card h1, .card h2, .card h3, .card h4, .card h5, .card h6 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.75rem;
        }
        .card p, .card span, .card div {
          color: rgba(255, 255, 255, 0.8);
        }
        .card strong {
          color: rgba(255, 255, 255, 1);
          font-weight: 600;
        }
        .card code {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: rgba(255, 255, 255, 0.9);
        }
        .card pre {
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .card ul, .card ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .card li {
          margin: 0.5rem 0;
        }
        
        /* Improve grid layouts inside cards */
        .card .grid {
          display: grid;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        /* Feature items inside cards */
        .card .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Performance sections inside cards */
        .card .performance-section {
          margin: 1.5rem 0;
        }
        
        /* Tab styles */
        .tab-button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .tab-button:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .tab-button[data-state="active"] {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SlidingUp; 