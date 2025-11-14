'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCarousel from '@/components/ProductCarousel';

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Laranja');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['P', 'M', 'G', 'GG'];
  const colors = [
    { name: 'Laranja', hex: '#FF7A00' },
    { name: 'Verde', hex: '#3DBF4A' },
    { name: 'Azul', hex: '#3B82F6' },
    { name: 'Cinza', hex: '#6B7280' },
  ];

  const reviews = [
    {
      name: 'Carlos Mendes',
      rating: 5,
      date: '10/11/2025',
      comment: 'Produto excelente! Meu cachorro adora e a qualidade é superior.',
      avatar: '👨‍🦱',
    },
    {
      name: 'Fernanda Lima',
      rating: 5,
      date: '08/11/2025',
      comment: 'Melhor compra que fiz para minha gatinha. Ela não sai mais de cima!',
      avatar: '👩‍🦰',
    },
    {
      name: 'Roberto Silva',
      rating: 4,
      date: '05/11/2025',
      comment: 'Muito bom! Entrega rápida e produto conforme descrito.',
      avatar: '👨',
    },
  ];

  const handleAddToCart = () => {
    alert(`Adicionado ao carrinho:\n${quantity}x Tapete Térmico PetConfort\nTamanho: ${selectedSize}\nCor: ${selectedColor}`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-orange-500">Início</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Tapete Térmico PetConfort</span>
        </div>

        {/* Produto Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Carrossel de Imagens */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductCarousel />
          </motion.div>

          {/* Informações do Produto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Tapete Térmico PetConfort</h1>
            
            {/* Avaliação */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400 text-xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span className="text-gray-600">(127 avaliações)</span>
            </div>

            {/* Preço */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-orange-500">R$ 149,90</span>
                <span className="text-2xl text-gray-400 line-through">R$ 249,90</span>
              </div>
              <p className="text-green-600 font-medium mt-2">40% de desconto • Frete Grátis</p>
            </div>

            {/* Tamanhos */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Tamanho:</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cores */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Cor: {selectedColor}</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full transition-all ${
                      selectedColor === color.name ? 'ring-4 ring-offset-2 ring-orange-500' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div className="mb-8">
              <h3 className="font-bold mb-3">Quantidade:</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
              >
                Adicionar ao Carrinho
              </button>
              <button className="w-full border-2 border-orange-500 text-orange-500 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all">
                Comprar Agora
              </button>
            </div>

            {/* Garantias */}
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500 text-xl">✓</span>
                <span>Garantia de 12 meses</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500 text-xl">✓</span>
                <span>Troca grátis em até 30 dias</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500 text-xl">✓</span>
                <span>Entrega rápida e segura</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Descrição Técnica */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Descrição Técnica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3 text-orange-600">Especificações:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Material: Tecido térmico de alta qualidade</li>
                <li>• Revestimento: Impermeável e antiaderente</li>
                <li>• Temperatura: Controle automático (35-40°C)</li>
                <li>• Voltagem: 110V/220V (bivolt)</li>
                <li>• Consumo: 15W (baixo consumo)</li>
                <li>• Certificação: INMETRO</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-orange-600">Dimensões:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Tamanho P: 40x50cm (até 5kg)</li>
                <li>• Tamanho M: 60x70cm (5-15kg)</li>
                <li>• Tamanho G: 80x90cm (15-30kg)</li>
                <li>• Tamanho GG: 100x120cm (acima de 30kg)</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Avaliações */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Avaliações de Clientes</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{review.avatar}</div>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
