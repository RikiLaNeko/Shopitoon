import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-node est optimisé pour les environnements Node.js comme Docker
		adapter: adapter({
			// Configurations spécifiques pour adapter-node
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		files: {
			assets: 'static' // Configuration pour les assets statiques
		},
		// Configuration pour autoriser les soumissions cross-site (pour le tunnel)
		csrf: {
			checkOrigin: false // Désactive la vérification d'origine pour permettre le tunnel
		},
		// Configuration pour les assets statiques
		paths: {
			assets: ''
		}
	}
};

export default config;
