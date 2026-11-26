# Segurança

## Escopo

O projeto é um site estático, sem backend, sem banco e sem internet em execução. Os dados das rodadas ficam só no `localStorage` do navegador de quem joga. Mesmo assim, aceitamos relatos sobre dependências, scripts de build e fluxos de CI.

## Como relatar uma vulnerabilidade

Use o **relato privado de vulnerabilidade** do GitHub: aba _Security_ → _Report a vulnerability_. Não abra issue pública com detalhes.
Descreva o que encontrou, como reproduzir e o impacto que imagina. Respondemos assim que possível; este é um projeto acadêmico, sem prazo contratual.

## Versões com suporte

Só a `main`.

## O que o repositório já faz

- Ruleset na `main`: PR obrigatório, check de CI obrigatório, histórico linear, sem force push nem exclusão.
- Secret scanning com bloqueio de push, alertas e atualizações de segurança do Dependabot.
- CodeQL (`security-extended`) e `npm audit` no CI (a revisão de dependências do GitHub não é suportada neste repositório).
- Workflows com permissões mínimas (`contents: read`) e sem credenciais persistidas no checkout.

## Dados pessoais

O campo de apelido do visitante é opcional e fica só no navegador. Evite nomes reais. O CSV exportado neutraliza campos que começam com `=`, `+`, `-` ou `@` (injeção de fórmula em planilhas).
