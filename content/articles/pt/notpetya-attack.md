---
id: "notpetya-attack"
name: "Ataque NotPetya"
birth: "Unknown"
death: "Unknown"
nationality: "Russia"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/NotPetya_Attack"
lastUpdated: "2026-02-26"
---

## Resumo

Devastador ciberataque russo em junho de 2017, disfarçado de ransomware, que causou US$ 10 bilhões em danos em todo o mundo. Teve como alvo principal a Ucrânia, mas se espalhou globalmente através da gigante de transporte marítimo Maersk e da empresa farmacêutica Merck.

## Cronologia dos Eventos

| Ano | Evento |
|------|-------|
| 2017 | Ataque lançado via software fiscal ucraniano |
| 2017 | US$ 10 bilhões em danos |
| 2020 | Seis oficiais do GRU indiciados |

## Contexto Técnico e Histórico

O NotPetya surgiu durante um período de escalada de conflitos cibernéticos envolvendo a Ucrânia, incluindo ataques disruptivos a agências governamentais, bancos, veículos de comunicação e serviços essenciais. Diferentemente de ransomwares típicos com motivação financeira, o design e a execução do NotPetya estavam alinhados com um objetivo destrutivo: tornar sistemas inutilizáveis em larga escala.

## Acesso Inicial e Propagação

Investigações descrevem amplamente o vetor de infecção inicial como um mecanismo de atualização comprometido de um pacote de software de contabilidade/fiscal amplamente utilizado na Ucrânia (comumente reportado como M.E.Doc). Uma vez dentro de uma organização, o malware se propagava agressivamente pelas redes Windows usando múltiplos mecanismos, incluindo coleta de credenciais e exploração de vulnerabilidades SMB conhecidas, permitindo movimentação lateral rápida mesmo em ambientes com níveis variados de atualização.

## Carga Destrutiva (Comportamento de "Wiper")

Embora o malware exibisse uma nota de resgate e exigisse pagamento, a rotina de criptografia não foi implementada de forma que permitisse a recuperação de maneira confiável. Como resultado, muitos analistas caracterizam o NotPetya como um wiper disfarçado de ransomware. Ele corrompia estruturas essenciais necessárias para o boot e o acesso ao sistema de arquivos, deixando as vítimas com interrupções generalizadas e reconstruções custosas.

## Impacto Global e Vítimas Notáveis

A propagação do NotPetya se estendeu muito além da Ucrânia devido a redes corporativas interconectadas e provedores de serviços compartilhados. Reportagens públicas frequentemente destacam grandes interrupções em empresas internacionais, incluindo a Maersk (transporte/logística) e a Merck (farmacêutica), além de muitas outras empresas e entidades públicas. O incidente se tornou um dos eventos cibernéticos mais financeiramente danosos já registrados, com perdas totais estimadas comumente citadas na faixa de vários bilhões de dólares.

## Atribuição e Respostas Oficiais

Vários governos atribuíram publicamente o NotPetya a agentes estatais russos, e ações subsequentes de aplicação da lei nos Estados Unidos incluíram indiciamentos de oficiais da inteligência militar russa (GRU) ligados a operações cibernéticas. Embora os detalhes da atribuição variem conforme a fonte, o ataque é amplamente tratado como um exemplo proeminente de malware destrutivo estrategicamente motivado e vinculado a um Estado.

## Legado e Lições

O NotPetya é frequentemente citado em discussões sobre:

- Riscos de comprometimento da cadeia de suprimentos (canais de atualização de software como alvos de alto impacto)
- A importância operacional da segmentação de rede e da higiene de credenciais
- Os limites da nota de resgate como indicador da intenção do atacante
- A necessidade de backups resilientes e procedimentos de reconstrução rápida em vez de expectativas de descriptografia

## Referências

[^1]: Wikipedia, "NotPetya Attack" - https://en.wikipedia.org/wiki/NotPetya_Attack