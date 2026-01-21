import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Concept = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Concept Of Function</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Understanding The Fundamental Building Block Of Mathematics And Programming</p>
      </header>

      <div className="space-y-8">
        <section className="p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.
          </p>
        </section>

        <section className="p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-Life Analogy</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
            It helps programmers avoid repeating the same steps over and over again — just like you don't rebuild a coffee machine every time you want coffee. Think of a function like a vending machine or a coffee machine.
          </p>
        </section>

        <section className="p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Programming View</h2>
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-gray-100 font-mono text-sm">
<code><span className="text-purple-400">function</span> <span className="text-yellow-300">add</span>(<span className="text-blue-300">a</span>, <span className="text-blue-300">b</span>) {'{'}
  <span className="text-purple-400">return</span> a + b;
{'}'}

<span className="text-purple-400">const</span> <span className="text-blue-300">result</span> = <span className="text-yellow-300">add</span>(<span className="text-green-300">5</span>, <span className="text-green-300">10</span>); <span className="text-gray-500">// result is 15</span></code>
            </pre>
          </div>
        </section>

        <section className="p-8 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Takeaways</h2>
          <ul className="space-y-4">
            {[
              "Think of a function like a vending machine or a coffee machine.",
              "Reusable block of code that performs one specific job.",
              "Block of organized, reusable code that is written to perform a specific task."
            ].map((text, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="text-green-600 dark:text-green-500 mr-3 flex-shrink-0" size={24} />
                <span className="text-gray-700 dark:text-gray-300 text-lg">{text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8">
        <Link to="/lectures" className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Back
        </Link>
        <Link to="/quiz" className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
          Start Quiz
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Concept;

