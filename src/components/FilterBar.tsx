import type { CommandCategory, Platform, RiskLevel, Shell } from '../types';

export const platformLabels: Record<Platform | 'all', string> = {
  all: 'Todas',
  windows: 'Windows',
  linux: 'Linux',
  macos: 'macOS',
  cross: 'Cross-platform',
};

export const shellLabels: Record<Shell | 'all', string> = {
  all: 'Todos',
  cmd: 'CMD',
  powershell: 'PowerShell',
  bash: 'Bash',
  zsh: 'Zsh',
  git: 'Git',
  docker: 'Docker',
  wrangler: 'Wrangler',
};

export const categoryLabels: Record<CommandCategory | 'all', string> = {
  all: 'Todas',
  files: 'Arquivos',
  system: 'Sistema',
  processes: 'Processos',
  network: 'Rede',
  git: 'Git',
  containers: 'Containers',
  cloudflare: 'Cloudflare',
  security: 'Segurança',
  troubleshooting: 'Troubleshooting',
};

export const riskLabels: Record<RiskLevel | 'all', string> = {
  all: 'Todos',
  safe: 'Seguro',
  changes: 'Altera estado',
  admin: 'Admin',
  network: 'Rede',
  destructive: 'Destrutivo',
};

interface FilterBarProps {
  query: string;
  platform: Platform | 'all';
  shell: Shell | 'all';
  category: CommandCategory | 'all';
  risk: RiskLevel | 'all';
  resultCount: number;
  onQueryChange: (value: string) => void;
  onPlatformChange: (value: Platform | 'all') => void;
  onShellChange: (value: Shell | 'all') => void;
  onCategoryChange: (value: CommandCategory | 'all') => void;
  onRiskChange: (value: RiskLevel | 'all') => void;
  onClear: () => void;
}

const platforms: Array<Platform | 'all'> = ['all', 'windows', 'linux', 'macos', 'cross'];
const shells: Array<Shell | 'all'> = ['all', 'cmd', 'powershell', 'bash', 'zsh', 'git', 'docker', 'wrangler'];
const categories: Array<CommandCategory | 'all'> = [
  'all',
  'files',
  'system',
  'processes',
  'network',
  'git',
  'containers',
  'cloudflare',
  'security',
  'troubleshooting',
];
const risks: Array<RiskLevel | 'all'> = ['all', 'safe', 'changes', 'admin', 'network', 'destructive'];

export default function FilterBar({
  query,
  platform,
  shell,
  category,
  risk,
  resultCount,
  onQueryChange,
  onPlatformChange,
  onShellChange,
  onCategoryChange,
  onRiskChange,
  onClear,
}: FilterBarProps) {
  return (
    <section className="panel space-y-4" aria-label="Filtros de comandos">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <label className="flex-1">
          <span className="field-label">Buscar</span>
          <input
            className="input"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="PowerShell, logs, docker, DNS, chmod..."
          />
        </label>

        <div className="flex items-center justify-between gap-3 md:w-44 md:justify-end">
          <span className="font-mono text-xs text-slate-400">{resultCount} comandos</span>
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-emerald-500/20 px-3 py-2 font-mono text-xs text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-500/10"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <Select label="Plataforma" value={platform} options={platforms} labels={platformLabels} onChange={onPlatformChange} />
        <Select label="Shell" value={shell} options={shells} labels={shellLabels} onChange={onShellChange} />
        <Select label="Categoria" value={category} options={categories} labels={categoryLabels} onChange={onCategoryChange} />
        <Select label="Risco" value={risk} options={risks} labels={riskLabels} onChange={onRiskChange} />
      </div>
    </section>
  );
}

function Select<T extends string>({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
}) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <select className="input" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {labels[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
