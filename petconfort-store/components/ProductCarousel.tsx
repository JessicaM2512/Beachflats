'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const productImages = [
  {
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    alt: 'Tapete Térmico PetConfort - Vista Principal',
  },
  {
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop',
    alt: 'Pet usando o tapete térmico',
  },
  {
    url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    alt: 'Detalhe do material do tapete',
  },
  {
    url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=600&fit=crop',
    alt: 'Tapete em uso - Conforto garantido',
  },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="relative">
      {/* Carrossel Principal */}
      <div className="relative h-[500px] bg-gray-100 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={productImages[currentIndex].url}
            alt={productImages[currentIndex].alt}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Botões de Navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative h-24 rounded-lg overflow-hidden transition-all ${
              index === currentIndex ? 'ring-4 ring-orange-500' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
