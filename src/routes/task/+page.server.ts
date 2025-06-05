import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const tasks = await db.select().from(table.task);
	let user = null;

	if (event.locals.user) {
		[user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));
	}

	return { tasks, user };
};

export const actions: Actions = {
	validate: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string') return fail(400, { message: 'ID manquant' });

		const [task] = await db.select().from(table.task).where(eq(table.task.id, id));
		if (!task) return fail(404, { message: 'Tâche introuvable' });
		if (task.completed) return redirect(303, '/');

		await db.update(table.task).set({ completed: 1 }).where(eq(table.task.id, id));

		const [user] = await db.select().from(table.user).where(eq(table.user.id, task.userId));
		const newPoints = (user?.nombreOfPoints ?? 0) + (task.points ?? 0);

		await db
			.update(table.user)
			.set({ nombreOfPoints: newPoints })
			.where(eq(table.user.id, task.userId));

		return redirect(303, '/');
	},
	delete: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string') return fail(400, { message: 'ID manquant' });

		const [task] = await db.select().from(table.task).where(eq(table.task.id, id));
		if (!task) return fail(404, { message: 'Tâche introuvable' });

		// On NE retire PAS les points à l'utilisateur, même si la tâche était validée

		await db.delete(table.task).where(eq(table.task.id, id));
		return redirect(303, '/');
	}
};
