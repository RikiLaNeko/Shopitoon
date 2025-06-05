import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;
	const [task] = await db.select().from(table.task).where(eq(table.task.id, id));
	if (!task) throw redirect(302, '/');
	if (task.userId !== locals.user?.id) throw redirect(302, '/'); // Sécurité : seul le créateur peut éditer
	return { task };
};

export const actions: Actions = {
	edit: async (event) => {
		const id = event.params.id;
		const formData = await event.request.formData();
		const title = formData.get('title');
		const description = formData.get('description');
		const points = Number(formData.get('points'));

		if (
			typeof title !== 'string' ||
			title.length < 2 ||
			typeof description !== 'string' ||
			isNaN(points) ||
			points < 1
		) {
			return fail(400, { message: 'Champs invalides' });
		}

		const now = new Date();

		await db
			.update(table.task)
			.set({
				title,
				description,
				points,
				updatedAt: now
			})
			.where(eq(table.task.id, id));

		return redirect(302, '/');
	}
};
