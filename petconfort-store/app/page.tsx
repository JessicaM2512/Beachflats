'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import DogAnimation from '@/components/DogAnimation';

export default function Home() {
  const benefits = [
    {
      icon: '🌡️',
      title: 'Controle Térmico',
      description: 'Mantém a temperatura ideal para o conforto do seu pet',
    },
    {
      icon: '💧',
      title: 'Impermeável',
      description: 'Material resistente à água e fácil de limpar',
    },
    {
      icon: '🛡️',
      title: 'Durável',
      description: 'Fabricado com materiais de alta qualidade',
    },
    {
      icon: '🌿',
      title: 'Ecológico',
      description: 'Produto sustentável e seguro para pets',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      rating: 5,
      comment: 'Meu cachorro adora! Ele não sai mais do tapete. Recomendo muito!',
      avatar: '👩',
    },
    {
      name: 'João Santos',
      rating: 5,
      comment: 'Produto de excelente qualidade. Meu gato finalmente encontrou seu lugar favorito.',
      avatar: '👨',
    },
    {
      name: 'Ana Costa',
      rating: 5,
      comment: 'Perfeito para o inverno! Meu pet fica quentinho e confortável.',
      avatar: '👩‍🦰',
    },
  ];

  const faqs = [
    {
      question: 'Como funciona o tapete térmico?',
      answer: 'O tapete utiliza tecnologia de aquecimento seguro que mantém uma temperatura constante e confortável para seu pet.',
    },
    {
      question: 'É seguro para todos os pets?',
      answer: 'Sim! O tapete é seguro para cães e gatos de todos os tamanhos e idades.',
    },
    {
      question: 'Como limpar o tapete?',
      answer: 'Basta passar um pano úmido. O material impermeável facilita a limpeza.',
    },
    {
      question: 'Qual o consumo de energia?',
      answer: 'O tapete tem baixo consumo energético, sendo econômico e sustentável.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section com Animação */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                Conforto Térmico
              </span>
              <br />
              para o Seu Pet,
              <br />
              em Qualquer Estação
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              O Tapete Térmico PetConfort proporciona o máximo conforto e bem-estar 
              para seu melhor amigo, mantendo a temperatura perfeita o ano todo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/produto"
                className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all text-center"
              >
                Comprar Agora
              </Link>
              <a
                href="#beneficios"
                className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all text-center"
              >
                Saiba Mais
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <DogAnimation />
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Por Que Escolher o PetConfort?</h2>
            <p className="text-xl text-gray-600">Benefícios que fazem a diferença</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-xl text-gray-600">Avaliações reais de quem já comprou</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.comment}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600">Tire suas dúvidas</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-bold mb-2 text-orange-600">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-orange-500 to-green-500 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Pronto para Proporcionar Mais Conforto?</h2>
            <p className="text-xl mb-8">Garanta já o Tapete Térmico PetConfort com desconto especial!</p>
            <Link
              href="/produto"
              className="inline-block bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
            >
              Comprar Agora com Desconto
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
