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
COPY --from=builder /app/local.db ./local.db

# Installer uniquement les dépendances de production
RUN bun install --production --frozen-lockfile

# Exposer le port 3000 (port standard pour Node.js/adapter-node)
EXPOSE 3000

# Utiliser un utilisateur non-root pour la sécurité
RUN addgroup --system nonroot && adduser --system --ingroup nonroot nonroot
USER nonroot

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV ORIGIN=https://shopitton.dedsecm.xyz

# Commande pour démarrer l'application en mode production
CMD ["node", "index.js"]
