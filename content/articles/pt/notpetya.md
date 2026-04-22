---
id: "notpetya"
name: "NotPetya"
birth: "2017-06-27"
death: "Unknown"
nationality: "Russia"
occupation: ["Cybercrime Incident"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/NotPetya"
lastUpdated: "2026-02-26"
---

## Resumo

Ciberataque militar russo disfarçado de ransomware que causou US$ 10 bilhões em danos em todo o mundo. Teve como alvo a Ucrânia, mas se espalhou globalmente, paralisando a Maersk, a Merck e a FedEx.

## Linha do Tempo

| Ano | Evento |
|------|-------|
| 2017 | US$ 10 bilhões em danos globais |

## Referências

[^1]: Wikipedia, "NotPetya" - https://en.wikipedia.org/wiki/NotPetya

## Contexto e Antecedentes

- **Vetor inicial (amplamente reportado):** um mecanismo de atualização comprometido do software de contabilidade ucraniano **M.E.Doc** foi usado para entregar o malware nas redes ucranianas.
- **Momento:** o surto em larga escala começou em **27 de junho de 2017**, próximo ao período do Dia da Constituição da Ucrânia, amplificando a interrupção em governos e empresas.
- **Disfarce:** apresentou-se como "ransomware", mas seu design e comportamento estavam mais alinhados com um **wiper** (malware destrutivo) do que com extorsão com fins lucrativos.

## O Que Ele Fez (Visão Técnica de Alto Nível)

- **Carga útil:** sobrescreveu ou corrompeu estruturas críticas do disco (incluindo o **Master Boot Record**), impedindo a inicialização normal e dificultando a recuperação.
- **Movimento lateral:** espalhou-se rapidamente dentro das redes usando uma combinação de:
  - credenciais roubadas e ferramentas administrativas,
  - técnicas relacionadas ao SMB do Windows que possibilitaram ampla propagação quando os sistemas não estavam totalmente atualizados ou segmentados.
- **Comportamento de "resgate":** exigia pagamento em Bitcoin, mas os mecanismos de recuperação de chaves eram pouco confiáveis ou impossíveis em escala — uma das razões pelas quais muitos analistas o classificam como um **wiper pseudo-ransomware**.

## Atribuição (Relatórios Públicos)

- Múltiplos governos e empresas de segurança atribuíram publicamente o NotPetya à **inteligência militar da Rússia (GRU)**.
- Atribuições públicas foram divulgadas, entre outros, pelos **Estados Unidos** e pelo **Reino Unido**, descrevendo-o como uma operação patrocinada pelo Estado.

## Impacto Global

- **Danos estimados:** comumente citados em **~US$ 10 bilhões**, tornando-o um dos incidentes cibernéticos mais custosos já registrados.
- **Interrupção operacional:** causou paralisações de várias semanas em logística, manufatura, farmacêutica e transporte marítimo.
- **Efeitos em seguros e questões jurídicas:** desencadeou disputas de alto perfil sobre seguros cibernéticos e acelerou a atenção em nível de diretoria ao risco cibernético sistêmico.

## Vítimas Notáveis (Exemplos)

- **A.P. Moller–Maersk:** interrupção significativa em operações de transporte marítimo e terminais portuários; uma reconstrução de TI em larga escala foi publicamente descrita.
- **Merck:** manufatura e operações impactadas; posteriormente divulgou impacto financeiro material.
- **FedEx / TNT Express:** efeitos severos nas operações de encomendas, especialmente na rede europeia da TNT.

## Lições Aprendidas (Conclusões para Defensores)

- **Segurança da cadeia de suprimentos é importante:** atualizações de software confiáveis podem se tornar um canal de entrega; a integridade e o monitoramento dos pipelines de atualização são críticos.
- **Segmentação de rede:** redes planas transformam um único ponto de acesso em destruição em escala empresarial.
- **Gerenciamento de patches:** a correção oportuna de vulnerabilidades do Windows amplamente exploradas reduz o raio de impacto.
- **Backups e simulações de recuperação:** backups offline e imutáveis, além de restaurações praticadas, são essenciais quando o malware se comporta como um wiper.
- **Higiene de credenciais:** limite a reutilização de credenciais administrativas; implemente o princípio do menor privilégio; monitore o acesso privilegiado e as ferramentas de execução remota.

## Leitura Adicional

- Declarações do Centro Nacional de Segurança Cibernética do Reino Unido (NCSC) e do governo dos EUA sobre a atribuição do NotPetya (consulte os comunicados oficiais).
- Análises técnicas de grandes fornecedores de segurança (por exemplo, ESET, Microsoft, Kaspersky) descrevendo as características de propagação e de wiper.