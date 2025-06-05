import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, fail } from '@sveltejs/kit';
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

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/auth/login');
	}

	// Récupérer uniquement les tâches de l'utilisateur connecté
	const tasks = await db
		.select()
		.from(table.task)
		.where(eq(table.task.userId, event.locals.user.id));

	const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

	// Récupérer le message flash s'il existe
	const flashParam = event.url.searchParams.get('flash');
	const flash = flashParam ? JSON.parse(decodeURIComponent(flashParam)) : null;

	return { tasks, user, flash };
};

export const actions: Actions = {
	validate: async (event) => {
		if (!event.locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await event.request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { message: 'ID de tâche manquant' });
		}

		const [task] = await db.select().from(table.task).where(eq(table.task.id, id));

		if (!task || task.userId !== event.locals.user.id) {
			return fail(403, { message: 'Accès non autorisé à cette tâche' });
		}

		// Vérifier si la tâche est récurrente
		if (task.isRecurring) {
			const now = new Date();
			now.setHours(0, 0, 0, 0);

			// Récupérer l'historique de validation pour cette tâche
			const taskValidations = await db
				.select()
				.from(table.taskHistory)
				.where(eq(table.taskHistory.taskId, id))
				.all();

			// Compter combien de fois la tâche a été validée aujourd'hui
			const validationsToday = taskValidations.filter((history) => {
				const historyDate = new Date(history.completedAt);
				historyDate.setHours(0, 0, 0, 0);
				return historyDate.getTime() === now.getTime();
			}).length;

			// Si la tâche a déjà été validée le nombre maximum de fois aujourd'hui
			if (validationsToday >= (task.recurrenceCount || 1)) {
				return fail(400, {
					message: `Cette tâche a déjà été validée le maximum de fois aujourd'hui (${task.recurrenceCount || 1}).`
				});
			}

			// Pour les tâches journalières, on ne vérifie pas la date d'échéance
			// si le nombre de validations n'a pas atteint la limite
			if (task.recurrenceType !== 'daily' && taskValidations.length > 0 && task.nextDueDate) {
				const dueDate = new Date(task.nextDueDate);
				dueDate.setHours(0, 0, 0, 0);

				if (now.getTime() < dueDate.getTime()) {
					return fail(400, {
						message: `Cette tâche ne peut pas encore être validée. Prochaine échéance: ${dueDate.toLocaleDateString()}`
					});
				}
			}
		}

		const [user] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.id, event.locals.user.id));

		// Ajouter les points à l'utilisateur
		await db
			.update(table.user)
			.set({
				nombreOfPoints: user.nombreOfPoints + task.points,
				updatedAt: new Date()
			})
			.where(eq(table.user.id, event.locals.user.id));

		const now = new Date();

		// Ajouter l'entrée dans l'historique
		await db.insert(table.taskHistory).values({
			id: crypto.randomUUID(),
			taskId: id,
			userId: event.locals.user.id,
			completedAt: now
		});

		// Gestion des tâches récurrentes
		if (task.isRecurring && task.recurrenceType && task.recurrenceInterval) {
			// Pour les tâches journalières avec plusieurs validations par jour,
			// on ne met à jour la prochaine échéance que lorsqu'on atteint le nombre de validations requis
			const validationsToday = await db
				.select()
				.from(table.taskHistory)
				.where(eq(table.taskHistory.taskId, id))
				.all()
				.then((histories) => {
					const today = new Date();
					today.setHours(0, 0, 0, 0);

					return histories.filter((history) => {
						const historyDate = new Date(history.completedAt);
						historyDate.setHours(0, 0, 0, 0);
						return historyDate.getTime() === today.getTime();
					}).length;
				});

			// Si c'est une tâche journalière et qu'on n'a pas encore atteint le nombre de validations requis,
			// on ne met pas à jour la prochaine échéance
			const shouldUpdateDueDate =
				task.recurrenceType !== 'daily' || validationsToday >= (task.recurrenceCount || 1);

			if (shouldUpdateDueDate) {
				// Calculer la prochaine échéance
				const nextDueDate = calculateNextDueDate(task.recurrenceType, task.recurrenceInterval);

				// Mettre à jour la tâche récurrente avec la nouvelle date d'échéance
				await db
					.update(table.task)
					.set({
						nextDueDate,
						updatedAt: now
					})
					.where(eq(table.task.id, id));
			} else {
				// Simplement mettre à jour la date de mise à jour
				await db
					.update(table.task)
					.set({
						updatedAt: now
					})
					.where(eq(table.task.id, id));
			}
		} else {
			// Marquer la tâche comme complétée pour les tâches non récurrentes
			await db
				.update(table.task)
				.set({
					completed: 1,
					updatedAt: now
				})
				.where(eq(table.task.id, id));
		}

		// Retourner un message de succès avec les points gagnés
		return {
			type: 'success',
			status: 200,
			data: {
				points: task.points
			}
		};
	},

	delete: async (event) => {
		if (!event.locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await event.request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { message: 'ID de tâche manquant' });
		}

		const [task] = await db.select().from(table.task).where(eq(table.task.id, id));

		if (!task || task.userId !== event.locals.user.id) {
			return fail(403, { message: 'Accès non autorisé à cette tâche' });
		}

		// Supprimer d'abord les enregistrements dépendants
		await db.delete(table.taskHistory).where(eq(table.taskHistory.taskId, id));
		await db.delete(table.taskTag).where(eq(table.taskTag.taskId, id));
		await db
			.update(table.calandarEvent)
			.set({ taskId: null })
			.where(eq(table.calandarEvent.taskId, id));

		// Ensuite supprimer la tâche
		await db.delete(table.task).where(eq(table.task.id, id));

		return {
			type: 'success',
			status: 200,
			data: {
				message: 'Tâche supprimée avec succès.'
			}
		};
	}
};
