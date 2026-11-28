# Resumo para o artigo: Jogo do Algoritmo

> Gerado de `src/lib/conteudo.ts` e `src/lib/game.ts` (`pnpm resumo:gerar`). Não editar à mão: é o texto de referência do site e do artigo.

## Pergunta de pesquisa

Como a gestão algorítmica afeta a carga mental dos trabalhadores por aplicativo e de que forma os requisitos ergonômicos de projeto se diferenciam das regras jurídicas (trabalhistas) para mitigar esses impactos na interface humano-sistema?

## Objetivos

**Geral:** Analisar, sob a ótica da Ergonomia e dos Fatores Humanos, como a gestão algorítmica impacta a carga mental de trabalhadores de plataformas e propor diretrizes baseadas em requisitos ergonômicos de projeto para orientar a regulação do setor.

**Específicos:**

- Identificar na literatura os principais mecanismos de controle algorítmico (metas, bloqueios, avaliação, distribuição) e seus efeitos diretos sobre a carga mental e a fadiga.
- Diferenciar, de forma prática e operacional, os requisitos ergonômicos de design da interação do que já preveem os textos normativos analisados.
- Propor requisitos ergonômicos concretos para o design e a governança das interfaces algorítmicas, focados no respeito aos limites cognitivos humanos.

## Contexto

- A literatura associa a gestão algorítmica a pressões psicossociais, em especial de tempo, e a mais estresse (Bowdler et al., 2026).
- Uma revisão de literatura descreve efeitos ambivalentes sobre o bem-estar (Abramova & Voronin, 2025), e a resenha de um livro brasileiro destaca precarização e vigilância algorítmica (De Lucca, 2024).
- Em 2022, 589 mil pessoas trabalhavam por meio de aplicativos de entrega de comida e outros produtos no Brasil, segundo o IBGE em parceria com a Unicamp e o MPT; a estatística é experimental (IBGE, 2023).

## Método

- Revisão integrativa da literatura e análise documental, sem coleta de dados primários com pessoas.
- Buscas em Google Acadêmico, SciELO, Periódicos CAPES, Scopus e anais da ABERGO.
- Termos: “gestão algorítmica”, “carga mental”, “fadiga”, “platform work”.
- Matriz de extração em oito dimensões, com uma linha por estudo e mecanismo.
- Análise de textos normativos, comparando o conteúdo antes de concluir.
- Fundamento: relatório ALMA-AI, da PEROSH, que trata a IA como nova forma de organização do trabalho (Martín, 2025).
- O NASA-TLX é utilizado apenas como referência conceitual para descrever as exigências identificadas na literatura, a partir de suas seis dimensões: demanda mental, demanda física, demanda temporal, desempenho, esforço e frustração (Hart & Staveland, 1988). O instrumento não foi aplicado, nenhuma pontuação foi calculada, e o jogo não é uma versão dele nem mede carga mental.
- Resultado: requisitos ergonômicos concretos para o design das interfaces algorítmicas.

## Matriz de extração

| Dimensão | O que registrar |
| --- | --- |
| Referência e tipo | Autoria, ano e tipo: artigo, relatório, editorial ou resenha. |
| Contexto e população | País, atividade e amostra. |
| Mecanismo de gestão | Pressão de tempo, metas encadeadas ou opacidade e punição. |
| Exigência gerada | O que passa a ser exigido de quem trabalha, nomeado pelas dimensões do NASA-TLX. |
| Evidência | O que o estudo encontrou, com página ou seção. |
| Sistema de trabalho | Componente envolvido: trânsito, veículo, ambiente ou relações organizacionais. |
| Melhoria | Requisito de projeto que responde à exigência. |
| Limitações | O que o estudo não permite afirmar. |

Passagens conferidas nas fontes em 28/11/2026. A classificação das exigências pelas dimensões do NASA-TLX e a coluna de sistema de trabalho são interpretação do grupo, aprovada por ele em 28/11/2026, e não pontuação do instrumento.

| Referência e tipo | Contexto e população | Mecanismo de gestão | Exigência gerada | Evidência | Sistema de trabalho | Melhoria | Limitações |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rani et al., 2022; artigo com dados de pesquisas da OIT | Cerca de 3.000 entregadores por plataforma em 11 países em desenvolvimento, sem o Brasil. | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | Muito pouco tempo, de 10 a 40 segundos, para aceitar ou recusar um pedido (p. 20). | Relações organizacionais. | Tempo útil de decisão proporcional à complexidade da tarefa. | A amostra não é representativa e não inclui o Brasil. |
| Rani et al., 2022; artigo com dados de pesquisas da OIT | Cerca de 3.000 entregadores por plataforma em 11 países em desenvolvimento, sem o Brasil. | Metas encadeadas | Manter o ritmo sem recuperação (demanda temporal; demanda física; esforço). | Bônus e metas levam a jornadas longas e alta intensidade, com dificuldade de pausar (pp. 22–23). | Relações organizacionais. | Limite para corridas encadeadas e pausa respeitada. | A amostra não é representativa e não inclui o Brasil. |
| Rani et al., 2022; artigo com dados de pesquisas da OIT | Cerca de 3.000 entregadores por plataforma em 11 países em desenvolvimento, sem o Brasil. | Opacidade e punição | Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração). | Relato, na Índia, de avaliação reduzida sem esclarecimento, e repercussões ao recusar ou cancelar pedidos (p. 23). | Relações organizacionais. | Feedback explicativo antes de qualquer punição. | A amostra não é representativa e não inclui o Brasil. |
| Vignola et al., 2023; artigo de revisão | Literatura sobre trabalho por plataforma e saúde, com a entrega como exemplo principal. | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | Para cumprir a expectativa de rapidez, entregadores podem correr, avançar sinais, usar o celular e pular pausas (seção 4.1). | Trânsito; relações organizacionais. | Tempo útil de decisão proporcional à complexidade da tarefa. | É revisão de literatura: não traz dados próprios nem estima o tamanho dos efeitos. |
| Vignola et al., 2023; artigo de revisão | Literatura sobre trabalho por plataforma e saúde, com a entrega como exemplo principal. | Metas encadeadas | Manter o ritmo sem recuperação (demanda temporal; demanda física; esforço). | Incentivos em formato de jogo, para assumir mais trabalhos no pico ou seguir conectado, podem aumentar o estresse (seção 4.3). | Relações organizacionais. | Limite para corridas encadeadas e pausa respeitada. | É revisão de literatura: não traz dados próprios nem estima o tamanho dos efeitos. |
| Vignola et al., 2023; artigo de revisão | Literatura sobre trabalho por plataforma e saúde, com a entrega como exemplo principal. | Opacidade e punição | Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração). | Mudanças unilaterais, muitas vezes sem explicação, e punição de quem recusa repetidamente, inclusive por segurança (seção 4.7). | Relações organizacionais. | Feedback explicativo antes de qualquer punição. | É revisão de literatura: não traz dados próprios nem estima o tamanho dos efeitos. |
| Zhang & Rau, 2026; artigo de conferência, estudo experimental | Simulação de entrega em laboratório com 20 participantes de 19 a 30 anos. | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | Sob pressão de tempo, demanda temporal, mental e esforço dominaram a carga psicológica (resumo, p. 31). | Trânsito simulado; veículo e carga simulados. | Tempo útil de decisão proporcional à complexidade da tarefa. | Amostra pequena, ambiente controlado e participantes que não representam entregadores reais, segundo os autores. |
| Martín, 2025; relatório institucional (revisão), sem revisão por pares | Gestão algorítmica no trabalho tradicional e por plataforma; institutos europeus de segurança e saúde. | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | Intensificação das exigências, em especial pressão de tempo, desempenho e incerteza (p. 73). | Relações organizacionais. | Tempo útil de decisão proporcional à complexidade da tarefa. | Não é revisado por pares e reúne contextos além da entrega. |
| Martín, 2025; relatório institucional (revisão), sem revisão por pares | Gestão algorítmica no trabalho tradicional e por plataforma; institutos europeus de segurança e saúde. | Opacidade e punição | Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração). | Decisões percebidas como opacas, com sensação de insegurança e despersonalização (p. 74). | Relações organizacionais. | Feedback explicativo antes de qualquer punição. | Não é revisado por pares e reúne contextos além da entrega. |
| Bowdler et al., 2026; editorial | Síntese de 39 estudos (2022 a 2024), a mesma revisão do relatório PEROSH. | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | Pressões psicossociais, sobretudo de tempo, elevam o estresse (seção Intensification of job demands). | Relações organizacionais. | Tempo útil de decisão proporcional à complexidade da tarefa. | É editorial e resume o relatório PEROSH: não conta como evidência independente dele. |
| Bowdler et al., 2026; editorial | Síntese de 39 estudos (2022 a 2024), a mesma revisão do relatório PEROSH. | Opacidade e punição | Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração). | A perda de autonomia é maior quando o algoritmo é percebido como opaco (seção Depletion of job resources). | Relações organizacionais. | Feedback explicativo antes de qualquer punição. | É editorial e resume o relatório PEROSH: não conta como evidência independente dele. |
| Oliveira & Junges, 2023; artigo original, qualitativo | 14 entregadores de um aplicativo em São Leopoldo (RS), entrevistados em 2020. | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | A pressão para ir mais rápido é constante, e os trabalhadores assumem riscos (Resultados e discussão). | Trânsito; veículo. | Tempo útil de decisão proporcional à complexidade da tarefa. | Uma cidade, um aplicativo e poucos participantes, durante a pandemia: não permite generalizar. |
| Oliveira & Junges, 2023; artigo original, qualitativo | 14 entregadores de um aplicativo em São Leopoldo (RS), entrevistados em 2020. | Metas encadeadas | Manter o ritmo sem recuperação (demanda temporal; demanda física; esforço). | A maioria dos entrevistados no regime com turnos fixos cumpre 66 horas semanais; falta tempo para refeição (Resultados e discussão). | Relações organizacionais; ambiente. | Limite para corridas encadeadas e pausa respeitada. | Uma cidade, um aplicativo e poucos participantes, durante a pandemia: não permite generalizar. |
| Oliveira & Junges, 2023; artigo original, qualitativo | 14 entregadores de um aplicativo em São Leopoldo (RS), entrevistados em 2020. | Opacidade e punição | Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração). | Bloqueios cuja causa não se sabe exatamente estão entre os maiores medos (Resultados e discussão). | Relações organizacionais. | Feedback explicativo antes de qualquer punição. | Uma cidade, um aplicativo e poucos participantes, durante a pandemia: não permite generalizar. |
| Rodrigues et al., 2021; estudo de escopo | 31 artigos e conteúdos de sites sobre trabalhadores por aplicativo, com foco no Brasil (2014 a 2020). | Pressão de tempo | Decidir e agir depressa (demanda temporal; demanda mental). | A remuneração por demanda impõe ritmo intenso e contribui para acidentes (Exposição laboral e risco). | Trânsito; veículo; ambiente. | Tempo útil de decisão proporcional à complexidade da tarefa. | Possível viés de seleção, segundo os autores; mistura motoristas de passageiros e entregadores. |
| Rodrigues et al., 2021; estudo de escopo | 31 artigos e conteúdos de sites sobre trabalhadores por aplicativo, com foco no Brasil (2014 a 2020). | Metas encadeadas | Manter o ritmo sem recuperação (demanda temporal; demanda física; esforço). | Jornadas extensas sem pausas para alimentação e descanso, e bonificações em formato de jogo (Introdução). | Relações organizacionais. | Limite para corridas encadeadas e pausa respeitada. | Possível viés de seleção, segundo os autores; mistura motoristas de passageiros e entregadores. |
| Rodrigues et al., 2021; estudo de escopo | 31 artigos e conteúdos de sites sobre trabalhadores por aplicativo, com foco no Brasil (2014 a 2020). | Opacidade e punição | Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração). | Bloqueios por atraso (exposição laboral) e bloqueio definitivo como forma de controle (seção sobre o crescimento dos aplicativos); não trata da falta de explicação. | Relações organizacionais. | Feedback explicativo antes de qualquer punição. | Possível viés de seleção, segundo os autores; mistura motoristas de passageiros e entregadores. |

Ficam fora De Lucca (resenha de livro) e Abramova & Voronin (só o resumo foi lido).

## Mecanismos

| Mecanismo | No jogo | Exigência sobre quem trabalha |
| --- | --- | --- |
| Pressão de tempo | Aceitar uma corrida complexa com pouco tempo para decidir (9 s no jogo). | Decidir rápido, com informação incompleta, sem espaço para avaliar risco e ganho. |
| Metas encadeadas | Corridas oferecidas em sequência, sem espaço para descanso. | Manter atenção e ritmo continuamente, sem recuperação entre uma demanda e outra. |
| Opacidade e punição | Recusar por segurança e perder nota sem saber o motivo. | Decidir sem entender as regras do sistema, sob ameaça de penalidade não explicada. |

## O que a literatura mostra

| Mecanismo | Efeito descrito | Fonte |
| --- | --- | --- |
| Pressão de tempo | Entregadores têm muito pouco tempo, de 10 a 40 segundos, para decidir se aceitam ou recusam um pedido. | (Rani et al., 2022, p. 20) |
| Pressão de tempo | Os estudos revisados apontam intensificação das exigências, em especial pressão de tempo, desempenho e incerteza. | (Martín, 2025, p. 73) |
| Pressão de tempo | Em simulação de entrega em laboratório, sob pressão de tempo, com 20 participantes, demanda temporal, demanda mental e esforço foram as dimensões dominantes da carga psicológica. | (Zhang & Rau, 2026, p. 31, resumo) |
| Metas encadeadas | Bônus e metas levam a jornadas longas e alta intensidade; muitas vezes não há como pausar sem comprometer a meta. | (Rani et al., 2022, pp. 22–23) |
| Metas encadeadas | Incentivos em formato de jogo, para assumir mais trabalhos nos horários de pico, podem aumentar o estresse. | (Vignola et al., 2023, seção 4.3) |
| Opacidade e punição | Há relato de avaliação reduzida sem esclarecimento, e quase metade dos entregadores relata repercussões ao recusar ou cancelar pedidos, como multa, suspensão ou queda de avaliação. | (Rani et al., 2022, p. 23) |
| Opacidade e punição | Mudanças unilaterais, muitas vezes sem explicação, fazem o algoritmo parecer uma autoridade arbitrária, e quem recusa repetidamente, inclusive por segurança, é punido. | (Vignola et al., 2023, seção 4.7) |

A literatura descreve os mecanismos, não os números do jogo: 9 s, 3 corridas seguidas e os pesos +1, +2 e +3 são escolhas do grupo. A pesquisa de Rani et al. ouviu entregadores de 11 países em desenvolvimento, sem incluir o Brasil.

## Requisitos ergonômicos

- **Pressão de tempo:** Tempo útil de decisão proporcional à complexidade da tarefa.
- **Metas encadeadas:** Limite para corridas encadeadas e pausa respeitada antes da próxima oferta.
- **Opacidade e punição:** Feedback explicativo antes de qualquer punição, e recusa por segurança sem penalidade.

## Do mecanismo à melhoria

| Mecanismo de gestão | Exigência gerada | Evidência encontrada | Limite da evidência | Possibilidade de melhoria |
| --- | --- | --- | --- | --- |
| Pressão de tempo | Decidir rápido, com informação incompleta, sem espaço para avaliar risco e ganho. | Entregadores têm muito pouco tempo para aceitar ou recusar um pedido, e os estudos revisados apontam intensificação da pressão de tempo (Rani et al., 2022, p. 20) (Martín, 2025, p. 73). | Nas fontes lidas, não encontramos qual tempo de decisão seria suficiente. | Tempo útil de decisão proporcional à complexidade da tarefa. |
| Metas encadeadas | Manter atenção e ritmo continuamente, sem recuperação entre uma demanda e outra. | Bônus e metas se ligam a jornadas longas, alta intensidade e dificuldade de pausar, e incentivos em formato de jogo estimulam a assumir mais trabalhos (Rani et al., 2022, pp. 22–23) (Vignola et al., 2023, seção 4.3). | Nenhuma fonte lida define um limite de corridas seguidas: as 3 do jogo são escolha do grupo. | Limite para corridas encadeadas e pausa respeitada. |
| Opacidade e punição | Decidir sem entender as regras do sistema, sob ameaça de penalidade não explicada. | Há relato de avaliação reduzida sem esclarecimento, de punição por recusar pedidos, inclusive por segurança, e de mudanças sem explicação (Rani et al., 2022, p. 23) (Vignola et al., 2023, seção 4.7). | A queda de nota logo após a recusa, como acontece no jogo, é uma simplificação. | Feedback explicativo antes de qualquer punição. |

## O algoritmo no sistema de trabalho

Na Ergonomia, o algoritmo não age sozinho: é um componente do sistema de trabalho, junto com a pessoa, a tarefa, o trânsito, o veículo, o ambiente e as relações organizacionais.

| Componente | Evidência encontrada | Pergunta de projeto | No jogo |
| --- | --- | --- | --- |
| Trânsito | Entre 14 entregadores do Rio Grande do Sul, a pressão para ir mais rápido é constante (Oliveira & Junges, 2023). Um estudo de escopo relata violação de regras de trânsito para escapar de assaltos e de bloqueios por atraso (Rodrigues et al., 2021). | O tempo para decidir e o prazo de entrega consideram o trânsito do momento? | Não representado. |
| Veículo | Os entregadores arcam com a manutenção, e os sons e falas do aplicativo distraem no trajeto (Oliveira & Junges, 2023). O peso da mochila de entrega pode desestabilizar o veículo (Rodrigues et al., 2021). | A oferta considera o tipo de veículo, o volume da carga e quando o aviso chega a quem conduz? | Carta com pedido volumoso para moto. |
| Ambiente | Os 14 entrevistados citaram assaltos entre os maiores riscos; há também exposição ao clima e falta de abrigo para esperar pedidos (Oliveira & Junges, 2023). Condições das vias, como buracos e óleo (Rodrigues et al., 2021). | Chuva, falta de iluminação e área de risco pesam na oferta e protegem quem recusa? | Cartas com chuva forte, rua sem iluminação e área de risco. |
| Relações organizacionais | Bloqueios cuja causa o entregador não sabe exatamente estão entre os maiores medos relatados (Oliveira & Junges, 2023). | Quem explica uma decisão, a quem recorrer e como contestar? | Queda de nota sem explicação. |

Evidências de um estudo qualitativo brasileiro, com 14 entregadores, e de um estudo de escopo. Mostram que os componentes aparecem no trabalho, mas não medem o efeito de cada um nem permitem generalizar. As perguntas de projeto são do grupo.

## Regras jurídicas × requisitos ergonômicos

| Tema | O que o texto normativo trata | O que o projeto da interface exige |
| --- | --- | --- |
| Vínculo de trabalho | Diretiva: presunção legal de relação de emprego quando houver indícios de direção e controle (arts. 4º e 5º). PLP: trabalho autônomo, sem vínculo empregatício, e a Justiça do Trabalho aprecia alegações de desvirtuamento (arts. 3º e 16). (União Europeia, 2024) (Brasil, 2025) | Não é um requisito de interface. |
| Contrato e remuneração | Diretiva: não comparado neste quadro. PLP: contrato escrito (art. 8º), limites para as taxas no transporte (art. 10) e remuneração mínima na coleta e entrega (art. 11). (Brasil, 2025) | Não é um requisito de interface. |
| Transparência | Diretiva: informar o uso de sistemas automatizados, os principais parâmetros e os motivos para restringir ou encerrar contas (art. 9º). PLP: antes de aceitar, informações para entender riscos e benefícios do serviço (art. 12, II); fatores que influenciam as ofertas e critérios de avaliação e pontuação, respeitados os segredos de negócio (art. 13). (União Europeia, 2024) (Brasil, 2025) | Mostrar na própria interface, em linguagem clara, o que pesa na decisão e o que pode gerar penalidade. |
| Punição, explicação e revisão | Diretiva: decisão de restringir, suspender ou encerrar a conta é tomada por uma pessoa (art. 10); há explicação e pedido de revisão, e os motivos escritos chegam até a data em que a decisão passa a valer (art. 11). PLP: comunicação prévia com os motivos (art. 17) e prazo de defesa antes da decisão (art. 18), com exceções, como a suspensão cautelar sem oitiva (art. 18, §§ 2º e 4º); revisão de decisões exclusivamente automatizadas a pedido (art. 12, I). (União Europeia, 2024) (Brasil, 2025) | Feedback explicativo antes de qualquer punição. |
| Recusa de serviços | Diretiva: não localizamos direito de recusar tarefas no texto consultado. PLP: veda aceitação obrigatória e penalidade por recusar serviços ou ficar desconectado (art. 4º, II e III) e garante recusar sem penalidade (art. 12, V). (União Europeia, 2024) (Brasil, 2025) | Recusar por segurança sem perder nota nem acesso a ofertas. |
| Segurança e saúde | Diretiva: avaliar riscos, inclusive psicossociais e ergonômicos, e não usar sistemas automatizados de modo a exercer pressão indevida (art. 12). PLP: incentivos não podem estimular o trabalhador a arriscar a saúde ou a integridade (art. 5º, parágrafo único); pontos de apoio para repouso, de forma progressiva (art. 14); seguro de vida e integridade física (art. 15). (União Europeia, 2024) (Brasil, 2025) | Transformar essas proteções gerais em parâmetros verificáveis, como os das duas linhas abaixo. |
| Tempo para decidir | Diretiva: não localizamos prazo mínimo para aceitar ou recusar uma tarefa no texto consultado. PLP: exige informação antes do aceite (art. 12, II), mas não fixa prazo mínimo para decidir. (União Europeia, 2024) (Brasil, 2025) | Tempo útil de decisão proporcional à complexidade da tarefa. |
| Corridas encadeadas | Diretiva: não localizamos limite de tarefas consecutivas nem pausa entre elas no texto consultado. PLP: não fixa limite de serviços seguidos, de jornada nem pausa obrigatória; trata de pontos de apoio (art. 14). (União Europeia, 2024) (Brasil, 2025) | Limite para corridas encadeadas e pausa respeitada. |

Paráfrases nossas. Diretiva: artigos conferidos no texto publicado no Jornal Oficial da União Europeia (série L, 11/11/2024), em inglês; retificações posteriores não foram conferidas. PLP: substitutivo do parecer do relator na Comissão Especial, de 07/04/2026; é texto em tramitação, ainda não é lei, e o projeto original não foi comparado. Em 28/11/2026, o grupo não encontrou versão mais recente.

- PLP 152/2025: ficha de tramitação na Câmara: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2537739
- Substitutivo consultado (parecer de 07/04/2026): https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3109660&filename=Tramitacao-PLP+152/2025
- Diretiva (UE) 2024/2831: EUR-Lex: https://eur-lex.europa.eu/eli/dir/2024/2831/oj

## Regras do jogo

- Corridas complexas dão 9 s para decidir; as simples, 20 s.
- **+1** (pressão de tempo): aceitar corrida complexa, com pouco tempo para decidir.
- **+2** (metas encadeadas): a cada 3 corridas aceitas seguidas, sem pausa de 5 min (simulada).
- **+3** (opacidade e punição): recusa por segurança; a nota, que começa em 4,95, cai 0,15 sem explicação.
- Corridas simples aceitas, outras recusas e tempo esgotado não pontuam por si.
- Ao fim, aplicar um requisito ergonômico zera os pontos daquele mecanismo.
- O limite de 9 segundos das corridas complexas é uma escolha de projeto do jogo, feita para o visitante sentir o pouco tempo para decidir. Não é um valor da literatura nem uma medição.
- Pontos fictícios, sem base em estudo ou medida humana. Pontos de sobrecarga e nota são recurso didático, sem equivalência com medição de fadiga ou carga mental humana.

## Limites e cuidados

- Revisão integrativa e análise documental, sem coleta de dados com trabalhadores.
- Pontos fictícios, sem base em estudo ou medida humana: não medem fadiga nem carga mental.
- A pressão percebida de 1 a 5 é opinião do visitante, não medida científica.
- O NASA-TLX é referência conceitual e não foi aplicado.
- O jogo não substitui uma avaliação ergonômica real.
- Registros da Mostra são de amostra de conveniência: não permitem generalizar.
- A participação é voluntária: pode parar a qualquer momento.

## Referências

Abramova, O., & Voronin, G. (2025). Synthesizing the ambivalent effects of algorithmic management on workers' well-being. *ECIS 2025 Proceedings*, 4. https://aisel.aisnet.org/ecis2025/algo_mgmt/algo_mgmt/4

Bowdler, M., Lahti, H., Jelenko, M., Buresti, G., & Valtonen, T. (2026). Algorithmic management and psychosocial risks at work: An emerging occupational safety and health challenge [Editorial]. *Scandinavian Journal of Work, Environment & Health, 52*(1), 1–5. https://doi.org/10.5271/sjweh.4270

Brasil. Câmara dos Deputados. (2025). *Projeto de Lei Complementar nº 152/2025* [Autor: Luiz Gastão]. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2537739

De Lucca, S. R. (2024). Trabalhadores(as) em plataformas digitais: Precarização e sobrevivência [Resenha do livro *Trabalho por plataformas digitais: Do aprofundamento da precarização à busca por alternativas democráticas*, de R. Grohmann & J. Salvagni]. *Cadernos de Saúde Pública, 40*(3), e00000624. https://doi.org/10.1590/0102-311XPT000624

Hart, S. G., & Staveland, L. E. (1988). Development of NASA-TLX (Task Load Index): Results of empirical and theoretical research. In P. A. Hancock & N. Meshkati (Eds.), *Human mental workload* (pp. 139–183). North-Holland. https://doi.org/10.1016/S0166-4115(08)62386-9

Instituto Brasileiro de Geografia e Estatística. (2023). *Teletrabalho e trabalho por meio de plataformas digitais* [Apresentação; PNAD Contínua, 4º trimestre de 2022; estatísticas experimentais]. https://agenciadenoticias.ibge.gov.br/media/com_mediaibge/arquivos/448a4b1b10d3cba64647966eb2772316.pdf

Martín, J. (Ed.). (2025). *Algorithmic management and AI-based systems as a new form of work organisation: Psychosocial factors and implications for occupational safety and health* (ALMA-AI joint scientific report). PEROSH. https://doi.org/10.23775/20250616

Oliveira, P. T. G. de, & Junges, J. R. (2023). Plataformas digitais de entrega de alimentação: Condições de trabalho e riscos para a saúde. *Saúde e Sociedade, 32*(3), e220642pt. https://doi.org/10.1590/S0104-12902023220642pt

Rani, U., Dhir, R. K., & Gobel, N. (2022). Delivery workers, trapped in an algorithmic system. *Sociologia: Revista da Faculdade de Letras da Universidade do Porto*, número temático *Trabalho, plataformas digitais, cuidados*, 11–31. https://doi.org/10.21747/08723419/soctem2022a2

Rodrigues, N. L. P. R., Moreira, A. S., & De Lucca, S. R. (2021). O presente e o futuro do trabalho precarizado dos trabalhadores por aplicativo. *Cadernos de Saúde Pública, 37*(11), e00246620. https://doi.org/10.1590/0102-311X00246620

União Europeia. (2024). *Directive (EU) 2024/2831 of the European Parliament and of the Council of 23 October 2024 on improving working conditions in platform work*. Official Journal of the European Union. https://eur-lex.europa.eu/eli/dir/2024/2831/oj

Vignola, E. F., Baron, S., Abreu Plasencia, E., Hussein, M., & Cohen, N. (2023). Workers' health under algorithmic management: Emerging findings and urgent research questions. *International Journal of Environmental Research and Public Health, 20*(2), 1239. https://doi.org/10.3390/ijerph20021239

Zhang, Y., & Rau, P.-L. P. (2026). Measuring workload of food delivery riders under algorithmic management. *Social & Occupational Ergonomics, 228*, 31–41. https://doi.org/10.54941/ahfe1007933
