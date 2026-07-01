import { useState } from 'react';
import type { CommandEntry } from '../types';
import { categoryLabels, platformLabels, riskLabels, shellLabels } from './FilterBar';

interface CommandDetailProps {
  command: CommandEntry;
}

export default function CommandDetail({ command }: CommandDetailProps) {
  return (
    <aside className="panel sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="panel-title">{shellLabels[command.shell]}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-slate-100">{command.title}</h2>
        </div>
        <span className="rounded-md border border-emerald-500/20 px-2 py-1 font-mono text-xs text-emerald-200">
          {riskLabels[command.risk]}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-400">{command.description}</p>

      <div className="mt-5 space-y-3">
        <CommandBlock command={command.command} />
        {command.examples.map((example) => (
          <div key={example.command} className="rounded-lg border border-slate-800 bg-black/40 p-3">
            <CommandBlock command={example.command} compact />
            <p className="mt-2 text-sm text-slate-400">{example.explanation}</p>
          </div>
        ))}
      </div>

      {command.notes && (
        <div className="mt-5 rounded-lg border border-amber-400/20 bg-amber-500/10 p-3">
          <p className="font-mono text-xs uppercase tracking-wider text-amber-200">Notas</p>
          <ul className="mt-2 space-y-1 text-sm text-amber-100/80">
            {command.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <dl className="mt-5 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-slate-500">Categoria</dt>
          <dd className="mt-1 text-slate-200">{categoryLabels[command.category]}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-slate-500">Plataformas</dt>
          <dd className="mt-1 text-slate-200">{command.platforms.map((item) => platformLabels[item]).join(', ')}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {command.tags.map((tag) => (
          <span key={tag} className="rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400">
            #{tag}
          </span>
        ))}
      </div>
    </aside>
  );
}

function CommandBlock({ command, compact = false }: { command: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="rounded-lg border border-emerald-500/15 bg-slate-950">
      <div className="flex items-start gap-3 p-3">
        <code className={`min-w-0 flex-1 break-words font-mono text-emerald-200 ${compact ? 'text-xs' : 'text-sm'}`}>
          {command}
        </code>
        <button
          type="button"
          onClick={copyCommand}
          className="shrink-0 rounded-md border border-emerald-500/20 px-2 py-1 font-mono text-xs text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-500/10"
        >
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
    </div>
  );
}
