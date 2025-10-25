import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
}

export const GlassCard = ({ children, className = '', hover3D = false }: GlassCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3D) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    if (!hover3D) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={hover3D ? {
        rotateX,
        rotateY,
      } : {}}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 60px rgba(124, 58, 237, 0.3)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
