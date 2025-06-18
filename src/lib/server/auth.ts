import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.session).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.user.id, username: table.user.username },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/',
		secure: true, // Important pour HTTPS
		sameSite: 'lax' // Meilleur équilibre sécurité/UX pour la production
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}

// À ajouter dans src/lib/server/auth.ts

export async function updateSession(event: RequestEvent): Promise<void> {
	if (!event.locals.user) {
		return;
	}

	// Utiliser le nom de cookie cohérent avec le reste du code
	const sessionToken = event.cookies.get(sessionCookieName);

	if (!sessionToken) {
		return;
	}

	try {
		// Récupérer les données utilisateur à jour depuis la base de données
		const [userData] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.id, event.locals.user.id));

		if (userData) {
			// Mettre à jour l'utilisateur dans locals
			event.locals.user = {
				id: userData.id,
				username: userData.username,
				email: userData.email,
				avatarUrl: userData.avatarUrl,
				nombreOfPoints: userData.nombreOfPoints
			};

			// Mettre à jour l'expiration du cookie
			const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
			const [session] = await db
				.select()
				.from(table.session)
				.where(eq(table.session.id, sessionId));

			if (session) {
				setSessionTokenCookie(event, sessionToken, session.expiresAt);
			}
		}
	} catch (error) {
		console.error('Erreur lors de la mise à jour de la session:', error);
	}
}
