import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { eq, and, gte } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Rediriger si l'utilisateur n'est pas connecté
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}

	// Récupérer toutes les tâches récurrentes de l'utilisateur
	const tasks = await db
		.select()
		.from(table.task)
		.where(and(eq(table.task.userId, event.locals.user.id), eq(table.task.isRecurring, 1)));

	// Récupérer l'historique des tâches complétées
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const taskHistory = await db
		.select()
		.from(table.taskHistory)
		.where(
			and(
				eq(table.taskHistory.userId, event.locals.user.id),
				gte(table.taskHistory.completedAt, startOfMonth)
			)
		);

	let user = null;

	if (event.locals.user) {
		[user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));
	}

	return { tasks, taskHistory, user };
};
