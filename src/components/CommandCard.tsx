import type { CommandEntry, RiskLevel } from '../types';
import { categoryLabels, platformLabels, riskLabels, shellLabels } from './FilterBar';

const riskClasses: Record<RiskLevel, string> = {
  safe: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  changes: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
  admin: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
  network: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
  destructive: 'border-red-400/40 bg-red-500/10 text-red-200',
};

interface CommandCardProps {
  command: CommandEntry;
  selected: boolean;
  onSelect: (command: CommandEntry) => void;
}

export default function CommandCard({ command, selected, onSelect }: CommandCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(command)}
      className={`w-full rounded-lg border p-4 text-left transition ${
        selected
          ? 'border-emerald-400/70 bg-emerald-500/10'
          : 'border-emerald-500/10 bg-black/55 hover:border-emerald-400/50 hover:bg-emerald-500/5'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold text-slate-100">{command.title}</p>
          <p className="mt-1 text-sm text-slate-400">{command.description}</p>
        </div>
        <span className={`rounded border px-2 py-1 font-mono text-[11px] ${riskClasses[command.risk]}`}>
          {riskLabels[command.risk]}
        </span>
      </div>

      <code className="mt-3 block overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-emerald-200">
        {command.command}
      </code>

      <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-slate-500">
        <span>{shellLabels[command.shell]}</span>
        <span>/</span>
        <span>{categoryLabels[command.category]}</span>
        <span>/</span>
        <span>{command.platforms.map((item) => platformLabels[item]).join(', ')}</span>
      </div>
    </button>
  );
}
