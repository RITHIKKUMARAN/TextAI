import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export const GradientText = ({ children, className = '', animated = true }: GradientTextProps) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: animated ? '200% 200%' : '100% 100%',
      }}
      animate={animated ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : {}}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
};
