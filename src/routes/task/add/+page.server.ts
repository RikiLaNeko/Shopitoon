import { fail, redirect } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

function generateTaskId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}

export const load: PageServerLoad = async () => ({});

export const actions: Actions = {
	add: async (event) => {
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

		await db.insert(table.task).values({
			id: generateTaskId(),
			userId: event.locals.user.id,
			title,
			description,
			points,
			createdAt: now,
			updatedAt: now,
			completed: 0,
			priority: 0
		});

		return redirect(302, '/');
	}
};
