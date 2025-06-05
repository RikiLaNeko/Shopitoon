import { fail, redirect } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

function generateShopId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) throw redirect(302, '/auth/login');
	return {};
};

export const actions: Actions = {
	add: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const price = Number(formData.get('price'));

		if (
			typeof name !== 'string' ||
			name.length < 2 ||
			typeof description !== 'string' ||
			isNaN(price) ||
			price < 1
		) {
			return fail(400, { message: 'Champs invalides' });
		}

		const now = new Date();

		await db.insert(table.shop).values({
			id: generateShopId(),
			name,
			description,
			price,
			createdAt: now,
			updatedAt: now
		});

		return redirect(302, '/shop');
	}
};
