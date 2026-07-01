# Biblioteca de Comandos

Practical command reference for Windows, Linux, macOS, Git, Docker, Cloudflare
Workers, networking and troubleshooting.

The app runs entirely in the browser. It is a searchable command library with
examples, shell/platform filters, risk labels and copy buttons.

## Scope

- Windows CMD and PowerShell commands
- Linux Bash commands
- macOS Zsh/Bash commands
- Git workflow commands
- Docker and Docker Compose commands
- Cloudflare Wrangler commands
- Networking, security and troubleshooting references

## Risk labels

- `Safe`: read-only or inspection command
- `Changes state`: changes files, branches, services or local state
- `Admin`: usually needs elevated permissions
- `Network`: reaches local or external network services
- `Destructive`: deletes or can permanently remove data

## Development

```bash
npm install
npm run dev
```

## Quality

```bash
npm run lint
npm run build
```

## Deploy

The Vite `base` is `/biblioteca-de-comandos/` to match GitHub Pages.
Deployment is automated by `.github/workflows/deploy.yml` on every push to
`main`.

## Privacy

No command data is uploaded. Search, filters and copy actions run locally in the
browser.
