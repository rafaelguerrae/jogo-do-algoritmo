# Continua o trabalho no Claude Code, com o contexto desta conversa.
# Uso (PowerShell):  .\continuar-claude.ps1
$ErrorActionPreference = "Stop"
$repo = "E:\Anderson\UFABC\2026.3\ESSTE\Mostra\ufabc-ergonomia"

if (-not (Test-Path $repo)) { throw "Pasta não encontrada: $repo" }
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  throw "Claude Code não encontrado. Instale com: npm install -g @anthropic-ai/claude-code"
}

Set-Location $repo
if (-not (Test-Path "node_modules")) { npm install }

$prompt = @'
Continue o trabalho de uma conversa anterior. Leia o CLAUDE.md, o README.md e docs/ROTEIRO.md antes de agir.

Contexto: sou o Anderson (UFABC), grupo 4 da disciplina ESGE006-23 Ergonomia. Este site (Next.js, estático, offline) é o "Jogo do Algoritmo" da I Mostra de Ergonomia de 01/12/2026: painel do operador, tela do visitante, resultados, baralho para imprimir, página institucional e roteiro. O banner 90x120 cm já foi gerado (fonte em banner/). O feedback da professora exige que os pontos sejam fictícios e sem equivalência com medição humana.

Primeiros passos: rode npm install e npm run build, confirme que tudo compila, abra npm run dev e me diga o que você achou. Depois aguarde minhas instruções. Responda sempre em português, de forma curta.
'@

claude $prompt
