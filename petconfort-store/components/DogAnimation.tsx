'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DogAnimation() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-br from-orange-50 to-green-50 rounded-3xl">
      {/* Tapete Térmico */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={animationComplete ? {
            boxShadow: [
              '0 0 20px rgba(255, 122, 0, 0.3)',
              '0 0 40px rgba(255, 122, 0, 0.6)',
              '0 0 20px rgba(255, 122, 0, 0.3)',
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-48 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-xl relative overflow-hidden"
        >
          {/* Padrão do tapete */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-4 grid-rows-3 h-full w-full gap-1 p-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* Efeito de calor */}
          {animationComplete && (
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-t from-yellow-300 to-transparent"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Cachorro */}
      <motion.div
        initial={{ x: -200, y: 100 }}
        animate={{
          x: animationComplete ? 0 : 280,
          y: animationComplete ? 150 : 100,
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
        }}
        onAnimationComplete={() => setAnimationComplete(true)}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        {/* Corpo do cachorro - SVG simplificado */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          className={animationComplete ? '' : 'animate-bounce-slow'}
        >
          {/* Corpo */}
          <ellipse cx="60" cy="50" rx="35" ry="25" fill="#8B4513" />
          
          {/* Cabeça */}
          <circle cx="85" cy="35" r="20" fill="#A0522D" />
          
          {/* Orelhas */}
          <ellipse cx="75" cy="20" rx="8" ry="15" fill="#8B4513" />
          <ellipse cx="95" cy="20" rx="8" ry="15" fill="#8B4513" />
          
          {/* Focinho */}
          <ellipse cx="95" cy="40" rx="10" ry="8" fill="#D2691E" />
          <circle cx="95" cy="42" r="3" fill="#000" />
          
          {/* Olhos */}
          <circle cx="80" cy="32" r="3" fill="#000" />
          {animationComplete && (
            <motion.g
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <circle cx="90" cy="32" r="3" fill="#000" />
            </motion.g>
          )}
          {!animationComplete && <circle cx="90" cy="32" r="3" fill="#000" />}
          
          {/* Pernas */}
          <rect x="40" y="65" width="8" height="15" rx="4" fill="#8B4513" />
          <rect x="55" y="65" width="8" height="15" rx="4" fill="#8B4513" />
          <rect x="70" y="65" width="8" height="15" rx="4" fill="#8B4513" />
          <rect x="85" y="65" width="8" height="15" rx="4" fill="#8B4513" />
          
          {/* Cauda */}
          <motion.path
            d="M 30 45 Q 15 40 10 30"
            stroke="#8B4513"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            animate={animationComplete ? {
              d: [
                'M 30 45 Q 15 40 10 30',
                'M 30 45 Q 15 35 10 25',
                'M 30 45 Q 15 40 10 30',
              ],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>

      {/* Texto de conforto */}
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <p className="text-orange-600 font-bold text-lg flex items-center gap-2">
              <span className="text-2xl">😴</span>
              Conforto Total!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
