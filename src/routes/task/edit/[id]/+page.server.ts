import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Fonction pour calculer la prochaine date d'échéance
function calculateNextDueDate(recurrenceType: string, recurrenceInterval: number): Date {
	const now = new Date();

	switch (recurrenceType) {
		case 'daily':
			now.setDate(now.getDate() + recurrenceInterval);
			break;
		case 'weekly':
			now.setDate(now.getDate() + recurrenceInterval * 7);
			break;
		case 'monthly':
			now.setMonth(now.getMonth() + recurrenceInterval);
			break;
	}

	return now;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const id = params.id;
	const [task] = await db.select().from(table.task).where(eq(table.task.id, id));

	// Récupérer les informations de l'utilisateur
	const [user] = await db.select().from(table.user).where(eq(table.user.id, locals.user.id));

	if (!task) throw redirect(302, '/task');
	if (task.userId !== locals.user.id) throw redirect(302, '/task'); // Sécurité : seul le créateur peut éditer

	return { task, user };
};

export const actions: Actions = {
	edit: async (event) => {
		if (!event.locals.user) {
			throw redirect(302, '/auth/login');
		}

		const id = event.params.id;
		const formData = await event.request.formData();

		const title = formData.get('title');
		const description = formData.get('description');
		const points = Number(formData.get('points'));
		const priority = Number(formData.get('priority') || 0);
		const isRecurring = formData.get('isRecurring') === 'on' ? 1 : 0;

		// Valeurs de récurrence (si applicable)
		let recurrenceType = null;
		let recurrenceInterval = null;
		let recurrenceCount = null;
		let nextDueDate = null;

		if (isRecurring) {
			recurrenceType = formData.get('recurrenceType')?.toString();
			recurrenceInterval = Number(formData.get('recurrenceInterval'));
			recurrenceCount = Number(formData.get('recurrenceCount') || 1);

			// Calculer la prochaine date d'échéance
			if (recurrenceType && !isNaN(recurrenceInterval)) {
				nextDueDate = calculateNextDueDate(recurrenceType, recurrenceInterval);
			}
		}

		if (
			typeof title !== 'string' ||
			title.length < 2 ||
			typeof description !== 'string' ||
			isNaN(points) ||
			points < 1 ||
			(isRecurring && (!recurrenceType || isNaN(recurrenceInterval) || recurrenceInterval < 1))
		) {
			return fail(400, { message: 'Champs invalides' });
		}

		// Vérifier que l'utilisateur est bien le propriétaire de la tâche
		const [task] = await db.select().from(table.task).where(eq(table.task.id, id));
		if (!task || task.userId !== event.locals.user.id) {
			return fail(403, { message: 'Accès non autorisé à cette tâche' });
		}

		const now = new Date();

		await db
			.update(table.task)
			.set({
				title,
				description,
				points,
				priority,
				isRecurring,
				recurrenceType,
				recurrenceInterval,
				recurrenceCount,
				nextDueDate: isRecurring ? nextDueDate : null,
				updatedAt: now
			})
			.where(eq(table.task.id, id));

		return redirect(302, '/task');
	}
};
