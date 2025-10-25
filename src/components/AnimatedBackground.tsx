import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <GradientMesh />
      <ParticleField />
      <OrbitalSpheres />
    </div>
  );
};

const GradientMesh = () => {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-1/2 h-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 4px rgba(6, 182, 212, 0.8)',
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const OrbitalSpheres = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="absolute w-96 h-96"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
          }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[500px] h-[500px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[600px] h-[600px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
          style={{
            boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
          }}
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
};
