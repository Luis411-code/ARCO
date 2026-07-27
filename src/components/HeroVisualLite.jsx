// src/components/HeroVisualLite.jsx
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroVisualLite = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const CONFIG = {
      particleCount: 30,
      connectionDistance: 100,
      maxSpeed: 0.3,
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * CONFIG.maxSpeed * 2;
        this.vy = (Math.random() - 0.5) * CONFIG.maxSpeed * 2;
        this.radius = 1.5 + Math.random() * 1.5;
        this.opacity = 0.3 + Math.random() * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 180, 41, ${this.opacity})`;
        ctx.fill();
      }
    }

    function drawConnections(ctx) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.connectionDistance) {
            const opacity = 1 - (distance / CONFIG.connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(240, 180, 41, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      drawConnections(ctx);
      animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    particles = Array.from({ length: CONFIG.particleCount }, () => new Particle());
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center bg-gradient-to-br from-slate-900 via-primary to-slate-800 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo ARCO en el Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src="/logo.png" 
            alt="ARCO" 
            className="h-16 md:h-20 w-auto mx-auto drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-secondary/20 backdrop-blur-sm px-6 py-2 rounded-full text-secondary font-semibold text-sm mb-6 border border-secondary/30">
            🎯 Publicidad y Comunicación Gráfica
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1]"
        >
          Transformamos tus
          <span className="block text-secondary">ideas en impacto visual</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-blue-100/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mt-6"
        >
          Soluciones integrales en artes gráficas: cartelería, señalética, 
          impresión y diseño. Calidad y garantía en cada proyecto.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Link
            to="/servicios"
            className="bg-secondary text-primary px-10 py-4 rounded-full font-bold text-base md:text-lg shadow-2xl shadow-secondary/30 hover:shadow-secondary/50 transition-all hover:scale-105 inline-flex items-center gap-3"
          >
            <span>Ver Servicios</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/contacto"
            className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all"
          >
            Contáctanos
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/30 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroVisualLite;