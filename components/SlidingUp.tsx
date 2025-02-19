import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SlidingUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
  fullHeight?: boolean;
};

const SlidingUp: React.FC<SlidingUpProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title = 'Details',
  maxWidth = 'max-w-4xl',
  fullHeight = false
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center md:items-end justify-center bg-black/75 backdrop-blur-lg overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sliding-up-title"
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
            className="relative w-full md:w-[95%] max-w-6xl h-[85vh] md:h-[85vh] mb-0 md:mb-10 mx-4 md:mx-0 rounded-t-[20px] md:rounded-[20px] overflow-hidden touch-pan-y overscroll-none"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative h-full w-full bg-black/40 backdrop-blur-[16px] backdrop-saturate-[180%] ring-1 ring-inset ring-white/[0.15] shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: 0.1 }}
            >
              {/* Content container */}
              <div className="relative h-full overflow-y-auto overscroll-none -webkit-overflow-scrolling-touch scroll-smooth">
                {/* Header */}
                <motion.div 
                  className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.15] bg-white/[0.02] px-4 md:px-6 py-4 backdrop-blur-[12px] backdrop-saturate-[180%] select-none"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 id="sliding-up-title" className="text-xl font-semibold text-white">{title}</h2>
                  <motion.button
                    onClick={onClose}
                    className="rounded-full p-2 text-white/60 transition-all duration-300 hover:bg-white/[0.08] hover:text-white active:scale-95 touch-none"
                    aria-label="Close dialog"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* Main content */}
                <motion.div 
                  className="p-4 md:p-6 pb-8 overflow-y-auto overscroll-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlidingUp;
