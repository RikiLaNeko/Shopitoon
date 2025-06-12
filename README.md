# Shopitoon

Shopitoon est une application web qui aide les utilisateurs à gérer leurs tâches quotidiennes tout en les récompensant avec des points qu'ils peuvent échanger dans une boutique virtuelle.

## Fonctionnalités principales

### Gestion de compte
- Inscription et connexion utilisateur
- Personnalisation du profil (nom d'utilisateur, avatar)
- Gestion du mot de passe
- Suppression de compte

### Gestion des tâches
- Création et gestion de tâches
- Tâches récurrentes
- Suivi de l'historique des tâches
- Système de points pour récompenser l'accomplissement des tâches

### Calendrier
- Visualisation des tâches dans un calendrier mensuel
- Navigation facile entre les mois

### Boutique
- Échange de points contre des récompenses virtuelles
- Ajout, modification et suppression d'articles (pour les administrateurs)

## Technologies utilisées

- **Frontend**: SvelteKit 5, TailwindCSS 4
- **Backend**: SvelteKit (server-side)
- **Base de données**: LibSQL/Turso avec Drizzle ORM
- **Authentification**: Système d'authentification personnalisé

## Installation et démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. Clonez ce dépôt
   ```bash
   git clone https://github.com/RikiLaNeko/helpingplatform.git
   cd helpingplatform
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Configurez la base de données
   ```bash
   npm run db:push
   ```

4. Lancez l'application en mode développement
   ```bash
   npm run dev
   ```

5. Construisez l'application pour la production
   ```bash
   npm run build
   ```

## Structure du projet

```
helpingplatform/
├── src/
│   ├── lib/
│   │   ├── components/     # Composants réutilisables
│   │   ├── server/
│   │   │   └── db/         # Configuration de la base de données et schémas
│   │   └── stores/         # Stores Svelte
│   └── routes/             # Routes de l'application
│       ├── auth/           # Authentification (connexion, inscription, déconnexion)
│       ├── calendar/       # Calendrier des tâches
│       ├── profile/        # Gestion du profil utilisateur
│       └── shop/           # Boutique virtuelle
├── static/
│   └── avatars/           # Images d'avatar uploadées
└── package.json
```

## Fonctionnalités de l'API

### Gestion d'utilisateur
- `POST /auth/register` - Inscription d'un nouvel utilisateur
- `POST /auth/login` - Connexion utilisateur
- `POST /auth/logout` - Déconnexion utilisateur
- `POST /profile?/updateUsername` - Mise à jour du nom d'utilisateur
- `POST /profile?/updatePassword` - Mise à jour du mot de passe
- `POST /profile?/updateAvatar` - Mise à jour de l'avatar
- `POST /profile?/deleteAccount` - Suppression du compte

### Gestion de la boutique
- `POST /shop?/buy` - Achat d'un article
- `POST /shop?/delete` - Suppression d'un article
- `POST /shop/add?/add` - Ajout d'un article
- `POST /shop/edit/[id]?/edit` - Modification d'un article
- `POST /shop/edit/[id]?/delete` - Suppression d'un article

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence [MIT](LICENSE).
```
