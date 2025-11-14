'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🐾</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
              PetConfort
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Início
            </Link>
            <Link href="/produto" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Produto
            </Link>
            <Link href="/cliente" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Minha Conta
            </Link>
            <Link
              href="/produto"
              className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all"
            >
              Comprar Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            <Link href="/" className="block text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Início
            </Link>
            <Link href="/produto" className="block text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Produto
            </Link>
            <Link href="/cliente" className="block text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Minha Conta
            </Link>
            <Link
              href="/produto"
              className="block text-center bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-2 rounded-full font-bold"
            >
              Comprar Agora
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
