FROM oven/bun:latest as builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json bun.lock ./

# Installer les dépendances
RUN bun install --frozen-lockfile

# Copier le reste des sources
COPY . .

# Construire l'application
RUN bun run build

# Étape de production avec une image plus légère
FROM oven/bun:slim

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/build ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
# Ne pas copier la base de données, on utilisera un volume

# Installer uniquement les dépendances de production
RUN bun install --production --frozen-lockfile

# Créer un répertoire data avec les bonnes permissions
RUN mkdir -p /app/data && chmod 777 /app/data

# Exposer le port 3000 (port standard pour Node.js/adapter-node)
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV ORIGIN=https://shopitton.dedsecm.xyz
ENV DATABASE_URL=file:/app/data/local.db

# Commande pour démarrer l'application en mode production
CMD ["node", "index.js"]
