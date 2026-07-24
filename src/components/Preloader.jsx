import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animación de progreso del 0 al 100
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += 100 / steps;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }
      setProgress(Math.min(Math.round(currentProgress), 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #0d2847 50%, #1a3a5c 100%)'
          }}
        >
          <div className="flex flex-col items-center justify-center max-w-md w-full px-8 relative">
            
            {/* Círculo de fondo con glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-[#f0b429]/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Logo animado */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#f0b429]/20 to-[#f0b429]/5 rounded-2xl flex items-center justify-center border border-[#f0b429]/30 shadow-2xl shadow-[#f0b429]/10 backdrop-blur-sm">
                <img 
                  src="/favicon.ico" 
                  alt="Soluciones Holguín" 
                  className="w-16 h-16"
                />
              </div>
            </motion.div>

            {/* Número de progreso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 mb-6"
            >
              <span className="text-6xl md:text-7xl font-light text-white/90 tracking-wider">
                {progress}
                <span className="text-3xl md:text-4xl text-[#f0b429] ml-1">%</span>
              </span>
            </motion.div>

            {/* Barra de progreso */}
            <div className="relative z-10 w-full max-w-xs">
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #f0b429, #f5d06a, #f0b429)',
                    boxShadow: '0 0 20px rgba(240, 180, 41, 0.3)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Puntos decorativos */}
              <div className="absolute -top-1.5 left-0 right-0 flex justify-between px-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      progress >= (i + 1) * 20
                        ? 'bg-[#f0b429] shadow-lg shadow-[#f0b429]/30'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Texto de estado */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative z-10 text-blue-200/60 text-xs font-light tracking-widest uppercase mt-6"
            >
              {progress < 30 && 'Iniciando...'}
              {progress >= 30 && progress < 60 && 'Cargando recursos...'}
              {progress >= 60 && progress < 90 && 'Preparando experiencia...'}
              {progress >= 90 && progress < 100 && 'Casi listo...'}
              {progress >= 100 && '¡Listo!'}
            </motion.p>

            {/* Partículas decorativas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#f0b429]/20 rounded-full"
                  animate={{
                    x: [
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                    ],
                    y: [
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                      Math.random() * 300 - 150,
                    ],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;