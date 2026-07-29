# Portfolio — Abdoulaye Diallo

Portfolio personnel d'Abdoulaye Diallo, développeur Full Stack et designer UI/UX à Dakar.

## Développement

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

Le projet est autonome : le code, les images et la vidéo sont tous contenus dans ce dossier.

## Modifier le contenu

Toutes les informations affichées sont centralisées dans :

```text
src/data/portfolio.json
```

Le fichier contient le profil, la navigation, le hero, les technologies, les projets et les expériences.

## Architecture

```text
src/
├── components/
│   ├── layout/       # Navigation et écran d'introduction
│   ├── projects/     # Composants propres aux projets
│   ├── sections/     # Sections principales de la page
│   └── ui/           # Petits composants réutilisables
├── data/             # Contenu JSON du portfolio
├── hooks/            # Comportements React réutilisables
├── App.jsx
├── main.jsx
└── styles.css
```
