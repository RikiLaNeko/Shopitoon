[![Français](https://img.shields.io/badge/langue-FR-blue)](#français)
[![English](https://img.shields.io/badge/language-EN-red)](#english)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-orange?logo=svelte)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm)](https://www.npmjs.com/)
[![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)](https://bun.sh/)

---

## <a name="français"></a>🇫🇷 Français

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
- npm ou Bun

### Installation

1. Clonez ce dépôt

   ```bash
   git clone https://github.com/RikiLaNeko/Shopitoon.git
   cd Shopitoon
   ```

2. Installez les dépendances et lancez l'application :

<details>
<summary><b>Instructions avec npm</b></summary>

```bash
npm install
npm run db:push
npm run dev
```

</details>

<details>
<summary><b>Instructions avec Bun</b></summary>

```bash
bun install
bun run db:push
bun run dev
```

</details>

3. Pour construire l'application pour la production :

<details>
<summary><b>npm</b></summary>

```bash
npm run build
```

</details>

<details>
<summary><b>Bun</b></summary>

```bash
bun run build
```

</details>

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

---

## <a name="english"></a>🇬🇧 English

# Shopitoon

Shopitoon is a web application that helps users manage their daily tasks while rewarding them with points they can exchange in a virtual shop.

## Main Features

### Account Management

- User registration and login
- Profile customization (username, avatar)
- Password management
- Account deletion

### Task Management

- Create and manage tasks
- Recurring tasks
- Task history tracking
- Points system to reward task completion

### Calendar

- View tasks in a monthly calendar
- Easy navigation between months

### Shop

- Exchange points for virtual rewards
- Add, edit, and delete items (for admins)

## Technologies Used

- **Frontend**: SvelteKit 5, TailwindCSS 4
- **Backend**: SvelteKit (server-side)
- **Database**: LibSQL/Turso with Drizzle ORM
- **Authentication**: Custom authentication system

## Installation & Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or Bun

### Installation

1. Clone this repository

   ```bash
   git clone https://github.com/RikiLaNeko/Shopitoon.git
   cd Shopitoon
   ```

2. Install dependencies and start the app:

<details>
<summary><b>Instructions with npm</b></summary>

```bash
npm install
npm run db:push
npm run dev
```

</details>

<details>
<summary><b>Instructions with Bun</b></summary>

```bash
bun install
bun run db:push
bun run dev
```

</details>

3. To build the app for production:

<details>
<summary><b>npm</b></summary>

```bash
npm run build
```

</details>

<details>
<summary><b>Bun</b></summary>

```bash
bun run build
```

</details>

## Project Structure

```
helpingplatform/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── server/
│   │   │   └── db/         # Database config and schemas
│   │   └── stores/         # Svelte stores
│   └── routes/             # App routes
│       ├── auth/           # Authentication (login, register, logout)
│       ├── calendar/       # Task calendar
│       ├── profile/        # User profile management
│       └── shop/           # Virtual shop
├── static/
│   └── avatars/           # Uploaded avatar images
└── package.json
```

## API Features

### User Management

- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /profile?/updateUsername` - Update username
- `POST /profile?/updatePassword` - Update password
- `POST /profile?/updateAvatar` - Update avatar
- `POST /profile?/deleteAccount` - Delete account

### Shop Management

- `POST /shop?/buy` - Buy an item
- `POST /shop?/delete` - Delete an item
- `POST /shop/add?/add` - Add an item
- `POST /shop/edit/[id]?/edit` - Edit an item
- `POST /shop/edit/[id]?/delete` - Delete an item

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT](LICENSE) license.
