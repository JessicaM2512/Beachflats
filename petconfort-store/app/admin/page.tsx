'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const salesData = [
    { month: 'Jan', vendas: 45, receita: 6735 },
    { month: 'Fev', vendas: 52, receita: 7794 },
    { month: 'Mar', vendas: 61, receita: 9143 },
    { month: 'Abr', vendas: 58, receita: 8694 },
    { month: 'Mai', vendas: 73, receita: 10942 },
    { month: 'Jun', vendas: 89, receita: 13341 },
  ];

  const products = [
    { id: 1, name: 'Tapete Térmico P', price: 129.90, stock: 45, sales: 234 },
    { id: 2, name: 'Tapete Térmico M', price: 149.90, stock: 32, sales: 456 },
    { id: 3, name: 'Tapete Térmico G', price: 179.90, stock: 28, sales: 189 },
    { id: 4, name: 'Tapete Térmico GG', price: 199.90, stock: 15, sales: 98 },
  ];

  const orders = [
    { id: '#12345', customer: 'Maria Silva', date: '14/11/2025', status: 'Pendente', total: 149.90 },
    { id: '#12344', customer: 'João Santos', date: '13/11/2025', status: 'Enviado', total: 179.90 },
    { id: '#12343', customer: 'Ana Costa', date: '13/11/2025', status: 'Entregue', total: 149.90 },
    { id: '#12342', customer: 'Carlos Mendes', date: '12/11/2025', status: 'Processando', total: 199.90 },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@petconfort.com' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4 bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">Acesso restrito a administradores</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="admin@petconfort.com"
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
            <p className="text-sm text-gray-500 text-center mt-4">
              Demo: admin@petconfort.com / admin123
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Painel Administrativo</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['dashboard', 'produtos', 'pedidos', 'cupons'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'produtos' && '📦 Produtos'}
              {tab === 'pedidos' && '🛍️ Pedidos'}
              {tab === 'cupons' && '🎟️ Cupons'}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Vendas Hoje</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-3xl font-bold text-orange-500">R$ 2.847</p>
                <p className="text-sm text-green-600 mt-2">+12% vs ontem</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Pedidos</h3>
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-3xl font-bold text-green-500">19</p>
                <p className="text-sm text-green-600 mt-2">+8% vs ontem</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Clientes</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-3xl font-bold text-blue-500">1.234</p>
                <p className="text-sm text-green-600 mt-2">+23 novos</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Ticket Médio</h3>
                  <span className="text-2xl">💳</span>
                </div>
                <p className="text-3xl font-bold text-purple-500">R$ 149,90</p>
                <p className="text-sm text-green-600 mt-2">+5% vs mês passado</p>
              </motion.div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4">Vendas por Mês</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="vendas" fill="#FF7A00" name="Vendas" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4">Receita Mensal</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="receita" stroke="#3DBF4A" strokeWidth={3} name="Receita (R$)" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        )}

        {/* Produtos */}
        {activeTab === 'produtos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
              <button className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                + Adicionar Produto
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Produto</th>
                    <th className="px-6 py-4 text-left font-bold">Preço</th>
                    <th className="px-6 py-4 text-left font-bold">Estoque</th>
                    <th className="px-6 py-4 text-left font-bold">Vendas</th>
                    <th className="px-6 py-4 text-left font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4 font-bold text-orange-500">R$ {product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          product.stock > 30 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {product.stock} un.
                        </span>
                      </td>
                      <td className="px-6 py-4">{product.sales}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:text-blue-700 mr-3">Editar</button>
                        <button className="text-red-500 hover:text-red-700">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pedidos */}
        {activeTab === 'pedidos' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Gerenciar Pedidos</h2>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Pedido</th>
                    <th className="px-6 py-4 text-left font-bold">Cliente</th>
                    <th className="px-6 py-4 text-left font-bold">Data</th>
                    <th className="px-6 py-4 text-left font-bold">Status</th>
                    <th className="px-6 py-4 text-left font-bold">Total</th>
                    <th className="px-6 py-4 text-left font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          order.status === 'Entregue' ? 'bg-green-100 text-green-700' :
                          order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Processando' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-orange-500">R$ {order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:text-blue-700">Ver Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cupons */}
        {activeTab === 'cupons' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Cupons Promocionais</h2>
              <button className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                + Criar Cupom
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { code: 'BEMVINDO10', discount: '10%', uses: 45, limit: 100, active: true },
                { code: 'PRIMEIRACOMPRA', discount: '15%', uses: 23, limit: 50, active: true },
                { code: 'BLACKFRIDAY', discount: '40%', uses: 156, limit: 200, active: false },
              ].map((coupon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{coupon.code}</h3>
                      <p className="text-3xl font-bold text-orange-500">{coupon.discount}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      coupon.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {coupon.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Usos: {coupon.uses} / {coupon.limit}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${(coupon.uses / coupon.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 text-blue-500 hover:text-blue-700 font-medium">Editar</button>
                    <button className="flex-1 text-red-500 hover:text-red-700 font-medium">Excluir</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
