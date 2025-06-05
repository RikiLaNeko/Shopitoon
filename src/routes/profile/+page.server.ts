import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';

export const load = async (event) => {
	// Redirection si non connecté
	if (!event.locals.user) {
		throw redirect(302, '/auth/login');
	}

	// Récupérer l'utilisateur complet avec tous les champs nécessaires
	const [user] = await db
		.select()
		.from(table.user)
		.where(eq(table.user.id, event.locals.user.id));

	return { user };
};

export const actions: Actions = {
	updateUsername: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const data = await request.formData();
		const username = data.get('username')?.toString();

		if (!username) {
			return fail(400, { usernameError: 'Le nom d\'utilisateur est requis' });
		}

		// Vérifier si le nom d'utilisateur est déjà pris
		const [existingUser] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, username));

		if (existingUser && existingUser.id !== locals.user.id) {
			return fail(400, { usernameError: 'Ce nom d\'utilisateur est déjà pris' });
		}

		// Mettre à jour le nom d'utilisateur
		await db.update(table.user)
			.set({
				username,
				updatedAt: new Date()
			})
			.where(eq(table.user.id, locals.user.id));

		return { usernameSuccess: true };
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const data = await request.formData();
		const currentPassword = data.get('currentPassword')?.toString();
		const newPassword = data.get('newPassword')?.toString();
		const confirmPassword = data.get('confirmPassword')?.toString();

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, { passwordError: 'Tous les champs sont requis' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { passwordError: 'Les nouveaux mots de passe ne correspondent pas' });
		}

		// Récupérer le mot de passe actuel de l'utilisateur
		const [user] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.id, locals.user.id));

		// Vérifier si le mot de passe actuel est correct
		const validPassword = await bcrypt.compare(currentPassword, user.passwordHash);
		if (!validPassword) {
			return fail(400, { passwordError: 'Mot de passe actuel incorrect' });
		}

		// Hasher et mettre à jour le nouveau mot de passe
		const passwordHash = await bcrypt.hash(newPassword, 10);

		await db.update(table.user)
			.set({
				passwordHash,
				updatedAt: new Date()
			})
			.where(eq(table.user.id, locals.user.id));

		return { passwordSuccess: true };
	},

	deleteAccount: async ({ locals, request, cookies }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		// Récupérer les sessions de l'utilisateur
		const sessions = await db
			.select()
			.from(table.session)
			.where(eq(table.session.userId, locals.user.id));

		// Supprimer toutes les sessions de l'utilisateur
		for (const session of sessions) {
			await invalidateSession(session.id);
		}

		// Supprimer l'utilisateur
		await db.delete(table.user)
			.where(eq(table.user.id, locals.user.id));

		// Supprimer le cookie de session
		deleteSessionTokenCookie({ cookies } as any);

		throw redirect(302, '/?deleted=true');
	}
};