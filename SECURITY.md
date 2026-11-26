# Segurança

## Escopo

O projeto é um site estático, sem backend, sem banco e sem internet em execução. Os dados das rodadas ficam só no `localStorage` do navegador de quem joga. Mesmo assim, aceitamos relatos sobre dependências, scripts de build e fluxos de CI.

## Como relatar uma vulnerabilidade

Use o **relato privado de vulnerabilidade** do GitHub: aba _Security_ → _Report a vulnerability_. Não abra issue pública com detalhes.
Descreva o que encontrou, como reproduzir e o impacto que imagina. Respondemos assim que possível; este é um projeto acadêmico, sem prazo contratual.

## Versões com suporte

Só a `main`.

## O que o repositório já faz

- Pensado para o `main`: PR obrigatório, checks de CI obrigatórios, histórico linear, sem force push nem exclusão (ruleset). **Só vale com o repositório público ou no GitHub Pro**: no plano gratuito com repositório privado, o ruleset não é aplicado e a regra fica por convenção (ver `CONTRIBUTING.md`).
- Secret scanning com bloqueio de push e alertas do Dependabot, também só com repositório público ou GitHub Advanced Security.
- `npm audit` no CI. CodeQL e a revisão de dependências do GitHub ficam desligados enquanto o repositório for privado no plano gratuito (precisam de repositório público ou GitHub Advanced Security).
- Workflows com permissões mínimas (`contents: read`) e sem credenciais persistidas no checkout.

## Dados pessoais

O campo de apelido do visitante é opcional e fica só no navegador. Evite nomes reais. O CSV exportado neutraliza campos que começam com `=`, `+`, `-` ou `@` (injeção de fórmula em planilhas).
