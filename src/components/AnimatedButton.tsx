import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
}: AnimatedButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const baseClasses = 'relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300';
  const variantClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]'
    : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]';

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </span>
    </motion.button>
  );
};
