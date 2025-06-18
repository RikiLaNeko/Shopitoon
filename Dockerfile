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
FROM oven/bun:latest

WORKDIR /app

# Copier les fichiers de production depuis l'étape de build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
# Utiliser les bons chemins d'output de SvelteKit
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/static ./static
COPY --from=builder /app/local.db ./local.db

# Installer TOUTES les dépendances (dev et prod) pour avoir accès à Vite
RUN bun install

# Exposer le port 4173 (SvelteKit preview port)
EXPOSE 4173

# Utiliser un utilisateur non-root pour la sécurité
RUN addgroup --system nonroot && adduser --system --ingroup nonroot nonroot
USER nonroot

# Commande pour démarrer l'application en mode preview
CMD ["bun", "run", "preview", "--host", "0.0.0.0"]
