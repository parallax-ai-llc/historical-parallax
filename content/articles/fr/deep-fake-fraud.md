---
id: "deep-fake-fraud"
name: "Fraude par hypertrucage"
birth: "2020-01-01"
death: "Unknown"
nationality: "International"
occupation: ["Emerging Crime"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Deep_Fake_Fraud"
lastUpdated: "2026-02-26"
---

## Résumé

Des vidéos et des voix générées par l'IA (deepfakes) sont utilisées à des fins de fraude, notamment un vol de 25 millions de dollars auprès d'une entreprise hongkongaise où des criminels ont simulé un appel vidéo avec le directeur financier de l'entreprise.

## Chronologie des événements

| Année | Événement |
|-------|-----------|
| 2024 | 25 millions de dollars volés grâce à un appel vidéo deepfake |

## Mode opératoire (comment ça fonctionne)

La fraude par deepfake combine généralement l'ingénierie sociale avec des médias synthétiques :

- **Reconnaissance :** les attaquants collectent des échantillons vocaux et vidéo à partir de conférences publiques, de réunions ou des réseaux sociaux.
- **Modélisation :** un modèle de clonage vocal ou de synthèse faciale est entraîné/affiné à partir des échantillons collectés.
- **Événement d'usurpation d'identité :** la cible reçoit un appel ou une visioconférence qui semble provenir d'un dirigeant, d'un fournisseur ou d'un interlocuteur de confiance.
- **Prétexte urgent :** l'usurpateur met la pression sur la cible pour contourner les contrôles habituels (« transaction confidentielle », « paiement urgent », « n'impliquez personne d'autre »).
- **Capture de paiement ou d'identifiants :** les fonds sont virés vers des comptes contrôlés par les attaquants, ou des identifiants/approbations MFA sont obtenus.

## Schémas d'attaque courants

- **Usurpation d'identité de dirigeant (BEC + deepfake) :** la voix ou la vidéo du directeur financier/PDG est utilisée pour autoriser des virements.
- **Détournement de paiement fournisseur :** une voix synthétique est utilisée pour « confirmer » de nouvelles coordonnées bancaires.
- **Escroqueries au recrutement/RH :** des entretiens deepfake pour obtenir un accès aux systèmes internes ou à la paie.
- **Tentatives de contournement KYC/vérification d'identité :** des visages synthétiques utilisés pour tromper les contrôles de vivacité ou l'intégration à distance.

## Indicateurs et signaux d'alerte

Même lorsque les médias semblent convaincants, des signaux opérationnels transparaissent souvent :

- Demandes de **ne pas effectuer de rappel** ou d'**éviter toute confirmation écrite**.
- **Changement soudain de comptes de destination** ou acheminement de paiement inhabituel.
- **Artefacts audio** (cadence étrange, respirations manquantes, consonnes tronquées) ou **artefacts visuels** (décalage de synchronisation labiale, mouvements oculaires non naturels).
- Un participant insistant pour garder la **caméra éteinte**, une basse résolution ou des « problèmes techniques » fréquents.
- La demande ne correspond pas au contexte connu, aux priorités ou aux processus d'approbation établis.

## Mesures d'atténuation (vue d'ensemble)

- **Vérification hors bande :** rappel obligatoire à un numéro connu (annuaire, pas celui du message) pour les demandes sensibles.
- **Intégrité à deux personnes :** exiger plusieurs approbations indépendantes pour les virements de grande valeur.
- **Contrôles de paiement :** appliquer des listes blanches de bénéficiaires, des délais de carence pour les nouveaux bénéficiaires et une vérification des changements de coordonnées bancaires.
- **Hygiène des réunions :** vérifier les participants via des plateformes authentifiées ; ne pas accepter l'identité uniquement sur la base de l'audio/vidéo.
- **Formation de sensibilisation :** se concentrer sur le respect des procédures sous pression, pas seulement sur la « détection des artefacts ».

## Impact

- **Perte financière :** vol direct et coûts de recouvrement.
- **Perturbation opérationnelle :** réponse aux incidents, gel des transactions et audit/investigation numérique.
- **Atteinte à la réputation :** érosion de la confiance dans les communications et la collaboration à distance.
- **Externalités de sécurité :** les deepfakes peuvent être utilisés pour accroître l'efficacité du hameçonnage et de la compromission de messagerie professionnelle (BEC).

## Concepts associés

- **Compromission de messagerie professionnelle (BEC)**
- **Ingénierie sociale**
- **Clonage vocal / synthèse vocale**
- **Fraude à l'identité synthétique**

## Références

[^1]: Wikipedia, "Deep Fake Fraud" - https://en.wikipedia.org/wiki/Deep_Fake_Fraud