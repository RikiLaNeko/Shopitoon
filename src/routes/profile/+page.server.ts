import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { verify, hash } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as auth from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Fonction de validation du nom d'utilisateur
function validateUsername(username: FormDataEntryValue | null): boolean {
	if (!username || typeof username !== 'string') return false;
	return username.length >= 3 && username.length <= 20;
}

// Fonction de validation du mot de passe
function validatePassword(password: FormDataEntryValue | null): boolean {
	if (!password || typeof password !== 'string') return false;
	return password.length >= 6;
}

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/auth/login');
	}

	// Récupérer les données utilisateur fraîches depuis la base de données
	const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

	// Renvoyer les données fraîches plutôt que celles en cache
	return {
		user
	};
};
export const actions: Actions = {
	updateUsername: async (event) => {
		if (!event.locals.user) {
			return fail(401, { usernameError: 'Vous devez être connecté' });
		}

		const formData = await event.request.formData();
		const username = formData.get('username');

		if (!validateUsername(username)) {
			return fail(400, {
				usernameError: "Le nom d'utilisateur doit contenir entre 3 et 20 caractères"
			});
		}

		// Vérifier si le nom d'utilisateur est déjà pris
		const existingUser = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, username as string))
			.all();

		if (existingUser.length > 0 && existingUser[0].id !== event.locals.user.id) {
			return fail(400, { usernameError: "Ce nom d'utilisateur est déjà utilisé" });
		}

		try {
			await db
				.update(table.user)
				.set({
					username: username as string,
					updatedAt: new Date()
				})
				.where(eq(table.user.id, event.locals.user.id));

			// Mettre à jour les informations de session
			// Correction du typage ici
			event.locals.user = {
				id: event.locals.user.id,
				username: username as string,
				email: event.locals.user.email,
				avatarUrl: event.locals.user.avatarUrl,
				nombreOfPoints: event.locals.user.nombreOfPoints
			};
			await auth.updateSession(event);

			return { usernameSuccess: true };
		} catch (error) {
			console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
			return fail(500, {
				usernameError: "Une erreur est survenue lors de la mise à jour du nom d'utilisateur"
			});
		}
	},

	updatePassword: async (event) => {
		if (!event.locals.user) {
			return fail(401, { passwordError: 'Vous devez être connecté' });
		}

		const formData = await event.request.formData();
		const currentPassword = formData.get('currentPassword');
		const newPassword = formData.get('newPassword');
		const confirmPassword = formData.get('confirmPassword');

		// Vérifier si les mots de passe correspondent
		if (newPassword !== confirmPassword) {
			return fail(400, { passwordError: 'Les mots de passe ne correspondent pas' });
		}

		if (!validatePassword(newPassword)) {
			return fail(400, { passwordError: 'Le mot de passe doit contenir au moins 6 caractères' });
		}

		try {
			// Récupérer l'utilisateur pour vérifier le mot de passe actuel
			const [user] = await db
				.select()
				.from(table.user)
				.where(eq(table.user.id, event.locals.user.id));

			// Vérifier si le mot de passe actuel est correct
			const isCurrentPasswordValid = await verify(user.passwordHash, currentPassword as string);

			if (!isCurrentPasswordValid) {
				return fail(400, { passwordError: 'Le mot de passe actuel est incorrect' });
			}

			// Hasher le nouveau mot de passe
			const newPasswordHash = await hash(newPassword as string);

			// Mettre à jour le mot de passe dans la base de données
			await db
				.update(table.user)
				.set({
					passwordHash: newPasswordHash,
					updatedAt: new Date()
				})
				.where(eq(table.user.id, event.locals.user.id));

			return { passwordSuccess: true };
		} catch (error) {
			console.error('Erreur lors de la mise à jour du mot de passe:', error);
			return fail(500, {
				passwordError: 'Une erreur est survenue lors de la mise à jour du mot de passe'
			});
		}
	},

	updateAvatar: async (event) => {
		console.log('Début de la fonction updateAvatar');

		if (!event.locals.user) {
			console.log('Utilisateur non connecté');
			return fail(401, { avatarError: 'Vous devez être connecté' });
		}

		try {
			const formData = await event.request.formData();
			const avatarUrl = formData.get('avatarUrl');
			console.log("Type d'avatarUrl reçu:", typeof avatarUrl);
			console.log("Valeur d'avatarUrl:", avatarUrl?.toString().substring(0, 50) + '...');

			if (!avatarUrl || typeof avatarUrl !== 'string') {
				console.log("URL d'avatar invalide");
				return fail(400, { avatarError: "URL d'avatar invalide" });
			}

			const userId = event.locals.user.id;
			console.log('ID utilisateur:', userId);
			let finalAvatarUrl = avatarUrl;

			// Si c'est une image en base64, on la sauvegarde comme fichier
			if (avatarUrl.startsWith('data:image/')) {
				console.log('Image en base64 détectée, conversion en cours...');

				// Création du dossier s'il n'existe pas
				const uploadDir = path.resolve('static/avatars');
				console.log('Répertoire de destination:', uploadDir);

				if (!existsSync(uploadDir)) {
					console.log('Création du répertoire de destination');
					await mkdir(uploadDir, { recursive: true });
				}

				// Extraire le type MIME et les données
				const matches = avatarUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
				if (!matches || matches.length !== 3) {
					console.log('Format base64 invalide');
					return fail(400, { avatarError: "Format d'image invalide" });
				}

				const mimeType = matches[1];
				const base64Data = matches[2];
				const buffer = Buffer.from(base64Data, 'base64');

				// Déterminer l'extension de fichier
				let fileExt = 'png';
				if (mimeType.includes('jpeg')) fileExt = 'jpg';
				if (mimeType.includes('png')) fileExt = 'png';
				if (mimeType.includes('gif')) fileExt = 'gif';
				if (mimeType.includes('webp')) fileExt = 'webp';

				// Générer un nom de fichier unique avec timestamp
				const timestamp = Date.now();
				const filename = `avatar-${userId}-${timestamp}.${fileExt}`;
				const filePath = path.join(uploadDir, filename);

				// Écrire le fichier
				await writeFile(filePath, buffer);
				console.log('Fichier écrit avec succès à:', filePath);

				// URL relative pour la base de données
				finalAvatarUrl = `/avatars/${filename}`;
			}

			// Mise à jour de l'avatar dans la base de données
			await db
				.update(table.user)
				.set({
					avatarUrl: finalAvatarUrl,
					updatedAt: new Date()
				})
				.where(eq(table.user.id, userId));

			// Mise à jour de la session utilisateur avec typage explicite
			if (event.locals.user) {
				// Créer un objet utilisateur complet avec tous les champs requis
				event.locals.user = {
					id: event.locals.user.id,
					username: event.locals.user.username,
					email: event.locals.user.email,
					avatarUrl: finalAvatarUrl,
					nombreOfPoints: event.locals.user.nombreOfPoints
				};

				// Assurer que updateSession existe
				if (typeof auth.updateSession === 'function') {
					await auth.updateSession(event);
				} else {
					console.warn(
						"La fonction updateSession n'existe pas, l'avatar sera mis à jour à la prochaine connexion"
					);
				}
			}

			console.log('Avatar mis à jour avec succès:', finalAvatarUrl);
			return { type: 'success', avatarSuccess: true };
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'avatar:", error);
			return fail(500, {
				avatarError: "Une erreur est survenue lors de la mise à jour de l'avatar"
			});
		}
	},

	deleteAccount: async (event) => {
		if (!event.locals.user) {
			throw redirect(302, '/auth/login');
		}

		const userId = event.locals.user.id;

		try {
			// Commencer par supprimer toutes les données associées à l'utilisateur
			// Sessions
			await db.delete(table.session).where(eq(table.session.userId, userId));

			// Historique des tâches
			await db.delete(table.taskHistory).where(eq(table.taskHistory.userId, userId));

			// Tâches (doit être fait après l'historique pour respecter les contraintes de clés étrangères)
			// D'abord supprimer les tags associés aux tâches de l'utilisateur
			const userTasks = await db.select().from(table.task).where(eq(table.task.userId, userId));
			for (const task of userTasks) {
				await db.delete(table.taskTag).where(eq(table.taskTag.taskId, task.id));
				// Mettre à null les références dans les événements du calendrier
				await db
					.update(table.calandarEvent)
					.set({ taskId: null })
					.where(eq(table.calandarEvent.taskId, task.id));
			}
			// Maintenant supprimer les tâches
			await db.delete(table.task).where(eq(table.task.userId, userId));

			// Événements du calendrier
			await db.delete(table.calandarEvent).where(eq(table.calandarEvent.userId, userId));

			// Finalement, supprimer l'utilisateur
			await db.delete(table.user).where(eq(table.user.id, userId));

			// Déconnecter l'utilisateur - vérifier si la fonction existe
			if (typeof auth.logout === 'function') {
				auth.logout(event);
			} else {
				// Alternative si logout n'existe pas: effacer le cookie de session
				const sessionCookieName = 'auth-session'; // Ajustez selon votre configuration
				event.cookies.delete(sessionCookieName, { path: '/' });
			}

			throw redirect(
				302,
				'/?success=' + encodeURIComponent('Votre compte a été supprimé avec succès')
			);
		} catch (error) {
			console.error('Erreur lors de la suppression du compte:', error);
			return fail(500, {
				message: 'Une erreur est survenue lors de la suppression de votre compte'
			});
		}
	}
};
