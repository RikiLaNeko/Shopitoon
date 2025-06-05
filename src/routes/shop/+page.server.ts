import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Cette ligne indique à SvelteKit que cette fonction de chargement
	// dépend de l'ID "data:shop" qui peut être invalidé
	event.depends('data:shop');

	const shop = await db.select().from(table.shop);
	const user = event.locals.user
		? (await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id)))[0]
		: null;
	return { shop, user };
};

export const actions: Actions = {
	buy: async (event) => {
		const formData = await event.request.formData();
		const itemId = formData.get('id');
		const userId = event.locals.user?.id;
		if (!userId) return fail(401, { message: 'Non connecté' });
		if (typeof itemId !== 'string') return fail(400, { message: 'Article manquant' });

		const [item] = await db.select().from(table.shop).where(eq(table.shop.id, itemId));
		if (!item) return fail(404, { message: 'Article introuvable' });

		const [user] = await db.select().from(table.user).where(eq(table.user.id, userId));
		if (!user) return fail(404, { message: 'Utilisateur introuvable' });

		if ((user.nombreOfPoints ?? 0) < (item.price ?? 0)) {
			return fail(400, { message: 'Solde insuffisant pour cet achat.' });
		}

		await db
			.update(table.user)
			.set({ nombreOfPoints: user.nombreOfPoints - item.price })
			.where(eq(table.user.id, userId));

		return { message: 'Achat réussi !' };
	},

	delete: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string') return fail(400, { message: 'ID manquant' });

		await db.delete(table.shop).where(eq(table.shop.id, id));

		return { message: 'Article supprimé' };
	}
};
