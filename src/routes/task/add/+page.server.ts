import { fail, redirect } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

function generateTaskId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}

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
	let user = null;

	if (event.locals.user) {
		[user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));
	}

	return { user };
};

export const actions: Actions = {
	add: async (event) => {
		const formData = await event.request.formData();
		console.log('FormData:', Array.from(formData.entries()));
		const title = formData.get('title');
		const description = formData.get('description');
		const points = Number(formData.get('points'));
		const priority = Number(formData.get('priority') || 0);
		const isRecurringRaw = formData.get('isRecurring');
		console.log('isRecurringRaw:', isRecurringRaw);
		const isRecurring = (isRecurringRaw === 'on' || isRecurringRaw === 'true' || isRecurringRaw === '1') ? 1 : 0;
		const dueDateRaw = formData.get('dueDate');
		console.log('dueDateRaw:', dueDateRaw);
		let dueDate = null;
		if (dueDateRaw) {
			dueDate = new Date(dueDateRaw.toString());
		}

		let recurrenceType = null;
		let recurrenceInterval = null;
		let recurrenceCount = null;
		let nextDueDate = null;

		if (isRecurring) {
			recurrenceType = formData.get('recurrenceType')?.toString();
			recurrenceInterval = Number(formData.get('recurrenceInterval'));
			recurrenceCount = Number(formData.get('recurrenceCount') || 1);
			console.log('recurrenceType:', recurrenceType);
			console.log('recurrenceInterval:', recurrenceInterval);
			console.log('recurrenceCount:', recurrenceCount);
			if (recurrenceType && !isNaN(recurrenceInterval)) {
				if (dueDate) {
					nextDueDate = dueDate;
				} else {
					nextDueDate = calculateNextDueDate(recurrenceType, recurrenceInterval);
				}
			}
		} else if (dueDate) {
			nextDueDate = dueDate;
		}

		console.log('nextDueDate:', nextDueDate);

		if (
			typeof title !== 'string' ||
			title.length < 2 ||
			typeof description !== 'string' ||
			isNaN(points) ||
			points < 1 ||
			(isRecurring && (!recurrenceType || isNaN(recurrenceInterval) || recurrenceInterval < 1))
		) {
			console.log('Validation failed');
			return fail(400, { message: 'Champs invalides' });
		}

		const now = new Date();
		console.log('Insert values:', {
			id: generateTaskId(),
			userId: event.locals.user.id,
			title,
			description,
			points,
			createdAt: now,
			updatedAt: now,
			completed: 0,
			priority,
			isRecurring,
			recurrenceType,
			recurrenceInterval,
			recurrenceCount,
			nextDueDate
		});

		await db.insert(table.task).values({
			id: generateTaskId(),
			userId: event.locals.user.id,
			title,
			description,
			points,
			createdAt: now,
			updatedAt: now,
			completed: 0,
			priority,
			isRecurring,
			recurrenceType,
			recurrenceInterval,
			recurrenceCount,
			nextDueDate
		});

		if (event.url.searchParams.get('fromCalendar')) {
			console.log('Redirecting to /calendar');
			return redirect(302, '/calendar');
		}
		console.log('Redirecting to /task');
		return redirect(302, '/task');
	}
};
