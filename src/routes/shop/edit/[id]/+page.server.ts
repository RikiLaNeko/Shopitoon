import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;
	const [item] = await db.select().from(table.shop).where(eq(table.shop.id, id));

	if (!item) {
		throw redirect(302, '/shop');
	}

	// Vérification que l'utilisateur est connecté
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	return { item };
};

export const actions: Actions = {
	edit: async (event) => {
		const id = event.params.id;
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

		await db
			.update(table.shop)
			.set({
				name,
				description,
				price,
				updatedAt: now
			})
			.where(eq(table.shop.id, id));

		return redirect(302, '/shop');
	},

	delete: async (event) => {
		const id = event.params.id;

		await db.delete(table.shop).where(eq(table.shop.id, id));

		return redirect(302, '/shop');
	}
};
