export type Platform = 'windows' | 'linux' | 'macos' | 'cross';

export type Shell = 'cmd' | 'powershell' | 'bash' | 'zsh' | 'git' | 'docker' | 'wrangler';

export type CommandCategory =
  | 'files'
  | 'system'
  | 'processes'
  | 'network'
  | 'git'
  | 'containers'
  | 'cloudflare'
  | 'security'
  | 'troubleshooting';

export type RiskLevel = 'safe' | 'changes' | 'admin' | 'network' | 'destructive';

export interface CommandExample {
  command: string;
  explanation: string;
}

export interface CommandEntry {
  id: string;
  title: string;
  description: string;
  shell: Shell;
  platforms: Platform[];
  category: CommandCategory;
  risk: RiskLevel;
  command: string;
  examples: CommandExample[];
  notes?: string[];
  tags: string[];
}
