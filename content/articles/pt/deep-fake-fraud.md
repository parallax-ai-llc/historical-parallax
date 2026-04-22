---
id: "deep-fake-fraud"
name: "Fraude de Deepfake"
birth: "2020-01-01"
death: "Unknown"
nationality: "International"
occupation: ["Emerging Crime"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Deep_Fake_Fraud"
lastUpdated: "2026-02-26"
---

## Resumo

Vídeos e vozes deepfake gerados por IA são usados para fraudes, incluindo um roubo de US$ 25 milhões de uma empresa de Hong Kong, onde criminosos falsificaram uma videochamada com o CFO da empresa.

## Linha do Tempo

| Ano | Evento |
|------|-------|
| 2024 | US$ 25 milhões roubados usando videochamada deepfake |

## Modus Operandi (Como Funciona)

A fraude habilitada por deepfake geralmente combina engenharia social com mídia sintética:

- **Reconhecimento:** os atacantes coletam amostras de voz/vídeo de palestras públicas, reuniões ou redes sociais.
- **Modelagem:** um modelo de clonagem de voz ou síntese facial é treinado/ajustado com as amostras coletadas.
- **Evento de personificação:** o alvo recebe uma ligação ou videoconferência que parece vir de um executivo, fornecedor ou contraparte de confiança.
- **Pretexto de urgência:** o impostor pressiona o alvo a ignorar os controles normais ("negócio confidencial", "pagamento urgente", "não envolva outras pessoas").
- **Captura de pagamento ou credenciais:** os fundos são transferidos para contas controladas pelos atacantes, ou credenciais/aprovações de MFA são obtidas.

## Padrões Comuns de Ataque

- **Personificação de executivos (BEC + deepfake):** voz ou vídeo do CFO/CEO usados para autorizar transferências.
- **Desvio de pagamento de fornecedores:** voz sintética usada para "confirmar" novos dados bancários.
- **Golpes de recrutamento/RH:** entrevistas deepfake para obter acesso a sistemas internos ou folha de pagamento.
- **Tentativas de burla de KYC/identidade:** rostos sintéticos usados para enganar verificações de vivacidade ou integração remota.

## Indicadores e Sinais de Alerta

Mesmo quando a mídia parece convincente, sinais operacionais frequentemente vazam:

- Solicitações para **pular retornos de ligação** ou **evitar confirmação por escrito**.
- **Mudança repentina de contas de destino** ou roteamento de pagamento incomum.
- **Artefatos de áudio** (cadência estranha, respirações ausentes, consoantes cortadas) ou **artefatos visuais** (dessincronização labial, movimentos oculares não naturais).
- Um participante insistindo em **câmera desligada**, baixa resolução ou frequentes "problemas técnicos".
- A solicitação não corresponde ao contexto conhecido, prioridades ou fluxos de aprovação estabelecidos.

## Mitigações (Visão Geral)

- **Verificação fora de banda:** retorno obrigatório para um número conhecido (do diretório, não da mensagem) para solicitações sensíveis.
- **Integridade de duas pessoas:** exigir múltiplas aprovações independentes para transferências de alto valor.
- **Controles de pagamento:** aplicar listas de beneficiários permitidos, períodos de espera para novos favorecidos e verificação de alterações de dados bancários.
- **Higiene de reuniões:** verificar participantes por meio de plataformas autenticadas; evitar aceitar identidade apenas por áudio/vídeo.
- **Treinamento de conscientização:** foco em conformidade de processos sob pressão, não apenas em "identificar artefatos".

## Impacto

- **Perda financeira:** roubo direto e custos de recuperação.
- **Interrupção operacional:** resposta a incidentes, congelamento de transações e auditoria/perícia.
- **Dano reputacional:** erosão da confiança em comunicações e colaboração remota.
- **Externalidades de segurança:** deepfakes podem ser usados para aumentar a eficácia de phishing e comprometimento de e-mail corporativo (BEC).

## Conceitos Relacionados

- **Comprometimento de E-mail Corporativo (BEC)**
- **Engenharia social**
- **Clonagem de voz / síntese de fala**
- **Fraude de identidade sintética**

## Referências

[^1]: Wikipedia, "Deep Fake Fraud" - https://en.wikipedia.org/wiki/Deep_Fake_Fraud