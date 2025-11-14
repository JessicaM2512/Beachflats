'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClientePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('pedidos');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  const orders = [
    {
      id: '#12345',
      date: '10/11/2025',
      status: 'Entregue',
      total: 'R$ 149,90',
      items: 'Tapete Térmico PetConfort (M, Laranja)',
      tracking: 'BR123456789BR',
    },
    {
      id: '#12344',
      date: '25/10/2025',
      status: 'Em trânsito',
      total: 'R$ 149,90',
      items: 'Tapete Térmico PetConfort (G, Verde)',
      tracking: 'BR987654321BR',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password === registerForm.confirmPassword) {
      setIsLoggedIn(true);
      setIsRegistering(false);
    } else {
      alert('As senhas não coincidem!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🐾</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isRegistering ? 'Criar Conta' : 'Bem-vindo de Volta!'}
              </h1>
              <p className="text-gray-600">
                {isRegistering ? 'Cadastre-se para começar' : 'Entre na sua conta PetConfort'}
              </p>
            </div>

            {!isRegistering ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Senha</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                  Entrar
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="text-orange-500 hover:underline"
                  >
                    Não tem conta? Cadastre-se
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Senha</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirmar Senha</label>
                  <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                  Cadastrar
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="text-orange-500 hover:underline"
                  >
                    Já tem conta? Faça login
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Minha Conta</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {['pedidos', 'dados', 'rastreamento'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'pedidos' && 'Meus Pedidos'}
                {tab === 'dados' && 'Dados Pessoais'}
                {tab === 'rastreamento' && 'Rastreamento'}
              </button>
            ))}
          </div>

          {/* Conteúdo das Tabs */}
          {activeTab === 'pedidos' && (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Pedido {order.id}</h3>
                      <p className="text-gray-600">Data: {order.date}</p>
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-full font-bold ${
                      order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-gray-700 mb-2">{order.items}</p>
                    <p className="text-2xl font-bold text-orange-500">{order.total}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'dados' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Dados Pessoais</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo</label>
                    <input
                      type="text"
                      defaultValue="João Silva"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <input
                      type="email"
                      defaultValue="joao@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <input
                      type="tel"
                      defaultValue="(11) 99999-9999"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CPF</label>
                    <input
                      type="text"
                      defaultValue="123.456.789-00"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                  Salvar Alterações
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'rastreamento' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Rastreamento de Entrega</h2>
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Pedido {order.id}</h3>
                        <p className="text-gray-600">Código: {order.tracking}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-bold ${
                        order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-green-500"></div>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute -left-9 w-4 h-4 bg-green-500 rounded-full"></div>
                          <p className="font-medium">Pedido entregue</p>
                          <p className="text-sm text-gray-600">10/11/2025 - 14:30</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-9 w-4 h-4 bg-orange-500 rounded-full"></div>
                          <p className="font-medium">Saiu para entrega</p>
                          <p className="text-sm text-gray-600">10/11/2025 - 09:15</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-9 w-4 h-4 bg-gray-300 rounded-full"></div>
                          <p className="font-medium">Em trânsito</p>
                          <p className="text-sm text-gray-600">08/11/2025 - 16:20</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-9 w-4 h-4 bg-gray-300 rounded-full"></div>
                          <p className="font-medium">Pedido enviado</p>
                          <p className="text-sm text-gray-600">07/11/2025 - 10:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botão Sair */}
          <div className="mt-8">
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Sair da Conta
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
