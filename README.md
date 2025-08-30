# Portfolio Abdoulaye Diallo

Un portfolio moderne et interactif développé avec React, TypeScript et Tailwind CSS, featuring un système de devis automatique avec génération de PDF.

## ✨ Fonctionnalités

- **Portfolio moderne** avec thème vert élégant
- **Système de devis automatique** avec génération PDF
- **Formulaire de contact intégré** avec chatbot IA
- **Design responsive** et mode sombre
- **Animations fluides** et effets visuels modernes
- **Génération de PDF** avec thème personnalisé
- **Notifications par email** automatiques

## 🛠️ Technologies utilisées

- **React 18** + **TypeScript**
- **Tailwind CSS** pour le styling
- **Vite** pour le build et le développement
- **jsPDF** pour la génération de PDF
- **EmailJS** pour les notifications
- **Lucide React** pour les icônes

## 🚀 Déploiement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. Clonez le repository :
```bash
git clone https://github.com/VOTRE_USERNAME/portfolio.git
cd portfolio
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Pour construire pour la production :
```bash
npm run build
```

### Configuration pour le déploiement

Le projet est configuré pour fonctionner en production sans serveur externe :

- **API automatique** : Détecte automatiquement l'environnement (dev/prod)
- **Données statiques** : Utilise les données du fichier `db.json` en production
- **Images optimisées** : Toutes les images sont dans le dossier `public/img/`
- **Fallback robuste** : Gestion d'erreur pour les appels API

## 📁 Structure du projet

```
portfolio/
├── public/
│   └── img/           # Images du portfolio
├── src/
│   ├── components/    # Composants React
│   ├── services/      # Services API et utilitaires
│   ├── types/         # Types TypeScript
│   └── hooks/         # Hooks personnalisés
├── db.json            # Données du portfolio
└── package.json       # Dépendances et scripts
```

## 🎨 Personnalisation

### Couleurs du thème
Le thème utilise une palette verte cohérente définie dans `tailwind.config.js` :

```javascript
colors: {
  primary: {
    50: '#F0FDF4',   // Vert très clair
    500: '#22C55E',  // Vert principal
    600: '#16A34A',  // Vert moyen
    700: '#15803D'   // Vert foncé
  }
}
```

### Données du portfolio
Toutes les données sont centralisées dans `db.json` :
- Informations personnelles
- Compétences techniques
- Projets réalisés
- Expériences professionnelles

## 📧 Configuration des emails

Pour activer les notifications par email :

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez votre service dans `src/services/emailService.ts`
3. Remplacez les clés API par les vôtres

## 📄 Génération de PDF

Le système génère automatiquement des devis PDF avec :
- **Thème vert personnalisé** utilisant votre palette
- **Informations complètes** du client et du projet
- **Calcul automatique** des prix et délais
- **Format professionnel** prêt à l'impression

## 🌐 Déploiement recommandé

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Déployez le dossier dist sur Netlify
```

### GitHub Pages
```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## 📝 Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**Abdoulaye Diallo**
- Email : abdallahuix.dev@gmail.com
- Téléphone : +221 78 291 7770
- LinkedIn : [Votre profil LinkedIn]

---

⭐ Si ce portfolio vous plaît, n'hésitez pas à laisser une étoile sur GitHub !
