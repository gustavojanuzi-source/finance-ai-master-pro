import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([
    { ticker: 'PETR4', quantity: 100, avgPrice: 28.50, currentPrice: 32.10 },
    { ticker: 'MXRF11', quantity: 500, avgPrice: 9.80, currentPrice: 10.80 },
  ]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addExpense = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const expense = {
      id: Date.now(),
      description: form.get('description'),
      value: parseFloat(form.get('value')),
      installments: parseInt(form.get('installments')) || 1,
      date: form.get('date'),
      category: form.get('category'),
    };
    setExpenses([...expenses, expense]);
    e.target.reset();
    alert('✅ Lançamento registrado com sucesso!');
  };

  const totalInvested = investments.reduce((sum, inv) => sum + (inv.quantity * inv.avgPrice), 0);
  const currentValue = investments.reduce((sum, inv) => sum + (inv.quantity * inv.currentPrice), 0);
  const profit = currentValue - totalInvested;
  const profitPercent = (profit / totalInvested * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Head>
        <title>Finance AI Master</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📊 Finance AI Master</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Saldo Atual</h3>
            <p className="text-2xl font-bold">R$ 12.450,00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Faturas em Aberto</h3>
            <p className="text-2xl font-bold text-red-500">R$ 1.400,00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Patrimônio Líquido</h3>
            <p className="text-2xl font-bold text-green-500">R$ {currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Gráficos Simulados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">📈 Evolução do Caixa (últimos 6 meses)</h3>
            <img src="https://via.placeholder.com/600x300/4f46e5/ffffff?text=Gráfico+de+Linha+Simulado" alt="Gráfico de linha" className="w-full rounded" />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">🥧 Gastos por Categoria</h3>
            <img src="https://via.placeholder.com/600x300/059669/ffffff?text=Gráfico+de+Pizza+Simulado" alt="Gráfico de pizza" className="w-full rounded" />
          </div>
        </div>

        {/* Formulário de Lançamento */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">💳 Lançar Despesa (Parcelada ou À Vista)</h2>
          <form onSubmit={addExpense} className="space-y-4">
            <input name="description" placeholder="Descrição" className="w-full p-3 border rounded dark:bg-gray-700" required />
            <input name="value" type="number" step="0.01" placeholder="Valor (R$)" className="w-full p-3 border rounded dark:bg-gray-700" required />
            <input name="installments" type="number" min="1" defaultValue="1" placeholder="Parcelas" className="w-full p-3 border rounded dark:bg-gray-700" />
            <input name="date" type="date" className="w-full p-3 border rounded dark:bg-gray-700" required />
            <select name="category" className="w-full p-3 border rounded dark:bg-gray-700" required>
              <option value="">Selecione a categoria</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="lazer">Lazer</option>
              <option value="educacao">Educação</option>
              <option value="investimentos">Investimentos</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold">
              🚀 Registrar Lançamento
            </button>
          </form>
        </div>

        {/* Módulo de Investimentos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">📈 Meus Investimentos</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Rentabilidade Consolidada</p>
              <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {profit >= 0 ? '+' : ''}{profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ({profitPercent}%)
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="pb-2">Ativo</th>
                  <th className="pb-2">Quantidade</th>
                  <th className="pb-2">Preço Médio</th>
                  <th className="pb-2">Preço Atual</th>
                  <th className="pb-2">Valor Atual</th>
                  <th className="pb-2">Rentabilidade</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv, i) => (
                  <tr key={i} className="border-b dark:border-gray-700">
                    <td className="py-3">{inv.ticker}</td>
                    <td>{inv.quantity}</td>
                    <td>R$ {inv.avgPrice.toFixed(2)}</td>
                    <td>R$ {inv.currentPrice.toFixed(2)}</td>
                    <td>R$ {(inv.quantity * inv.currentPrice).toFixed(2)}</td>
                    <td className={inv.currentPrice >= inv.avgPrice ? 'text-green-500' : 'text-red-500'}>
                      {(((inv.currentPrice - inv.avgPrice) / inv.avgPrice) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botões de Relatório e Exportação */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => alert('📥 Gerando relatório PDF mensal... (simulado)')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
          >
            📄 Gerar Relatório PDF
          </button>
          <button
            onClick={() => alert('📊 Exportando para Excel... (simulado)')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold"
          >
            📥 Exportar Excel/CSV
          </button>
        </div>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>Finance AI Master — Construído com inteligência estratégica estilo Sam Altman 🧠</p>
        </footer>
      </div>
    </div>
  );
}