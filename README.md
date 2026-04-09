# CRM — Fondation Claude Pompidou

Application web connectée à l'API Baserow pour la gestion du bénévolat de la Fondation Claude Pompidou.

## Structure du projet

```
crm-fcp-test/
├── index.html              ← Page de connexion
├── benevoles.html          ← Liste des bénévoles
│
├── css/
│   └── style.css           ← Design system partagé
│
└── js/
    ├── config.js           ← IDs des tables et constantes
    ├── auth.js             ← Gestion du token (localStorage)
    ├── api.js              ← Fonctions API Baserow
    └── utils.js            ← Fonctions utilitaires communes
```

## Fonctionnement

- L'application se connecte directement à l'API REST de Baserow
- Le token API est saisi à la connexion et stocké dans le navigateur (localStorage)
- Aucun secret n'est stocké dans le code source

## Déploiement

Hébergé sur GitHub Pages : https://agathecmpss.github.io/crm-fcp-test/

## Ajouter une nouvelle table

1. Récupérer l'ID de la table dans l'URL Baserow
2. L'ajouter dans `js/config.js` → objet `tables`
3. Créer la page HTML correspondante en suivant le modèle de `benevoles.html`

## Stack technique

- HTML + CSS + JavaScript vanilla (aucune dépendance)
- API REST Baserow
- GitHub Pages (hébergement statique)
