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

## Résumé

Système de fraude mondial dans lequel des criminels se font passer pour des dirigeants d'entreprise afin de tromper des employés et les amener à effectuer des virements bancaires. Le FBI estime que le BEC a causé 51 milliards de dollars de pertes entre 2013 et 2022.

## Chronologie

| Année | Événement |
|-------|-----------|
| 2013 | Le FBI a commencé à suivre le BEC |
| 2019 | 26 milliards de dollars de pertes signalées |
| 2022 | 51 milliards de dollars de pertes cumulées |

## Références

[^1]: Wikipédia, "Business Email Compromise" - https://en.wikipedia.org/wiki/Business_Email_Compromise

## À quoi ressemble le BEC (vue d'ensemble)

Le Business Email Compromise (BEC) repose généralement moins sur des logiciels malveillants que sur l'**ingénierie sociale**. Les attaquants cherchent à placer une demande devant la bonne personne au bon moment, en utilisant un langage crédible, une pression temporelle et un contexte professionnel plausible.

Les cibles courantes incluent le personnel financier, les services de comptabilité fournisseurs, les assistants de direction, les équipes d'approvisionnement et toute personne pouvant initier ou approuver des paiements.

## Schémas courants

Les incidents de BEC suivent souvent des schémas reconnaissables :

- **Usurpation d'identité de dirigeant :** Un message semble provenir d'un PDG/directeur financier demandant un virement urgent.
- **Fraude aux factures fournisseurs :** Les coordonnées bancaires d'un fournisseur sont « mises à jour » et les paiements futurs sont redirigés vers l'attaquant.
- **Prise de contrôle de compte :** L'attaquant accède à une vraie boîte mail et utilise des fils de conversation existants pour insérer des instructions frauduleuses.
- **Prétexte avocat/consultant :** L'attaquant prétend que l'affaire est confidentielle et urgente.

## Pourquoi cela fonctionne

Le BEC réussit parce qu'il exploite les comportements organisationnels normaux :

- **Confiance dans les courriels internes** et les noms familiers
- **Processus de paiement routiniers** où les petites exceptions sont courantes
- **Pression temporelle** (fin de trimestre, déplacement, « je suis en réunion »)
- **Approbations fragmentées** où chaque personne suppose que quelqu'un d'autre a vérifié la demande

## Contrôles défensifs (pratiques)

Les défenses de haut niveau sont principalement procédurales et axées sur l'identité :

- **Vérification hors bande :** Confirmer les changements bancaires ou les virements urgents via un numéro de téléphone vérifié ou un canal secondaire.
- **Authentification forte :** Imposer l'authentification multifacteur (MFA) et l'accès conditionnel pour les outils de messagerie et de collaboration.
- **Contrôles des paiements :** Double approbation pour les nouveaux bénéficiaires, les changements de coordonnées bancaires et les virements importants/urgents.
- **Protections de domaine :** SPF/DKIM/DMARC pour réduire l'usurpation d'adresse (solution incomplète, mais utile).
- **Formation de sensibilisation :** Apprendre au personnel à reconnaître les « signaux d'alerte » (urgence, secret, formulation inhabituelle, nouvelles coordonnées bancaires).

## Détection et réponse

Lorsqu'un BEC est suspecté, les priorités de réponse incluent généralement :

1. **Stopper la transaction** (contacter la banque immédiatement ; la rapidité est essentielle).
2. **Préserver les preuves** (en-têtes de courriels, corps des messages, historique de connexion, règles de boîte mail/redirections).
3. **Contenir** (réinitialiser les identifiants, révoquer les sessions, vérifier les abus d'applications OAuth).
4. **Évaluer l'étendue** (examiner les conversations supplémentaires, les factures et toute autre instruction de paiement modifiée).

## Notes sur les mesures

Les estimations de pertes peuvent varier selon la source et la méthodologie. Les totaux publics combinent souvent les pertes confirmées avec les tentatives signalées et peuvent être sensibles à la sous-déclaration, aux différences régionales en matière de signalement et à l'évolution des définitions au fil du temps.

## Références supplémentaires

(Voir la section des références ci-dessus.)