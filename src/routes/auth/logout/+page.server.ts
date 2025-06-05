import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';

// Exécuté lors du chargement de la page
export const load: PageServerLoad = async (event) => {
	// Récupère l'utilisateur connecté pour afficher son nom dans la page
	const user = event.locals.user;
	const username = user?.username || 'Utilisateur';

	// Si pas d'utilisateur connecté, rediriger directement vers l'accueil
	if (!user) {
		throw redirect(302, '/');
	}

	return { username };
};

export const actions: Actions = {
	default: async (event) => {
		// Récupération de la session actuelle
		const sessionToken = event.cookies.get(auth.sessionCookieName);

		if (sessionToken && event.locals.session) {
			// Invalide la session en base de données
			await auth.invalidateSession(event.locals.session.id);

			// Supprime le cookie de session
			auth.deleteSessionTokenCookie(event);
		}

		// Redirection vers la page d'accueil après déconnexion
		return { success: true };
	}
};
