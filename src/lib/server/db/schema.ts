import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	email: text('email').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	nombreOfPoints: integer('number_of_points').notNull().default(0),
	avatarUrl: text('avatar_url')
		.notNull()
		.default('https://api.dicebear.com/7.x/bottts/svg?seed=default')
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const task = sqliteTable('task', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	description: text('description').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	completed: integer('completed').notNull().default(0),
	points: integer('points').notNull().default(0),
	priority: integer('priority').notNull().default(0),
	isRecurring: integer('is_recurring').notNull().default(0),
	recurrenceType: text('recurrence_type'), // daily, weekly, monthly
	recurrenceInterval: integer('recurrence_interval'), // tous les X jours/semaines/mois
	recurrenceCount: integer('recurrence_count').default(1), // nombre de fois par jour
	nextDueDate: integer('next_due_date', { mode: 'timestamp' })
});

export const taskHistory = sqliteTable('task_history', {
	id: text('id').primaryKey(),
	taskId: text('task_id')
		.notNull()
		.references(() => task.id),
	completedAt: integer('completed_at', { mode: 'timestamp' }).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id)
});

export const taskTag = sqliteTable('task_tag', {
	id: text('id').primaryKey(),
	taskId: text('task_id')
		.notNull()
		.references(() => task.id),
	tag: text('tag').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const calandarEvent = sqliteTable('calendar_event', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	description: text('description').notNull(),
	startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
	endTime: integer('end_time', { mode: 'timestamp' }).notNull(),
	location: text('location').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	taskId: text('task_id').references(() => task.id)
});

export const shop = sqliteTable('shop', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	imageUrl: text('image_url')
		.notNull()
		.default('https://placehold.co/400x300/eee/999?text=Récompense')
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Task = typeof task.$inferSelect;
export type TaskTag = typeof taskTag.$inferSelect;
export type CalendarEvent = typeof calandarEvent.$inferSelect;
export type Shop = typeof shop.$inferSelect;
export type TaskHistory = typeof taskHistory.$inferSelect;
