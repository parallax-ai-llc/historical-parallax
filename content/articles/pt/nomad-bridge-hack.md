---
id: "nomad-bridge-hack"
name: "Nomad Bridge Hack"
birth: "2022-08-02"
death: "Unknown"
nationality: "Unknown"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Nomad_Bridge_Hack"
lastUpdated: "2026-02-26"
---

## Resumo

Hack caótico da ponte de tokens Nomad, onde centenas de imitadores drenaram US$ 190 milhões após a descoberta do exploit inicial. Ficou conhecido como o primeiro 'roubo descentralizado'.

## Linha do Tempo

| Ano | Evento |
|------|-------|
| 2022 | US$ 190 milhões drenados da ponte Nomad |
| 2022 | Chamado de primeiro 'roubo descentralizado' quando centenas de pessoas participaram |

## Referências

[^1]: Wikipedia, "Nomad Bridge Hack" - https://en.wikipedia.org/wiki/Nomad_Bridge_Hack

## O Que Aconteceu

Nomad é uma ponte cross-chain que permitia aos usuários mover tokens entre redes, bloqueando ativos em uma cadeia e cunhando ou liberando representações em outra. No início de agosto de 2022, um atacante descobriu uma forma de enviar mensagens que a ponte trataria como válidas, permitindo saques sem a devida autorização. Uma vez que a primeira transação maliciosa ficou visível on-chain, muitos outros a imitaram.

Uma característica notável do incidente foi a dinâmica de "imitadores": em vez de um único atacante drenando fundos silenciosamente, um grande número de endereços repetiu o mesmo padrão para extrair ativos, criando uma corrida caótica e pública à ponte.

## Mecanismo Técnico de Alto Nível

Em linhas gerais, o hack é comumente descrito como uma falha na verificação de mensagens na comunicação cross-chain da ponte:

- Uma alteração no estado do contrato tornou possível que certas mensagens fossem consideradas comprovadas/válidas quando não eram.
- Os atacantes podiam criar mensagens de saque que contornavam as verificações previstas.
- A simplicidade de replicar o exploit (copiar os calldata e ajustar os endereços dos destinatários) reduziu a barreira de participação.

## Consequências Imediatas

Após a drenagem, a equipe do projeto pausou a ponte e tentou coordenar esforços de recuperação. Alguns fundos foram posteriormente devolvidos por certos participantes, enquanto outros ativos foram movidos por meio de corretoras e rotas de ofuscação on-chain.

## Por Que Isso Importa

O Hack da Ponte Nomad é frequentemente citado em discussões sobre riscos de pontes porque combinou:

- Valor concentrado bloqueado em um único componente de protocolo
- Um modo de falha que possibilitou extração rápida e em larga escala
- Dinâmicas sociais em que a visibilidade pública acelerou as perdas

O incidente contribuiu para apelos mais amplos na indústria por auditorias mais rigorosas, processos de atualização mais seguros, verificação com defesa em profundidade e designs mais conservadores para mensagens cross-chain.

## Referências Adicionais

[^2]: Nomad, comunicações públicas sobre o incidente e materiais de post-mortem (anúncios e relatórios do projeto são comumente referenciados na cobertura)