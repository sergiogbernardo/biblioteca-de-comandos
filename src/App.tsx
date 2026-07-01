import { useMemo, useState } from 'react';
import MatrixRain from './components/MatrixRain';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CommandCard from './components/CommandCard';
import CommandDetail from './components/CommandDetail';
import { commands } from './data/commands';
import type { CommandCategory, CommandEntry, Platform, RiskLevel, Shell } from './types';

const DEFAULT_COMMAND = commands[0];

export default function App() {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [shell, setShell] = useState<Shell | 'all'>('all');
  const [category, setCategory] = useState<CommandCategory | 'all'>('all');
  const [risk, setRisk] = useState<RiskLevel | 'all'>('all');
  const [selectedCommand, setSelectedCommand] = useState<CommandEntry>(DEFAULT_COMMAND);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return commands.filter((command) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          command.title,
          command.description,
          command.command,
          command.shell,
          command.category,
          command.risk,
          ...command.tags,
          ...command.examples.map((example) => `${example.command} ${example.explanation}`),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesPlatform =
        platform === 'all' || command.platforms.includes(platform) || command.platforms.includes('cross');
      const matchesShell = shell === 'all' || command.shell === shell;
      const matchesCategory = category === 'all' || command.category === category;
      const matchesRisk = risk === 'all' || command.risk === risk;

      return matchesQuery && matchesPlatform && matchesShell && matchesCategory && matchesRisk;
    });
  }, [category, platform, query, risk, shell]);

  const activeCommand = filteredCommands.some((command) => command.id === selectedCommand.id)
    ? selectedCommand
    : filteredCommands[0] ?? selectedCommand;

  const clearFilters = () => {
    setQuery('');
    setPlatform('all');
    setShell('all');
    setCategory('all');
    setRisk('all');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <MatrixRain />
      <div className="relative z-10">
        <TopBar />
        <Hero />

        <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 lg:px-6">
          <FilterBar
            query={query}
            platform={platform}
            shell={shell}
            category={category}
            risk={risk}
            resultCount={filteredCommands.length}
            onQueryChange={setQuery}
            onPlatformChange={setPlatform}
            onShellChange={setShell}
            onCategoryChange={setCategory}
            onRiskChange={setRisk}
            onClear={clearFilters}
          />

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
            <div className="space-y-3">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command) => (
                  <CommandCard
                    key={command.id}
                    command={command}
                    selected={command.id === activeCommand.id}
                    onSelect={setSelectedCommand}
                  />
                ))
              ) : (
                <div className="panel text-center">
                  <p className="font-display text-lg font-semibold text-slate-100">Nenhum comando encontrado</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Ajuste a busca ou limpe os filtros para voltar ao catálogo completo.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>

            {filteredCommands.length > 0 && <CommandDetail command={activeCommand} />}
          </section>
        </main>

        <footer className="border-t border-emerald-500/10 py-6 text-center text-sm text-slate-500">
          <p className="font-mono">
            © {new Date().getFullYear()} Sergio Bernardo · Biblioteca de Comandos · use com contexto
          </p>
        </footer>
      </div>
    </div>
  );
}
