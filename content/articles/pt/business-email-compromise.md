Here is the translated article:

---
id: "business-email-compromise"
name: "Business Email Compromise"
birth: "Unknown"
death: "Unknown"
nationality: "International"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Business_Email_Compromise"
lastUpdated: "2026-02-26"
---

## Resumo

Esquema global de fraude em que criminosos se passam por executivos de empresas para enganar funcionários e fazê-los transferir dinheiro. O FBI estima que o BEC causou US$ 51 bilhões em perdas de 2013 a 2022.

## Cronologia

| Ano | Evento |
|------|-------|
| 2013 | O FBI começou a rastrear o BEC |
| 2019 | US$ 26 bilhões em perdas relatadas |
| 2022 | US$ 51 bilhões em perdas acumuladas |

## Referências

[^1]: Wikipedia, "Business Email Compromise" - https://en.wikipedia.org/wiki/Business_Email_Compromise

## Como o BEC Funciona (Visão Geral)

O Business Email Compromise (BEC) geralmente envolve menos malware e mais **engenharia social**. Os atacantes buscam colocar uma solicitação diante da pessoa certa no momento certo, usando linguagem convincente, pressão de tempo e um contexto empresarial plausível.

Os alvos comuns incluem equipes financeiras, contas a pagar, assistentes executivos, equipes de compras e qualquer pessoa que possa iniciar ou aprovar pagamentos.

## Padrões Comuns

Os incidentes de BEC frequentemente seguem padrões reconhecíveis:

- **Personificação de executivos:** Uma mensagem parece vir de um CEO/CFO solicitando uma transferência urgente.
- **Fraude de fatura de fornecedor:** Os dados bancários de um fornecedor são "atualizados" e os pagamentos futuros vão para o atacante.
- **Comprometimento de conta:** O atacante obtém acesso a uma caixa de e-mail real e usa conversas em andamento para inserir instruções fraudulentas.
- **Pretexto de advogado/consultor:** O atacante alega que o assunto é confidencial e urgente.

## Por Que Funciona

O BEC tem sucesso porque explora comportamentos organizacionais normais:

- **Confiança no e-mail interno** e em nomes familiares
- **Fluxos de pagamento rotineiros** onde pequenas exceções são comuns
- **Pressão de tempo** (fim de trimestre, viagem, "estou em uma reunião")
- **Aprovações fragmentadas** onde cada pessoa assume que outra já verificou a solicitação

## Controles Defensivos (Práticos)

As defesas de alto nível são principalmente procedimentais e focadas em identidade:

- **Verificação por canal alternativo:** Confirme alterações bancárias ou transferências urgentes por um número de telefone confiável ou canal secundário.
- **Autenticação forte:** Aplique MFA e acesso condicional para e-mail e ferramentas de colaboração.
- **Controles de pagamento:** Aprovação dupla para novos beneficiários, alterações de dados bancários e transferências grandes/urgentes.
- **Proteções de domínio:** SPF/DKIM/DMARC para reduzir spoofing (não é uma solução completa, mas ajuda).
- **Treinamento de conscientização:** Ensine os funcionários a identificar "sinais de alerta" (urgência, sigilo, linguagem incomum, novos dados bancários).

## Detecção e Resposta

Quando há suspeita de BEC, as prioridades de resposta geralmente incluem:

1. **Interromper a transação** (entre em contato com o banco imediatamente; a velocidade é essencial).
2. **Preservar evidências** (cabeçalhos de e-mail, corpo das mensagens, histórico de login, regras de caixa de entrada/encaminhamentos).
3. **Conter** (redefinir credenciais, revogar sessões, verificar abuso de aplicativos OAuth).
4. **Avaliar o escopo** (revisar conversas adicionais, faturas e quaisquer outras instruções de pagamento alteradas).

## Observações sobre Métricas

As estimativas de perdas podem variar conforme a fonte e a metodologia. Os totais públicos frequentemente combinam perdas confirmadas com tentativas relatadas e podem ser sensíveis à subnotificação, diferenças regionais nos relatórios e mudanças nas definições ao longo do tempo.

## Referências adicionais

(Consulte a seção de referências acima.)